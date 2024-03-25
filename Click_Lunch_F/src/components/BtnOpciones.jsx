"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
const BtnOpciones = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {data:session}=useSession()
  return (
    <div className="fixed top-50 left-50 z-50 p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-50 h-50 cursor-pointer bg-transparent border-none"
      >
        <img
         src="https://i.ibb.co/hmdxg59/btn-opciones.png" alt="menu" />
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
                  href="/menu"
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                >
                  <img
                    className="pl-[4px]"
                    src="/img/sidebar/casa-2.png"
                    alt=""
                  />
                  Menú
                </Link>
                <Link
                  href="/client/carrito"
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                >
                  <img
                    className="pl-[4px]"
                    src="/img/sidebar/carrito-icon.png"
                    alt=""
                  />
                  Carrito
                </Link>
                <Link
                  href="/client/informacion"
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                >
                  <img
                    className="pl-[4px]"
                    src="/img/sidebar/user-icon.png"
                    alt=""
                  />
                  Perfil
                </Link>
                <Link href={"/client/pedidos/" + session.user.id_cuenta} className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200">
                  <img
                    className="pl-[4px]"
                    src="/img/sidebar/reloj.png"
                    alt=""
                  />
                  <div>Pedidos</div>
                </Link>
                </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default BtnOpciones;
