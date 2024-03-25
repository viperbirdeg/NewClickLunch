import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { estado } = await request.json();
    await conn.query("UPDATE m_pedidos SET estado=? where id_pedido=?", [
      estado + 1,
      params.id,
    ]);
    const res = await conn.query("SELECT * FROM m_pedidos");
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(request, { params }) {
  try {
    const { estado } = await request.json();
    await conn.query("UPDATE m_pedidos SET estado=? where id_pedido=?", [
      estado,
      params.id,
    ]);
    const res = await conn.query(
      "SELECT * FROM m_pedidos where estado=?",
      estado + 1
    );
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
