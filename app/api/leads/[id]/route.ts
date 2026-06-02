import { NextResponse } from "next/server";
import { deleteLead } from "@/lib/leads";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const success = await deleteLead(id);
  if (!success) {
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
