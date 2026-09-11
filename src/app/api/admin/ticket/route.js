import { getTicketElementsData } from "@/app/app_admin/AdminRepository/TicketRepository";

export async function POST(request) {
  const body = await request.json();
  const content = getTicketElementsData(body.ticket_id);

  return Response.json(content, { status: 200 });
}