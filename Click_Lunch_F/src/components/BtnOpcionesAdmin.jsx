"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";
const BtnOpcionesAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed top-50 left-50 z-50 p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-50 h-50 cursor-pointer bg-transparent border-none"
      >
        <img width={50} height={50} src="https://i.ibb.co/hmdxg59/btn-opciones.png" alt="menu" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-start z-40">
          <div className="bg-gray-900 w-64 h-screen p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-lg mb-4"
            >
                ✖️
              </button>
              <nav className="space-y-4">

                <Link
                  href="/admin/pedidos"
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                >
                  <img width={50} height={50}
                    className="pl-[4px]"
                    src="/img/sidebar/icon-pedidos.png"
                    alt=""
                  />
                  Pedidos
                </Link>

                <Link
                  href="/admin/agregarSaldo"
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                >
                  <img width={50} height={50}
                    className="pl-[4px]"
                    src="/img/sidebar/cartera-icon2.png"
                    alt=""
                  />
                  Agregar Saldo
                </Link>

                <Link
                  href="/admin/comidas"
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                >
                  <img width={50} height={50}
                    className="pl-[4px]"
                    src="/img/sidebar/icons8-barra-de-comida-24.png"
                    alt=""
                  />
                  Comidas
                </Link>

                <Link
                  href="/admin/ingredientes"
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                >
                  <img width={50} height={50}
                    className="pl-[4px]"
                    src="/img/sidebar/lechuga.png"
                    alt=""
                  />
                  Ingredientes
                </Link>

                <Link
                  href="/admin/actualizarIngredientes"
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                >
                  <img width={50} height={50}
                    className="pl-[4px]"
                    src="/img/sidebar/icons8-actualizar-30.png"
                    alt=""
                  />
                  Actualizar Ingrediente
                </Link>

                <button
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <img width={50} height={50}
                    className="pl-[4px]"
                    src="/img/sidebar/logout.png"
                    alt=""
                  />
                  Cerrar sesion
                </button>
                </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default BtnOpcionesAdmin;
