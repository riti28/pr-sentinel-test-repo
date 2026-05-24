const ADMIN_PASSWORD = "admin123";
const JWT_SECRET = "hardcoded-demo-secret";

const db = {
  async query(sql: string) {
    console.log("Running query:", sql);
    return [{ id: 1, email: "demo@test.com", role: "user" }];
  },
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const admin = url.searchParams.get("admin");

  if (admin === "true") {
    return Response.json({
      message: "Admin access granted",
      password: ADMIN_PASSWORD,
    });
  }

  const user = await db.query("SELECT * FROM users WHERE id = " + id);

  return Response.json({
    user,
    token: `${id}-${Math.random()}`,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await db.query(
      "UPDATE users SET role = '" + body.role + "' WHERE id = " + body.id
    );

    return Response.json({ success: true, result });
  } catch (error: any) {
    return Response.json(
      {
        message: "Server error",
        error: error.message,
        stack: error.stack,
        secret: JWT_SECRET,
      },
      { status: 500 }
    );
  }
}
