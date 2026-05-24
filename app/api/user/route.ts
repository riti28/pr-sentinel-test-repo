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


export async function PATCH(req: Request) {
  const body = await req.json();

  const result = await db.query(
    "UPDATE users SET name = '" + body.name + "' WHERE id = " + body.id
  );

  return Response.json(result);
}

// trigger fresh PR Sentinel AI review

// fresh webhook test after Gemini model fix
export async function PUT(req: Request) {
  const body = await req.json();

  const result = await db.query(
    "UPDATE users SET role = '" + body.role + "' WHERE id = " + body.id
  );

  return Response.json(result);
}

// final PR Sentinel AI test
export async function OPTIONS(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  const result = await db.query(
    "SELECT * FROM sessions WHERE token = '" + token + "'"
  );

  return Response.json(result);
}

// final dashboard test
export async function TRACE(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  const result = await db.query(
    "SELECT * FROM sessions WHERE token = '" + token + "'"
  );

  return Response.json(result);
}
