import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [comidasResultados] = await conn.query(`
      SELECT *
      FROM cat_comidas
    `);
    const [ingredientesResultados] = await conn.query(`
      SELECT *
      FROM cat_ingredientes
    `);

    const [detPedidoResultados] = await conn.query(`
      SELECT *
      FROM det_ingrediente
    `);

    const comidasDisponibles = [];

    for (const comida of comidasResultados) {
      const idComida = comida.id_comidas;

      const detallesComida = detPedidoResultados.filter((detalle) => detalle.id_comida === idComida);

      const esPreparable = detallesComida.every((detalle) => {
        const ingrediente = ingredientesResultados.find((ing) => ing.id_ingrediente === detalle.id_ingrediente);
        return ingrediente && ingrediente.cantidad >= detalle.cantidad;
      });

      if (esPreparable) {
        comidasDisponibles.push(comida);
      }
    }

    return NextResponse.json(comidasDisponibles)
  } catch (error) {
    console.error('Error al ejecutar las consultas:', error);
    return NextResponse.json({error:error},{status:500})
  }
}