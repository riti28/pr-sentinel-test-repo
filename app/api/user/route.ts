const password = "admin123";

const db = {
  async query(sql: string) {
    return [{ id: 1, name: "Test User", sql }];
  },
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  const user = await db.query("SELECT * FROM users WHERE id = " + id);

  return Response.json(user);
}

export async function POST(req: Request) {
  const body = await req.json();

  const result = await db.query(
    "SELECT * FROM users WHERE email = '" + body.email + "'"
  );

  return Response.json(result);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  await db.query("DELETE FROM users WHERE id = " + id);

  return Response.json({ success: true });
}
