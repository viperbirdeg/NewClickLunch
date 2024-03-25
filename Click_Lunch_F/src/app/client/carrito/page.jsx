"use client";
import React, { useState } from "react";
import BtnOpciones from "../../../components/BtnOpciones";
import { useSession } from "next-auth/react";
import BtonPedir from "@/components/btonPedis";
import Image from "next/image";
function Carrito() {
  const { data: session, update } = useSession();
  const carrito = session.user.carrito;
  const [error, setError] = useState("");
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full md:w-[768px] lg:w-[1024px] xl:w-[1440px] h-auto relative">

        <div className="absolute w-full md:w-[100px] top-[50px] left-[646px] transform -translate-x-1/2 font-nunito font-normal text-black text-[32px] md:text-[64px] text-center leading-normal tracking-normal">
          Carrito
        </div>
        {session.user.carrito.total > 0 ? (
          <table className="absolute text-center top-[160px] w-1/2 mt-5 border-collapse left-1/2 transform -translate-x-1/2">
            <thead>
              <tr>
                <th className="border border-gray-300 justify-center bg-[#25a18ee6] text-[white] text-center py-2 px-3">
                  Producto
                </th>
                <th className="border border-gray-300 justify-center bg-[#25a18ee6] text-[white] text-center py-2 px-3">
                  Cantidad
                </th>
                <th className="border border-gray-300 justify-center bg-[#25a18ee6] text-[white] text-center py-2 px-3">
                  Subtotal
                </th>
                <th className="border border-gray-300 justify-center bg-[#25a18ee6] text-[white] text-center py-2 px-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {carrito.comidas.map((item) => (
                <>
                  <tr>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>${item.subtotal}</td>
                    <button
                      onClick={() => {
                        const handleE = (id_comida) => {
                          const carritoFiltrado = carrito.comidas.filter(
                            (item) => item.id_comida !== id_comida
                          );

                          const totalActualizado = carritoFiltrado.reduce(
                            (total, item) => total + item.subtotal,
                            0
                          );
                          const carritoN = {
                            total: totalActualizado,
                            comidas: carritoFiltrado,
                          };
                          update({ carrito: carritoN });
                        };

                        handleE(item.id_comida);
                      }}
                    >
                      <Image src="/img/carrito/borrar-1.png" />
                    </button>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="absolute max-w-500 top-[195px] left-[430px] bg-[#DDDDDD] border-1 border-ddd p-20 rounded-[20px]">
            <h1 className="text-3xl text-3f3131">
              ¡No hay nada en el carrito!
            </h1>{" "}
          </div>
        )}

        <div className="absolute w-[520px] h-[90px] top-[645px] left-[430px] bg-[#DDDDDD] border-1 border-ddd  rounded-[20px]">
          <div className="absolute text-3xl text-3f3131 top-[30px] left-[20px]">
            Total
          </div>
          <div className="absolute text-3xl text-3f3131 top-[30px] right-[50px]">
            ${session.user.carrito.total}
          </div>
        </div>

        <div className="babsolute w-[893px] h-[88px] top-[743px] left-[567px]">
          <BtonPedir
            onClick={() => {
              if (session.user.saldo < session.user.carrito.total) {
                setError("sa");
                return;
              } else {
                handleE(item.id_comida);
              }
            }}
            saldo={session.user.saldo}
            carrito={session.user.carrito}
            id_cuenta={session.user.id_cuenta}
          />
        </div>
      </div>
    </div>
  )
}

export default Carrito;
