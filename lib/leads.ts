import { supabase } from "./supabase";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  message: string;
  createdAt: string;
}

function mapRow(row: Record<string, unknown>): Lead {
  return {
    id: row.id as string,
    name: row.name as string,
    phone: row.phone as string,
    email: row.email as string,
    source: row.source as string,
    message: row.message as string,
    createdAt: row.created_at as string,
  };
}

export async function getAllLeads(limit?: number): Promise<Lead[]> {
  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) {
    console.error("Supabase getAllLeads error:", error.message);
    return [];
  }
  return (data ?? []).map(mapRow);
}

export async function getLeadsPage(
  page: number,
  pageSize: number
): Promise<{ leads: Lead[]; total: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const [{ data, error }, { count, error: countError }] = await Promise.all([
    supabase.from("leads").select("*").order("created_at", { ascending: false }).range(from, to),
    supabase.from("leads").select("*", { count: "exact", head: true }),
  ]);

  if (error || countError) {
    console.error("Supabase getLeadsPage error:", error?.message ?? countError?.message);
    return { leads: [], total: 0 };
  }
  return { leads: (data ?? []).map(mapRow), total: count ?? 0 };
}

export async function createLead(lead: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const { data, error } = await supabase
    .from("leads")
    .insert({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      source: lead.source,
      message: lead.message,
    })
    .select()
    .single();

  if (error || !data) throw new Error(error?.message ?? "Failed to save lead");
  return mapRow(data);
}

export async function getLeadsCount(): Promise<number> {
  const { count } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export async function getLeadsCountSince(date: string): Promise<number> {
  const { count } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .gte("created_at", date);
  return count ?? 0;
}
