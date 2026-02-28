// export async function POST(request) {
//   const formData = request.formData();
//   const name = formData.get('key');
//   const email = formData.get('a');
//   return Response.json({ name, email });
// }

export async function POST(request) {
  const body = await request.json();
  console.log('-----------------------------------------------------');
  console.log('route_answer:');
  console.log(body);
  console.log('-----------------------------------------------------');
  return Response.json(body, { status: 200, armament_id: body.armament_id });
}
// export async function GET(request) {}