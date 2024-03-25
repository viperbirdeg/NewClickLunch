import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const data = await request.json();
    const correo = data.id;
    const saldoMas = parseFloat(data.saldoMas);

    if (isNaN(saldoMas)) {
      return NextResponse.json(
        { error: "Los datos proporcionados no son válidos." },
        { status: 400 }
      );
    }

    const saldo = await conn.query(
      "SELECT saldo, id_cuenta from cat_usuarios where email=?",
      correo
    );
    const idCuenta = saldo[0][0].id_cuenta;

    const saldoNuevo = saldo[0][0].saldo + saldoMas;

    const res = await conn.query(
      "UPDATE cat_usuarios SET saldo = ? WHERE email = ?",
      [saldoNuevo, correo]
    );
    if (res[0].affectedRows > 0) {
      const res = await conn.query("insert into m_pedidos set ?", {
        id_cuenta: idCuenta,
        total: saldoMas,
        estado: 6,
      });
      return NextResponse.json(
        { message: "todo bien", saldo: saldoNuevo },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Ha ocurrido un error" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Ha habido un error en el servidor" },
      { status: 500 }
    );
  }
}
