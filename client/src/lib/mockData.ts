/* Quiet Operations reminder: demo data is structured to make every customer and merchant decision explainable at a glance. */
export type Customer = {
  id: string;
  name: string;
  phone: string;
  location: string;
  dealer: string;
  device: string;
  baseline: number;
  score: number;
  onTime: number;
  missed: number;
  tenure: number;
  combined: number;
  headroom: number;
  status: "Eligible" | "Review" | "Suppressed";
  tags: string[];
  channel: "WhatsApp" | "SMS";
  lastOffer: string;
  lastContact: string;
};

export type Merchant = {
  id: string;
  name: string;
  area: string;
  county: string;
  phone: string;
  onboarded: string;
  skus: number;
  stockAccuracy: number;
  fulfilment: number;
  cancellation: number;
  returns: number;
  routed: number;
  health: "Healthy" | "Watch" | "New";
};

export type ImportPreviewRow = {
  id: number;
  values: Record<string, string>;
  errors: string[];
  included: boolean;
  status?: "accepted" | "rejected";
};

export const customers: Customer[] = [
  { id: "CUS-10284", name: "Wanjiku Njeri", phone: "+254 712 489 201", location: "Dandora, Nairobi", dealer: "Mobi Hub", device: "Samsung Galaxy A05", baseline: 55, score: 94, onTime: 98, missed: 0, tenure: 41, combined: 41, headroom: 14, status: "Eligible", tags: ["high value", "upgrade eligible"], channel: "WhatsApp", lastOffer: "None", lastContact: "Never" },
  { id: "CUS-09834", name: "Brian Otieno", phone: "+254 701 335 812", location: "Kibuye, Kisumu", dealer: "Kisumu Connect", device: "Tecno Spark 20", baseline: 55, score: 88, onTime: 94, missed: 1, tenure: 28, combined: 45, headroom: 10, status: "Review", tags: ["repeat buyer"], channel: "SMS", lastOffer: "Power Bank · viewed", lastContact: "4 days ago" },
  { id: "CUS-11820", name: "Mariam Achieng", phone: "+254 790 111 490", location: "Likoni, Mombasa", dealer: "Coast Mobile", device: "Redmi A3", baseline: 55, score: 91, onTime: 97, missed: 0, tenure: 36, combined: 37, headroom: 18, status: "Eligible", tags: ["student", "high value"], channel: "WhatsApp", lastOffer: "None", lastContact: "Never" },
  { id: "CUS-10172", name: "Samuel Kiptoo", phone: "+254 724 720 184", location: "CBD, Nakuru", dealer: "Nakuru Smart", device: "Itel A70", baseline: 55, score: 86, onTime: 93, missed: 2, tenure: 22, combined: 43, headroom: 12, status: "Eligible", tags: ["new to Next"], channel: "WhatsApp", lastOffer: "Clear Case · sent", lastContact: "9 days ago" },
  { id: "CUS-09354", name: "Faith Wambui", phone: "+254 733 488 500", location: "Ruiru, Kiambu", dealer: "Mobi Hub", device: "Nokia C32", baseline: 55, score: 72, onTime: 82, missed: 5, tenure: 19, combined: 46, headroom: 9, status: "Suppressed", tags: ["delinquent"], channel: "SMS", lastOffer: "Suppressed", lastContact: "2 days ago" },
  { id: "CUS-11203", name: "Dennis Mwangi", phone: "+254 710 645 933", location: "Eldoret, Uasin Gishu", dealer: "Eldo Mobile", device: "Oppo A18", baseline: 55, score: 89, onTime: 96, missed: 0, tenure: 33, combined: 39, headroom: 16, status: "Eligible", tags: ["upgrade eligible"], channel: "WhatsApp", lastOffer: "Earbuds · declined", lastContact: "3 weeks ago" },
  { id: "CUS-08922", name: "Asha Ali", phone: "+254 798 221 903", location: "Bamburi, Mombasa", dealer: "Coast Mobile", device: "Infinix Smart 8", baseline: 55, score: 78, onTime: 88, missed: 2, tenure: 17, combined: 44, headroom: 11, status: "Review", tags: ["family plan"], channel: "WhatsApp", lastOffer: "Cable · viewed", lastContact: "6 days ago" },
  { id: "CUS-12047", name: "Peter Karanja", phone: "+254 718 903 120", location: "Thika, Kiambu", dealer: "Mobi Hub", device: "Samsung Galaxy A04e", baseline: 55, score: 97, onTime: 99, missed: 0, tenure: 48, combined: 35, headroom: 20, status: "Eligible", tags: ["high value", "loyal"], channel: "WhatsApp", lastOffer: "None", lastContact: "Never" },
];

export const merchants: Merchant[] = [
  { id: "DLR-001", name: "Mobi Hub", area: "Dandora", county: "Nairobi", phone: "+254 711 450 212", onboarded: "14 Jan 2025", skus: 28, stockAccuracy: 98.4, fulfilment: 1.4, cancellation: 1.2, returns: 2.1, routed: 342, health: "Healthy" },
  { id: "DLR-002", name: "Coast Mobile", area: "Likoni", county: "Mombasa", phone: "+254 722 310 845", onboarded: "22 Feb 2025", skus: 19, stockAccuracy: 96.8, fulfilment: 1.8, cancellation: 2.8, returns: 3.4, routed: 218, health: "Healthy" },
  { id: "DLR-003", name: "Kisumu Connect", area: "Kibuye", county: "Kisumu", phone: "+254 709 680 441", onboarded: "03 Mar 2025", skus: 16, stockAccuracy: 94.2, fulfilment: 2.2, cancellation: 4.9, returns: 4.1, routed: 156, health: "Watch" },
  { id: "DLR-004", name: "Nakuru Smart", area: "CBD", county: "Nakuru", phone: "+254 734 095 900", onboarded: "19 Mar 2025", skus: 13, stockAccuracy: 97.6, fulfilment: 1.6, cancellation: 1.9, returns: 2.8, routed: 124, health: "Healthy" },
  { id: "DLR-005", name: "Eldo Mobile", area: "Town Centre", county: "Uasin Gishu", phone: "+254 799 109 050", onboarded: "07 Aug 2026", skus: 7, stockAccuracy: 92.8, fulfilment: 2.8, cancellation: 6.3, returns: 4.8, routed: 18, health: "New" },
  { id: "DLR-006", name: "Kakamega Phones", area: "Municipal Market", county: "Kakamega", phone: "+254 720 804 239", onboarded: "12 Apr 2025", skus: 11, stockAccuracy: 95.1, fulfilment: 2.4, cancellation: 3.6, returns: 3.9, routed: 87, health: "Watch" },
];

export const customerImportSample = [
  { customer_id: "CUS-NEW-01", name: "Esther Naliaka", phone_msisdn: "+254 701 000 221", location: "Kakamega", baseline_daily_kes: "55", device_model: "Tecno Pop 9", repayment_score: "90" },
  { customer_id: "CUS-NEW-02", name: "Joseph Kamau", phone_msisdn: "+254 722 001 442", location: "Nairobi", baseline_daily_kes: "55", device_model: "Nokia C32", repayment_score: "84" },
  { customer_id: "CUS-NEW-03", name: "", phone_msisdn: "+254 733 009 883", location: "Mombasa", baseline_daily_kes: "55", device_model: "Redmi A3", repayment_score: "78" },
];

export const merchantImportSample = [
  { dealer_id: "DLR-NEW-01", dealer_name: "Westlands Connect", area_name: "Westlands", county: "Nairobi", contact_phone: "+254 711 234 567", stock_accuracy_pct: "97" },
  { dealer_id: "DLR-NEW-02", dealer_name: "Machakos Mobile", area_name: "Machakos Town", county: "Machakos", contact_phone: "+254 722 345 678", stock_accuracy_pct: "95" },
  { dealer_id: "DLR-NEW-03", dealer_name: "", area_name: "Kitale", county: "Trans Nzoia", contact_phone: "+254 733 456 789", stock_accuracy_pct: "93" },
];

export type PricingItem = {
  id: string;
  product: string;
  category: "audio" | "power" | "protection" | "wearables" | "storage" | "connectivity" | "insurance";
  brand: string;
  merchant: string;
  price: number;
  stock: number;
  tier: "A" | "B" | "C";
  tenor: number;
  status: "OK" | "REVIEW";
};

export type AutomationRule = {
  id: string;
  name: string;
  status: "active" | "draft" | "paused";
  description: string;
  conditions: string[];
  action: { category: string; tier: "A" | "B" | "C"; channel: "WhatsApp" | "SMS"; frequencyCap: number };
  suppression: string[];
  createdBy: string;
  lastRun: string;
  stats: { matched: number; sent: number; converted: number };
};

export type MessageTemplate = {
  id: string;
  name: string;
  channel: "WhatsApp" | "SMS";
  category: string;
  body: string;
  status: "Approved" | "Draft";
  edited: string;
  usage: number;
};

export type NextBestAction = {
  id: string;
  customerId: string;
  customerName: string;
  location: string;
  score: number;
  product: string;
  category: string;
  price: number;
  daily: number;
  combined: number;
  headroom: number;
  channel: "WhatsApp" | "SMS";
  inventory: "High" | "Medium" | "Low";
  confidence: number;
  reasons: string[];
  status: "Ready" | "Review" | "Suppressed";
};

export const pricingItems: PricingItem[] = [
  { id: "I-01", product: "Oraimo FreePods Lite", category: "audio", brand: "Oraimo", merchant: "Mobi Hub", price: 1600, stock: 24, tier: "A", tenor: 12, status: "OK" },
  { id: "I-02", product: "Powerbank 10,000mAh", category: "power", brand: "Oraimo", merchant: "Mobi Hub", price: 2000, stock: 15, tier: "B", tenor: 16, status: "OK" },
  { id: "I-03", product: "Screen Protector", category: "protection", brand: "Generic", merchant: "Coast Mobile", price: 250, stock: 60, tier: "A", tenor: 8, status: "OK" },
  { id: "I-04", product: "Xiaomi Smart Band 8", category: "wearables", brand: "Xiaomi", merchant: "Kisumu Connect", price: 3300, stock: 8, tier: "C", tenor: 24, status: "REVIEW" },
  { id: "I-05", product: "Device Protection Plan", category: "insurance", brand: "Onfon Cover", merchant: "Mobi Hub", price: 600, stock: 999, tier: "A", tenor: 12, status: "OK" },
  { id: "I-06", product: "USB-C Fast Charger", category: "connectivity", brand: "Oraimo", merchant: "Nakuru Smart", price: 900, stock: 31, tier: "A", tenor: 10, status: "OK" },
];

export const automationRules: AutomationRule[] = [
  { id: "RULE-01", name: "Audio attach for high-score customers", status: "active", description: "A light accessory offer for customers with room to say yes.", conditions: ["repayment_score ≥ 80", "tenure_weeks ≥ 10", "segment_tags contains audio propensity"], action: { category: "audio", tier: "A", channel: "WhatsApp", frequencyCap: 30 }, suppression: ["delinquent", "opted_out", "unresolved_complaint", "recent_purchase"], createdBy: "Amina M.", lastRun: "18 min ago", stats: { matched: 284, sent: 212, converted: 38 } },
  { id: "RULE-02", name: "Power backup after repeat repayment", status: "active", description: "Offer a powerbank where repayment rhythm and headroom support it.", conditions: ["repayment_score ≥ 75", "current_combined_daily_kes ≤ 42", "category not purchased: power"], action: { category: "power", tier: "B", channel: "SMS", frequencyCap: 45 }, suppression: ["delinquent", "opted_out", "unresolved_complaint", "recent_purchase"], createdBy: "Joel O.", lastRun: "2 hrs ago", stats: { matched: 146, sent: 96, converted: 21 } },
  { id: "RULE-03", name: "New merchant launch cohort", status: "draft", description: "Preview a launch cohort before turning on routing.", conditions: ["tenure_weeks ≥ 26", "repayment_score ≥ 85"], action: { category: "wearables", tier: "C", channel: "WhatsApp", frequencyCap: 60 }, suppression: ["delinquent", "opted_out", "unresolved_complaint", "recent_purchase"], createdBy: "Amina M.", lastRun: "Never", stats: { matched: 0, sent: 0, converted: 0 } },
];

export const messageTemplates: MessageTemplate[] = [
  { id: "TPL-01", name: "Audio attach · light", channel: "WhatsApp", category: "audio", body: "Hi {{customer_name}}, your {{product_name}} can be added for just KES {{daily_price}}/day. Your new combined total would be KES {{combined_total}}/day. Want to see it?", status: "Approved", edited: "Today, 09:24", usage: 348 },
  { id: "TPL-02", name: "Power backup · concise", channel: "SMS", category: "power", body: "{{customer_name}}, add {{product_name}} for KES {{daily_price}}/day. New total: KES {{combined_total}}/day. Reply YES to view.", status: "Approved", edited: "Yesterday, 16:10", usage: 211 },
  { id: "TPL-03", name: "Protection plan · reassurance", channel: "WhatsApp", category: "insurance", body: "Keep your phone protected, {{customer_name}}. {{product_name}} is available at KES {{daily_price}}/day, bringing your combined total to KES {{combined_total}}/day.", status: "Draft", edited: "18 Aug 2026", usage: 0 },
  { id: "TPL-04", name: "General offer · review", channel: "SMS", category: "general", body: "Hi {{customer_name}}. We found a useful add-on at KES {{daily_price}}/day. Your new combined total would be KES {{combined_total}}/day.", status: "Approved", edited: "12 Aug 2026", usage: 84 },
];

export const nextBestActions: NextBestAction[] = [
  { id: "NBA-01", customerId: "CUS-10284", customerName: "Wanjiku Njeri", location: "Dandora, Nairobi", score: 94, product: "Oraimo FreePods Lite", category: "audio", price: 1600, daily: 11, combined: 52, headroom: 14, channel: "WhatsApp", inventory: "High", confidence: 96, reasons: ["98% on-time rate", "41 weeks tenure", "No existing audio purchase", "Mobi Hub confirmed stock 12 min ago"], status: "Ready" },
  { id: "NBA-02", customerId: "CUS-11820", customerName: "Mariam Achieng", location: "Likoni, Mombasa", score: 91, product: "Device Protection Plan", category: "insurance", price: 600, daily: 5, combined: 42, headroom: 18, channel: "WhatsApp", inventory: "High", confidence: 93, reasons: ["97% on-time rate", "36 weeks tenure", "No protection plan on account", "Coast Mobile confirmed stock today"], status: "Ready" },
  { id: "NBA-03", customerId: "CUS-10172", customerName: "Samuel Kiptoo", location: "CBD, Nakuru", score: 86, product: "USB-C Fast Charger", category: "connectivity", price: 900, daily: 9, combined: 52, headroom: 12, channel: "WhatsApp", inventory: "Medium", confidence: 84, reasons: ["93% on-time rate", "22 weeks tenure", "Charger category not purchased", "Merchant stock confirmed 5 days ago"], status: "Review" },
  { id: "NBA-04", customerId: "CUS-09834", customerName: "Brian Otieno", location: "Kibuye, Kisumu", score: 88, product: "Powerbank 10,000mAh", category: "power", price: 2000, daily: 8, combined: 53, headroom: 10, channel: "SMS", inventory: "High", confidence: 89, reasons: ["94% on-time rate", "Powerbank viewed previously", "Current total remains within cap", "Kisumu Connect stock confirmed yesterday"], status: "Review" },
  { id: "NBA-05", customerId: "CUS-09354", customerName: "Faith Wambui", location: "Ruiru, Kiambu", score: 72, product: "Screen Protector", category: "protection", price: 250, daily: 4, combined: 50, headroom: 9, channel: "SMS", inventory: "High", confidence: 18, reasons: ["Delinquency suppression is active", "Customer is not eligible for commercial contact"], status: "Suppressed" },
];

export type OrderStatus = "pending_confirmation" | "confirmed" | "dealer_assigned" | "fulfilled" | "repaying" | "completed" | "cancelled" | "disputed";
export type OrderHistory = { status: OrderStatus; timestamp: string; actor: string };
export type Order = { id: string; customerId: string; customerName: string; offer: string; merchant: string; merchantId: string; checkoutLink: string; status: OrderStatus; amount: number; daily: number; created: string; ageDays: number; history: OrderHistory[] };
export type AuditLogEntry = { id: string; actor: string; action: string; entity: string; entityId: string; timestamp: string; details: string; tone: "blue" | "mint" | "amber" | "coral" };
export type SuppressedRecord = { customerId: string; customerName: string; reason: "delinquent" | "opted-out" | "unresolved complaint" | "manual suppression"; since: string; automatic: boolean; lastReviewed: string };

export const orders: Order[] = [
  { id: "ORD-2401", customerId: "CUS-10284", customerName: "Wanjiku Njeri", offer: "Oraimo FreePods Lite", merchant: "Mobi Hub", merchantId: "DLR-001", checkoutLink: "CHK-8831", status: "fulfilled", amount: 1600, daily: 11, created: "26 Aug 2026", ageDays: 1, history: [{ status: "pending_confirmation", timestamp: "26 Aug · 09:18", actor: "System" }, { status: "confirmed", timestamp: "26 Aug · 10:02", actor: "Amina M." }, { status: "dealer_assigned", timestamp: "26 Aug · 10:16", actor: "Router" }, { status: "fulfilled", timestamp: "27 Aug · 08:40", actor: "Mobi Hub" }] },
  { id: "ORD-2398", customerId: "CUS-11820", customerName: "Mariam Achieng", offer: "Device Protection Plan", merchant: "Coast Mobile", merchantId: "DLR-002", checkoutLink: "CHK-8820", status: "repaying", amount: 600, daily: 5, created: "24 Aug 2026", ageDays: 3, history: [{ status: "pending_confirmation", timestamp: "24 Aug · 13:11", actor: "System" }, { status: "confirmed", timestamp: "24 Aug · 13:22", actor: "Amina M." }, { status: "dealer_assigned", timestamp: "24 Aug · 14:02", actor: "Router" }, { status: "fulfilled", timestamp: "25 Aug · 09:18", actor: "Coast Mobile" }, { status: "repaying", timestamp: "26 Aug · 08:05", actor: "System" }] },
  { id: "ORD-2394", customerId: "CUS-10172", customerName: "Samuel Kiptoo", offer: "USB-C Fast Charger", merchant: "Nakuru Smart", merchantId: "DLR-004", checkoutLink: "CHK-8812", status: "dealer_assigned", amount: 900, daily: 9, created: "23 Aug 2026", ageDays: 4, history: [{ status: "pending_confirmation", timestamp: "23 Aug · 16:10", actor: "System" }, { status: "confirmed", timestamp: "23 Aug · 16:28", actor: "Amina M." }, { status: "dealer_assigned", timestamp: "23 Aug · 17:01", actor: "Router" }] },
  { id: "ORD-2388", customerId: "CUS-09834", customerName: "Brian Otieno", offer: "Powerbank 10,000mAh", merchant: "Kisumu Connect", merchantId: "DLR-003", checkoutLink: "CHK-8788", status: "confirmed", amount: 2000, daily: 8, created: "22 Aug 2026", ageDays: 5, history: [{ status: "pending_confirmation", timestamp: "22 Aug · 11:42", actor: "System" }, { status: "confirmed", timestamp: "22 Aug · 12:07", actor: "Amina M." }] },
  { id: "ORD-2374", customerId: "CUS-11203", customerName: "Dennis Mwangi", offer: "Oraimo FreePods Lite", merchant: "Eldo Mobile", merchantId: "DLR-005", checkoutLink: "CHK-8750", status: "completed", amount: 1600, daily: 11, created: "17 Aug 2026", ageDays: 10, history: [{ status: "pending_confirmation", timestamp: "17 Aug · 09:02", actor: "System" }, { status: "confirmed", timestamp: "17 Aug · 09:14", actor: "Amina M." }, { status: "dealer_assigned", timestamp: "17 Aug · 09:40", actor: "Router" }, { status: "fulfilled", timestamp: "18 Aug · 11:12", actor: "Eldo Mobile" }, { status: "repaying", timestamp: "19 Aug · 08:20", actor: "System" }, { status: "completed", timestamp: "26 Aug · 08:20", actor: "System" }] },
  { id: "ORD-2368", customerId: "CUS-08922", customerName: "Asha Ali", offer: "Screen Protector", merchant: "Coast Mobile", merchantId: "DLR-002", checkoutLink: "CHK-8721", status: "pending_confirmation", amount: 250, daily: 4, created: "15 Aug 2026", ageDays: 12, history: [{ status: "pending_confirmation", timestamp: "15 Aug · 10:04", actor: "System" }] },
  { id: "ORD-2359", customerId: "CUS-09354", customerName: "Faith Wambui", offer: "Screen Protector", merchant: "Mobi Hub", merchantId: "DLR-001", checkoutLink: "CHK-8690", status: "cancelled", amount: 250, daily: 4, created: "13 Aug 2026", ageDays: 14, history: [{ status: "pending_confirmation", timestamp: "13 Aug · 15:21", actor: "System" }, { status: "cancelled", timestamp: "14 Aug · 07:18", actor: "Guardrail" }] },
];

export const auditLog: AuditLogEntry[] = [
  { id: "AUD-801", actor: "Amina M.", action: "Approved message template", entity: "Template", entityId: "TPL-02", timestamp: "Today · 09:24", details: "Power backup · concise is now selectable for SMS links.", tone: "mint" },
  { id: "AUD-800", actor: "Guardrail", action: "Suppressed customer", entity: "Customer", entityId: "CUS-09354", timestamp: "Today · 08:42", details: "Delinquency rule blocked all commercial offers.", tone: "coral" },
  { id: "AUD-799", actor: "Router", action: "Advanced order status", entity: "Order", entityId: "ORD-2401", timestamp: "Today · 08:40", details: "dealer_assigned → fulfilled · Mobi Hub confirmed delivery.", tone: "blue" },
  { id: "AUD-798", actor: "Amina M.", action: "Generated checkout link", entity: "CheckoutLink", entityId: "CHK-8831", timestamp: "Yesterday · 10:02", details: "Approved WhatsApp template merged for Wanjiku Njeri.", tone: "blue" },
  { id: "AUD-797", actor: "Joel O.", action: "Changed automation rule", entity: "AutomationRule", entityId: "RULE-02", timestamp: "Yesterday · 16:10", details: "Frequency cap changed from 30 to 45 days.", tone: "amber" },
  { id: "AUD-796", actor: "Import", action: "Rejected inventory rows", entity: "Inventory", entityId: "IMP-042", timestamp: "26 Aug · 14:03", details: "3 rows rejected because category was outside the Tier 1 whitelist.", tone: "coral" },
  { id: "AUD-795", actor: "Amina M.", action: "Imported customers", entity: "Customer", entityId: "IMP-041", timestamp: "26 Aug · 11:48", details: "482 imported, 6 skipped after validation.", tone: "mint" },
];

export const suppressedRecords: SuppressedRecord[] = [
  { customerId: "CUS-09354", customerName: "Faith Wambui", reason: "delinquent", since: "02 Aug 2026", automatic: true, lastReviewed: "Today · 08:42" },
  { customerId: "CUS-10412", customerName: "Kevin Mutua", reason: "opted-out", since: "19 Aug 2026", automatic: true, lastReviewed: "Yesterday · 12:18" },
  { customerId: "CUS-11008", customerName: "Linet Auma", reason: "unresolved complaint", since: "21 Aug 2026", automatic: true, lastReviewed: "Yesterday · 14:02" },
  { customerId: "CUS-09721", customerName: "Moses Kariuki", reason: "manual suppression", since: "22 Aug 2026", automatic: false, lastReviewed: "22 Aug · 16:34" },
];
