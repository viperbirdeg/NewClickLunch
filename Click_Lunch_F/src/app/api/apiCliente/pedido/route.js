import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const pedido = {
      id_cuenta: data.id_cuenta,
      total: data.total,
      estado: 2,
    };
    const querys = await conn.query("INSERT into m_pedidos set ?", pedido);
    if (querys[0].affectedRows > 0) {
      data.comidas.forEach(async (detalle) => {
        const insertado = {
          id_pedido: querys[0].insertId,
          id_comida: detalle.id_comida,
          cantidad: detalle.cantidad,
          precio: detalle.subtotal,
        };
        const result = await conn.query(
          "INSERT into det_pedido SET ?",
          insertado
        );
        const ingredientes = await conn.query(
          `SELECT id_comida, cantidad from det_pedido where id_pedido =${querys[0].insertId};`
        );
        ingredientes[0].forEach(async (element) => {
          const res = await conn.query(
            `SELECT id_ingrediente, cantidad from det_ingrediente where id_comida=${element.id_comida}`
          );
          res[0].forEach(async (elemento) => {
            const sas = await conn.query(
              `UPDATE cat_ingredientes set cantidad=cantidad-${element.cantidad}*${elemento.cantidad} where id_ingrediente = ${elemento.id_ingrediente}`
            );
            if (sas.error) NextResponse.json({ error: error }, { status: 500 });
            const upd = await conn.query(
              `insert into extras_ingredientes set ?`,
              {
                id_ingredientes: elemento.id_ingrediente,
                cantidad: (element.cantidad * elemento.cantidad),
                tipo: false,
              }
            );
          });
        });
      });
      const quitarS = await conn.query(
        "Update cat_usuarios set saldo=saldo-? where id_cuenta =?",
        [data.total, data.id_cuenta]
      );

      return NextResponse.json({ message: "Se ha realizado el pedido" });
    }
    return NextResponse.json({ message: "Ha ocurrido un error al subir" });
  } catch (error) {
    return NextResponse.json(
      { error: "Ups ha habido un error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const id = data.id;
    const res = await conn.query(`SELECT
  m.id_pedido,
  m.estado,
  d.cantidad,
  c.nombre AS nombre_alimento
FROM
  m_pedidos m
JOIN
  det_pedido d ON m.id_pedido = d.id_pedido
JOIN
  cat_comidas c ON d.id_comida = c.id_comidas
WHERE
  m.id_cuenta=${id} and m.estado!=6
`);
    return NextResponse.json(res[0]);
  } catch (error) {
    return NextResponse.json(
      { message: "ups ha habido un error" },
      { status: 500 }
    );
  }
}
