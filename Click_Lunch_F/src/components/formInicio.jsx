"use client";
import {  Lock, Mail } from "lucide-react";
import { signIn, } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { esContrasenaValida, esCorreoElectronico } from "@/libs/val";
export default function FormInicio() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [captcha, setCaptcha] = useState();
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!esCorreoElectronico(credentials.email)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    if (!esContrasenaValida(credentials.password)) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (captcha) {
      try {
        const res = await signIn("credentials", {
          ...credentials,
          callbackUrl: "/menu ",
        });
        if (res?.error) setError(res.error);
      } catch (error) {
        setError(error);
      }
    } else {
      alert("Ingresa el captcha");
    }
  };
  return (
    <div className="w-full bg-cl-1 bg-repeat   h-screen flex justify-center items-center ">
      <div className="p-5 bg-white m-10 border-2 border-[#25a18ee6] rounded-md lg:w-3/12 flex flex-col items-center">
        <span className="text-2xl text-[#25a18ee6] font-semibold ">
          Iniciar sesión
        </span>
        <img
          className="w-64"
          src="https://i.ibb.co/g9czN3L/logo.png"
          alt="Logo"
        />
        <form className="mt-8" onSubmit={handleSubmit}>
          {error && (
            <div className="flex bg-red-400 align-baseline">{error}</div>
          )}

          <div className="flex flex-row justify-center p-2 border-2 rounded-md border-[#25a18ee6] items-center">
            <Mail size={32} />
            <input
              type="email"
              name="email"
              className=" border-none outline-none ml-2"
              placeholder="Correo"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row mt-5 justify-center p-2 border-2 rounded-md border-[#25a18ee6] items-center">
            <Lock size={32} />
            <input
              type="password"
              name="password"
              className="  border-none ml-2 outline-none"
              placeholder="Contraseña"
              required
              onChange={handleChange}
            />
          </div>
          <button className=" w-full bg-[#25a18ee6] hover:bg-[#5cc0b1e6] duration-100 scale-105 rounded-xl py-2 px-3 mt-5 border-none cursor-pointer">
            <div className=" font-poppins-bold text-[white]  text-center ">
              Iniciar sesión
            </div>
          </button>
        </form>

        <Link href="/registrar" className="mt-3">
          <p className=" font-normal text-blue-500 text-md text-center underline">
            ¿No tienes cuenta? Regístrate
          </p>
        </Link>

        <div className=" border-t border-gray-500 "></div>
        <p className="text-xl text-center">ó</p>
        <div className=" border-t border-gray-500 "></div>

        <button
          onClick={() => {
            if (captcha) {
              signIn("google", {
                callbackUrl: "/menu ",
              });
            } else {
              alert("Ingresa el captcha");
            }
          }}
          className=" bg-[#EFEFEF] rounded-full border-none my-4 cursor-pointer"
        >
          <div className="font-poppins-bold flex flex-row justify-center items-center p-2 text-black  text-center ">
            <img
              className="w-8"
              src="https://i.ibb.co/xJRLWfJ/gugulnobg-removebg-preview.png"
              alt=""
            />
            Iniciar sesión con Google
          </div>
        </button>
        <ReCAPTCHA
          sitekey="6LcY1x0pAAAAAJP9oTr0OHHCjlVu1ZIggttWZsYa "
          onChange={setCaptcha}
        />
      </div>
    </div>
  );
}
