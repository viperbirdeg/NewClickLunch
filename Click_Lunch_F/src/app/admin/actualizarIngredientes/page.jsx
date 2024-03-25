"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import BtnOpcionesAdmin from "@/components/BtnOpcionesAdmin";
import { esNumero } from "@/libs/val";

export default function Actualizar() {
  const [error, setError] = useState("");
  const [comidaN, setComidaN] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    ingredientes: [],
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/api/apiCafeteria/ingredientes`).then((res) => {
      const { nombre, descripcion, precio, ingredientes } = res.data;
      setComidaN({
        nombre,
        descripcion,
        precio,
        ingredientes,
      });
    });
  }, []); // Añadí un arreglo vacío para que el efecto se ejecute solo una vez al montar el componente

  const handleChangeCantidad = (e) => {
    if (!esNumero(parseInt(e.target.value, 10))) {
      setError("dka");
      return;
    }
    setComidaN((prevComidaN) => ({
      ...prevComidaN,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-[600px] shadow-lg rounded-[50px] p-8">
          <h1 className="text-center text-2xl font-nunito font-bold text-black mb-2">
            Actualizar Ingredientes
          </h1>
          <div className="text-4xl font-nunito font-bold text-center text-black mb-4">
            {comidaN.nombre}
          </div>
          <p className="text-center font-nunito font-normal text-black text-lg mb-4">
            {comidaN.descripcion}
          </p>
          <p className="text-center font-nunito bold font-normal text-black text-base mb-4">
            Precio: ${comidaN.precio}
          </p>

          <div className="flex flex-col space-y-4">
            {comidaN.ingredientes.map((ingrediente, index) => (
              <div className="flex flex-col space-y-1 items-center" key={index}>
                <p className="text-lg font-nunito font-semibold">{ingrediente.nombre}</p>
                <p className="text-base font-nunito">Cantidad:</p>
                <div className="flex items-center">
                  <input
                    type="number"
                    name={ingrediente.nombre}
                    onChange={handleChangeCantidad}
                    placeholder={ingrediente.cantidad}
                    className="border border-gray-300 p-1 rounded"
                  />
                  <button
                    className="bg-[#25a18ee6] text-white p-1 rounded ml-2"
                    onClick={async () => {
                      const encontrado = comidaN.ingredientes.find(
                        (item) => item.id_ingrediente === ingrediente.id_ingrediente
                      );

                      if (encontrado) {
                        encontrado.cantidad = comidaN[encontrado.nombre];

                        const res = await axios.put(
                          `http://localhost:3000/api/apiCafeteria/ingredientes`,
                          {
                            cantidad: encontrado.cantidad,
                            id_ingrediente: encontrado.id_ingrediente,
                          }
                        );

                        setComidaN((prevComidaN) => ({
                          ...prevComidaN,
                          ingredientes: [...prevComidaN.ingredientes],
                        }));
                        alert('se actualizo')
                      } else {
                        alert("</3");
                      }
                    }}
                  >
                    Actualizar Ingrediente
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <table>
        {/* tabla para ver entradas y salidas */}
      </table>
    </>
  );
}
