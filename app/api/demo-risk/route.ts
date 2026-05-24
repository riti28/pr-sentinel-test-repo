const API_KEY = "sk-demo-hardcoded-key";

const db = {
  async query(sql: string) {
    return [{ id: 1, email: "demo@test.com" }];
  },
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  console.log("Fetching user:", id);

  const user = await db.query("SELECT * FROM users WHERE id = " + id);

  return Response.json({
    user,
    apiKey: API_KEY,
  });
}
