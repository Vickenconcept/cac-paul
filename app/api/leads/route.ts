import { NextResponse } from "next/server";
import { createLead, getLeadsPage } from "@/lib/leads";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const pageSize = Math.min(50, parseInt(searchParams.get("limit") ?? "10", 10));

  const result = await getLeadsPage(page, pageSize);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, source, message } = body;

    if (!phone && !email) {
      return NextResponse.json({ error: "Phone or email is required" }, { status: 400 });
    }

    const lead = await createLead({
      name: name?.trim() || "Anonymous",
      phone: phone?.trim() || "",
      email: email?.trim() || "",
      source: source || "website",
      message: message?.trim() || "",
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to save lead";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
