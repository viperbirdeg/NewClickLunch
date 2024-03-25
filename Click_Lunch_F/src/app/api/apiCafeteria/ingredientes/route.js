import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await conn.query("SELECT * FROM cat_ingredientes");
    const result = await conn.query("select * from cat_tipos");
    const tot = { ingredientes: [...res[0]], tipos: [...result[0]] };
    const ingrediente = tot;
    return NextResponse.json(ingrediente);
  } catch (error) {
    return NextResponse.json(
      { message: "Ups ha ocurrido un error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const result = await conn.query(
      "select cantidad from cat_ingredientes where id_ingrediente=?",
      data.id_ingrediente
    );
    const res = await conn.query(
      `update cat_ingredientes set cantidad=${data.cantidad} where id_ingrediente=${data.id_ingrediente}`
    );
    if (res.error) return NextResponse.json(extras[0]);
    if (result[0][0].cantidad > data.cantidad) {
      const nC = result[0][0].cantidad - data.cantidad;
      const extras = await conn.query("insert into extras_ingredientes set ?", {
        id_ingredientes: data.id_ingrediente,
        cantidad: nC,
        tipo: false,
      });
      return NextResponse.json(extras[0]);
    } else {
      const nC = data.cantidad - result[0][0].cantidad;
      const extras = await conn.query("insert into extras_ingredientes set ?", {
        id_ingredientes: data.id_ingrediente,
        cantidad: nC,
        tipo: true,
      });
      return NextResponse.json(extras[0]);
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
