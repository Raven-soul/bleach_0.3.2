import { getArmamentItemAsync } from "@/lib/ControllerDB/Repository/AdminRepository";

export async function POST(request) {
  const body = await request.json();
  const content = getArmamentItemAsync(body.armament_id);

  return Response.json(content, { status: 200 });
}