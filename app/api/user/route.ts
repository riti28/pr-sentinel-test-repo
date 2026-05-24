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
