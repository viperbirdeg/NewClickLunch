import { conn } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const res = await conn.query(` SELECT 
    m_pedidos.id_pedido,
    m_pedidos.id_cuenta,
    m_pedidos.total,
    m_pedidos.estado AS estado_actual_id,
    cat_estados.nombre AS estado_actual_nombre,
    (m_pedidos.estado + 1) AS estado_siguiente_id,
    (SELECT cat_estados.nombre FROM cat_estados WHERE cat_estados.id_estado = m_pedidos.estado + 1) AS estado_siguiente_nombre,
    m_pedidos.fecha,
    GROUP_CONCAT(det_pedido.cantidad) AS cantidades_detalles,
    GROUP_CONCAT(det_pedido.precio) AS precios_detalles,
    GROUP_CONCAT(cat_comidas.nombre) AS nombres_comidas
FROM m_pedidos
JOIN cat_estados ON m_pedidos.estado = cat_estados.id_estado
JOIN det_pedido ON m_pedidos.id_pedido = det_pedido.id_pedido
JOIN cat_comidas ON det_pedido.id_comida = cat_comidas.id_comidas
WHERE m_pedidos.estado <> 6 AND m_pedidos.estado = ${params.id}
GROUP BY m_pedidos.id_pedido;
`);
    return NextResponse.json(res[0]);
  } catch (error) {
    return NextResponse.json(
      { message: "Ha ocurrido un error" },
      { status: 500 }
    );
  }
}
