/* Quiet Operations reminder: imports are progressive disclosure—upload, map, validate, then commit—so no row silently enters the station. */
import { ChangeEvent, DragEvent, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, Download, FileSpreadsheet, Info, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import { customerImportSample, ImportPreviewRow, merchantImportSample } from "@/lib/mockData";

type Mode = "customers" | "merchants";
type ImportWizardProps = { mode: Mode; onClose: () => void; onComplete: (summary: { imported: number; skipped: number }) => void };
type RawRow = Record<string, unknown>;

const fields = {
  customers: [
    { key: "customer_id", label: "Customer ID", required: false },
    { key: "name", label: "Full name", required: true },
    { key: "phone_msisdn", label: "Phone number", required: true },
    { key: "location", label: "Location", required: true },
    { key: "baseline_daily_kes", label: "Baseline / day", required: true },
    { key: "device_model", label: "Device model", required: false },
    { key: "repayment_score", label: "Repayment score", required: false },
  ],
  merchants: [
    { key: "dealer_id", label: "Dealer ID", required: false },
    { key: "dealer_name", label: "Merchant name", required: true },
    { key: "area_name", label: "Area", required: true },
    { key: "county", label: "County", required: true },
    { key: "contact_phone", label: "Contact phone", required: true },
    { key: "stock_accuracy_pct", label: "Stock accuracy %", required: false },
  ],
};

const samples = { customers: customerImportSample, merchants: merchantImportSample };
const fieldLabel = (mode: Mode, key: string) => fields[mode].find((field) => field.key === key)?.label || key;
const cleanHeader = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_");

function autoMap(mode: Mode, headers: string[]) {
  const normalized = Object.fromEntries(headers.map((header) => [cleanHeader(header), header]));
  return Object.fromEntries(fields[mode].map((field) => {
    const exact = normalized[field.key];
    const byLabel = normalized[cleanHeader(field.label)];
    return [field.key, exact || byLabel || ""];
  }));
}

export default function ImportWizard({ mode, onClose, onComplete }: ImportWizardProps) {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rawRows, setRawRows] = useState<RawRow[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [previewRows, setPreviewRows] = useState<ImportPreviewRow[]>([]);
  const [dragging, setDragging] = useState(false);
  const [reading, setReading] = useState(false);
  const [completed, setCompleted] = useState<{ imported: number; skipped: number } | null>(null);
  const fieldConfig = fields[mode];
  const sampleHeaders = useMemo(() => Object.keys(samples[mode][0]), [mode]);
  const title = mode === "customers" ? "Import customers" : "Import merchants";
  const subject = mode === "customers" ? "customer records" : "merchant records";

  const processRows = (rows: RawRow[], sourceHeaders: string[], sourceName: string) => {
    setFileName(sourceName); setHeaders(sourceHeaders); setRawRows(rows); setMapping(autoMap(mode, sourceHeaders)); setStep(2); setCompleted(null);
  };

  const readFile = async (file: File) => {
    setReading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<RawRow>(firstSheet, { defval: "" });
      const sourceHeaders = rows.length ? Object.keys(rows[0]) : (XLSX.utils.sheet_to_json<string[]>(firstSheet, { header: 1 })[0] || []) as string[];
      if (!sourceHeaders.length) throw new Error("No headers found");
      processRows(rows, sourceHeaders, file.name);
      toast.success(`${file.name} loaded for review.`);
    } catch { toast.error("We could not read that file. Try a CSV or XLSX with a header row."); }
    finally { setReading(false); }
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) void readFile(file); event.target.value = ""; };
  const handleDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); const file = event.dataTransfer.files?.[0]; if (file) void readFile(file); };
  const loadSample = () => { const rows = samples[mode] as RawRow[]; processRows(rows, Object.keys(rows[0]), `onfon-next-${mode}-sample.xlsx`); toast.info("Sample file loaded. Edit the mapping or continue to validation."); };
  const downloadTemplate = () => { const worksheet = XLSX.utils.json_to_sheet([Object.fromEntries(sampleHeaders.map((header) => [header, ""]))]); const workbook = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(workbook, worksheet, mode); XLSX.writeFile(workbook, `onfon-next-${mode}-template.xlsx`); toast.success("Template downloaded."); };
  const validateRows = () => {
    const rows = rawRows.map((row, id) => {
      const values = Object.fromEntries(fieldConfig.map((field) => [field.key, String(row[mapping[field.key]] ?? "").trim()]));
      const errors = fieldConfig.filter((field) => field.required && !values[field.key]).map((field) => `${field.label} is required`);
      if (mode === "customers" && values.phone_msisdn && values.phone_msisdn.replace(/\D/g, "").length < 9) errors.push("Phone number looks too short");
      if (mode === "customers" && values.repayment_score && (Number(values.repayment_score) < 0 || Number(values.repayment_score) > 100)) errors.push("Repayment score must be 0–100");
      if (mode === "merchants" && values.stock_accuracy_pct && (Number(values.stock_accuracy_pct) < 0 || Number(values.stock_accuracy_pct) > 100)) errors.push("Stock accuracy must be 0–100");
      return { id, values, errors, included: errors.length === 0, status: errors.length === 0 ? "accepted" : "rejected" } as ImportPreviewRow;
    });
    setPreviewRows(rows); setStep(3);
  };
  const validCount = previewRows.filter((row) => row.included).length;
  const invalidCount = previewRows.length - validCount;
  const toggleRow = (id: number) => setPreviewRows((rows) => rows.map((row) => row.id === id ? { ...row, included: !row.included } : row));
  const commit = () => { const summary = { imported: validCount, skipped: invalidCount }; setCompleted(summary); setStep(4); onComplete(summary); toast.success(`${summary.imported} ${subject} ready in the demo store.`); };

  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#202b37]/35 p-4 backdrop-blur-sm sm:p-8"><section role="dialog" aria-modal="true" aria-labelledby="import-title" className="flex max-h-[90vh] w-full max-w-[980px] flex-col overflow-hidden rounded-2xl border border-white/80 bg-[#fbfcfe] shadow-[0_30px_100px_rgba(31,48,70,0.22)]"><header className="flex items-center justify-between border-b border-[#e3e8ef] px-5 py-4 sm:px-7"><div className="qo-signal-rail"><div className="qo-eyebrow text-[#e60012]">Data intake / {mode}</div><h2 id="import-title" className="mt-1 text-[18px] font-bold tracking-[-0.035em]">{title}</h2></div><button type="button" onClick={onClose} aria-label="Close import wizard" className="rounded-lg p-2 text-[#7a8796] hover:bg-white hover:text-[#202b37]"><X size={18} /></button></header><div className="border-b border-[#edf0f4] px-5 py-4 sm:px-7"><div className="grid grid-cols-4 gap-2">{[['01','Upload'],['02','Map columns'],['03','Validate'],['04','Commit']].map(([num,label], index) => <div key={num} className={`flex items-center gap-2 text-[10px] font-bold ${step === index + 1 ? 'text-[#e60012]' : step > index + 1 ? 'text-[#6d6d6d]' : 'text-[#a0a9b5]'}`}><span className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] ${step === index + 1 ? 'bg-[#e60012] text-white' : step > index + 1 ? 'bg-[#fff0f1] text-[#6d6d6d]' : 'bg-[#eef1f5] text-[#9aa5b2]'}`}>{step > index + 1 ? <Check size={12} /> : num}</span><span className="hidden sm:inline">{label}</span></div>)}</div></div><div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">{step === 1 && <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]"><div><div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop} className={`flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed px-8 text-center transition-colors ${dragging ? 'border-[#e60012] bg-[#fff0f1]' : 'border-[#bfcddd] bg-white'}`}><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff0f1] text-[#e60012]"><UploadCloud size={22} /></div><h3 className="mt-5 text-[14px] font-bold">Drop a CSV or XLSX here</h3><p className="mt-2 max-w-[320px] text-[11px] leading-[1.6] text-[#8994a2]">{mode === 'customers' ? 'Include a name, phone number, location, and daily repayment baseline for each customer.' : 'Include a merchant name, area, county, contact phone, and optional stock accuracy.'}</p><label className="qo-button mt-5 cursor-pointer rounded-lg bg-[#e60012] px-4 py-2.5 text-[11px] font-bold text-white hover:bg-[#b8000e]">{reading ? 'Reading file…' : 'Choose a file'}<input type="file" accept=".csv,.xlsx,.xls" onChange={handleFile} className="hidden" /></label><div className="mt-4 text-[10px] text-[#a0a9b5]">CSV or Excel · max 10 MB</div></div></div><div className="rounded-xl border border-[#e3e8ef] bg-white p-5"><div className="flex items-center gap-2 text-[12px] font-bold"><FileSpreadsheet size={16} className="text-[#e60012]" /> Start with a clean template</div><p className="mt-3 text-[11px] leading-[1.65] text-[#7b8795]">Use the expected columns to make mapping faster. You can still rename or map fields manually in the next step.</p><button type="button" onClick={downloadTemplate} className="mt-5 flex items-center gap-2 text-[11px] font-bold text-[#e60012] hover:underline"><Download size={14} /> Download {mode} template</button><div className="mt-7 border-t border-[#edf0f4] pt-4"><div className="qo-eyebrow">Need a preview?</div><button type="button" onClick={loadSample} className="mt-2 text-[11px] font-bold text-[#607084] hover:text-[#e60012]">Load a sample file →</button></div></div></div>}{step === 2 && <div><div className="mb-5 flex items-start gap-3 rounded-lg border border-[#f0d8da] bg-[#fff7f7] p-4 text-[11px] text-[#657181]"><Info size={15} className="mt-0.5 shrink-0 text-[#e60012]" /><span><b className="text-[#435166]">{fileName}</b> loaded with {rawRows.length} rows. We matched columns by header name; review any field marked “Not mapped” before continuing.</span></div><div className="overflow-hidden rounded-xl border border-[#e2e7ee] bg-white"><div className="grid grid-cols-[1.1fr_1fr_0.7fr] border-b border-[#edf0f4] bg-[#fafbfd] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9aa5b2]"><span>Required field</span><span>Source column</span><span>Mode</span></div>{fieldConfig.map((field) => <div key={field.key} className="grid grid-cols-[1.1fr_1fr_0.7fr] items-center gap-3 border-b border-[#edf0f4] px-4 py-3 last:border-0"><div className="text-[11px] font-bold text-[#465468]">{field.label}{field.required && <span className="ml-1 text-[#bd6b60]">*</span>}<div className="mt-0.5 text-[9px] font-medium text-[#9aa5b2]">{field.key}</div></div><select value={mapping[field.key] || "__none__"} onChange={(e) => setMapping({ ...mapping, [field.key]: e.target.value === "__none__" ? "" : e.target.value })} className="h-9 rounded-lg border border-[#dce3eb] bg-[#fbfcfe] px-2.5 text-[10px] font-semibold text-[#607084] outline-none focus:border-[#e60012]"><option value="__none__">Not mapped</option>{headers.map((header) => <option key={header} value={header}>{header}</option>)}</select><span className={`w-fit rounded-full px-2 py-1 text-[9px] font-bold ${mapping[field.key] ? 'bg-[#fff0f1] text-[#6d6d6d]' : field.required ? 'bg-[#fff0ed] text-[#bd6b60]' : 'bg-[#eef1f5] text-[#8d98a5]'}`}>{mapping[field.key] ? 'Mapped' : field.required ? 'Needs input' : 'Optional'}</span></div>)}</div></div>}{step === 3 && <div><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><div className="text-[14px] font-bold">Validation preview</div><p className="mt-1 text-[11px] text-[#8994a2]">Rows with an error will be excluded unless you fix them in the source file and re-upload.</p></div><div className="flex items-center gap-3 text-[10px] font-bold"><span className="text-[#6d6d6d]"><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-current" />{validCount} accepted</span><span className="text-[#bd6b60]"><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-current" />{invalidCount} rejected</span></div></div><div className="overflow-x-auto rounded-xl border border-[#e2e7ee] bg-white"><table className="w-full min-w-[700px] text-left"><thead className="bg-[#fafbfd] text-[10px] font-bold uppercase tracking-[0.12em] text-[#9aa5b2]"><tr><th className="px-4 py-3">Include</th>{fieldConfig.slice(0, 4).map((field) => <th className="px-4 py-3" key={field.key}>{field.label}</th>)}<th className="px-4 py-3">Validation</th></tr></thead><tbody>{previewRows.map((row) => <tr key={row.id} className="border-t border-[#edf0f4] text-[10px]"><td className="px-4 py-3"><input type="checkbox" checked={row.included} onChange={() => toggleRow(row.id)} className="h-3.5 w-3.5 accent-[#e60012]" /></td>{fieldConfig.slice(0, 4).map((field) => <td className="max-w-[150px] truncate px-4 py-3 font-semibold text-[#59687a]" key={field.key}>{row.values[field.key] || <span className="text-[#bd6b60]">Missing</span>}</td>)}<td className="px-4 py-3">{row.errors.length ? <span className="flex items-start gap-1.5 font-semibold text-[#bd6b60]"><AlertTriangle size={13} className="mt-0.5 shrink-0" /><span>{row.errors.join(" · ")}</span></span> : <span className="flex items-center gap-1.5 font-semibold text-[#6d6d6d]"><CheckCircle2 size={13} /> Ready to import</span>}</td></tr>)}</tbody></table></div></div>}{step === 4 && completed && <div className="mx-auto max-w-[560px] py-7 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0f1] text-[#6d6d6d]"><CheckCircle2 size={28} /></div><div className="qo-eyebrow mt-6 text-[#6d6d6d]">Commit complete</div><h3 className="qo-display mt-3 text-[32px] font-semibold tracking-[-0.05em]">The station is up to date.</h3><p className="mt-4 text-[13px] leading-[1.7] text-[#748091]">Your demo import is recorded as a local state change. Nothing was sent to an external API.</p><div className="mt-7 grid grid-cols-2 gap-3"><div className="rounded-xl border border-[#e2e7ee] bg-white p-4"><div className="qo-eyebrow">Imported</div><div className="mt-2 text-[25px] font-bold tracking-[-0.06em] text-[#6d6d6d]">{completed.imported}</div><div className="mt-1 text-[10px] text-[#8c98a5]">records accepted</div></div><div className="rounded-xl border border-[#e2e7ee] bg-white p-4"><div className="qo-eyebrow">Skipped</div><div className="mt-2 text-[25px] font-bold tracking-[-0.06em] text-[#bd6b60]">{completed.skipped}</div><div className="mt-1 text-[10px] text-[#8c98a5]">records held back</div></div></div></div>}</div><footer className="flex items-center justify-between border-t border-[#e3e8ef] bg-[#fafbfd] px-5 py-4 sm:px-7">{step < 4 ? <button type="button" onClick={() => step === 1 ? onClose() : setStep(step - 1)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-bold text-[#718092] hover:bg-white hover:text-[#e60012]">{step === 1 ? <X size={14} /> : <ArrowLeft size={14} />} {step === 1 ? "Cancel" : "Back"}</button> : <span />}{step === 1 ? <span className="text-[10px] text-[#9aa5b2]">Nothing is committed until the final step.</span> : step === 2 ? <button type="button" disabled={!rawRows.length || fieldConfig.some((field) => field.required && !mapping[field.key])} onClick={validateRows} className="qo-button flex items-center gap-2 rounded-lg bg-[#e60012] px-4 py-2.5 text-[11px] font-bold text-white shadow-[0_8px_16px_rgba(230,0,18,0.15)] enabled:hover:bg-[#b8000e] disabled:cursor-not-allowed disabled:bg-[#efd0d3]">Review validation <ArrowRight size={14} /></button> : step === 3 ? <button type="button" disabled={!validCount} onClick={commit} className="qo-button flex items-center gap-2 rounded-lg bg-[#e60012] px-4 py-2.5 text-[11px] font-bold text-white shadow-[0_8px_16px_rgba(230,0,18,0.15)] enabled:hover:bg-[#b8000e] disabled:cursor-not-allowed disabled:bg-[#efd0d3]">Commit {validCount} records <ArrowRight size={14} /></button> : <button type="button" onClick={onClose} className="qo-button rounded-lg bg-[#e60012] px-5 py-2.5 text-[11px] font-bold text-white shadow-[0_8px_16px_rgba(230,0,18,0.15)] hover:bg-[#b8000e]">Done <Check size={14} className="ml-1 inline" /></button>}</footer></section></div>;
}
