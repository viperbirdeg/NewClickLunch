import { NextResponse } from "next/server";
import { conn } from "@/libs/db";
export async function GET(request, { params }) {
  try {
    const id = params.id;
    const res = await conn.query(`SELECT 
    m_pedidos.id_pedido,
    m_pedidos.id_cuenta,
    m_pedidos.total,
    cat_estados.nombre AS estado_nombre,
    m_pedidos.fecha,
    GROUP_CONCAT(det_pedido.cantidad) AS cantidades_detalles,
    GROUP_CONCAT(det_pedido.precio) AS precios_detalles,
    GROUP_CONCAT(cat_comidas.nombre) AS nombres_comidas
  FROM m_pedidos
  JOIN cat_estados ON m_pedidos.estado = cat_estados.id_estado
  JOIN det_pedido ON m_pedidos.id_pedido = det_pedido.id_pedido
  JOIN cat_comidas ON det_pedido.id_comida = cat_comidas.id_comidas
  WHERE m_pedidos.estado <> 6 AND m_pedidos.id_cuenta = ${id}
  GROUP BY m_pedidos.id_pedido;  
  `);
    return NextResponse.json(res[0]);
  } catch (error) {
    return NextResponse.json(
      { message: "ups ha habido un error" },
      { status: 500 }
    );
  }
}
