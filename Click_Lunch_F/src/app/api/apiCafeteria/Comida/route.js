import { conn } from "@/libs/db";
import { NextResponse } from "next/server";
import { processImage } from "@/libs/processImage";
import cloudinary from "@/libs/cloudinary";
import Ingredientes from "@/app/admin/ingredientes/page";
export async function POST(request) {
  try {
    const data = await request.formData();
    const imagen = data.get("imagen");
    if (!imagen) {
      return NextResponse.json(
        {
          message: "Image is required",
        },
        {
          status: 400,
        }
      );
    }

    const buffer = await processImage(imagen);

    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
          },
          async (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          }
        )
        .end(buffer);
    });

    const result = await conn.query("INSERT INTO cat_comidas SET ?", {
      nombre: data.get("nombre"),
      tipo: data.get("tipos"),
      descripcion: data.get("descripcion"),
      precio: data.get("precio"),
      imagen: res.secure_url,
    });

    const datos = data.get("ingredientes");
    const ingredientes = JSON.parse(datos)
    ingredientes.map(async (item) => {
      await conn.query("INSERT into det_ingrediente set ?", {
        id_ingrediente: item.id_ingrediente,
        id_comida: result[0].insertId,
        cantidad: item.cantidad,
      });
    });

    const results = {
      name: data.get("nombre"),
      description: data.get("descripcion"),
      price: data.get("precio"),
      id: result[0].insertId,
    };
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
