"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { User, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  esContrasenaValida,
  esCorreoElectronico,
  soloLetras,
} from "@/libs/val";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
export default function Registrar() {
  const [captcha, setCaptcha] = useState();

  const router = useRouter();
  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captcha) {
      alert("ingrese captcha");
      return;
    }
    if (!datos.nombre || !datos.email || !datos.password || !datos.password2) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!esCorreoElectronico(datos.email)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    if (!esContrasenaValida(datos.password)) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (!soloLetras(datos.nombre)) {
      setError("Nombre invalido");
      returnS;
    }

    if (datos.password !== datos.password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (datos.password === datos.password2) {
      const res = await axios.post(
        "/api/apiCliente/registrar",
        {
          ...datos,
          redirect: false,
        }
      );
      if (res.status === 200) {
        const res = await signIn("credentials", {
          nombre: datos.nombre,
          email: datos.email,
          password: datos.password,
          redirect: false,
          callbackUrl: "/menu ",
        });
        if (res.error) return console.log(res.error);
      }
    } else {
      alert("Contraseñas no hacen match <3");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full bg-cl-1 bg-repeat h-screen flex justify-center items-center ">
        <div className="p-5 bg-white m-10 border-2 border-[#25a18ee6] rounded-md lg:w-3/12 flex flex-col items-center">
          <div className="text-2xl text-[#25a18ee6] font-semibold ">
            Registro
          </div>
          <img
            className="w-64"
            src="https://i.ibb.co/g9czN3L/logo.png"
            alt="Logo"
          />
          <div className="flex flex-row justify-center p-2  border-2 rounded-md border-[#25a18ee6] items-center">
            <User size={32} />
            <input
              className=" ml-2 border-none outline-none"
              type="text"
              name="nombre"
              placeholder="Usuario"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-row justify-center p-2 mt-5 border-2 rounded-md border-[#25a18ee6] items-center ">
            <Mail size={32} />
            <input
              className=" ml-2 border-none outline-none"
              type="email"
              name="email"
              placeholder="Correo"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-center p-2 mt-5 border-2 rounded-md border-[#25a18ee6] items-center">
            <Lock size={32} />
            <input
              className="ml-2  border-none outline-none"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-center mt-5 p-2 border-2 rounded-md border-[#25a18ee6] items-center">
            <Lock size={32} />
            <input
              className=" ml-2 border-none outline-none"
              type="password"
              name="password2"
              placeholder="Confirmar contraseña"
              onChange={handleChange}
            />
          </div>
          <button className=" bg-[#25a18ee6] w-8/12 hover:bg-[#5cc0b1e6] duration-100 scale-105 rounded-xl py-2 px-3 mt-5 border-none cursor-pointer">
            <div className="font-poppins-bold text-[white] ] text-center ">
              Registrarse
            </div>
          </button>
          <Link href="/">
            <p className=" font-normal text-blue-500 text-lg mt-5 text-center underline">
              ¿Ya tienes cuenta? Inicia sesión
            </p>
          </Link>
          <div className=" border-t border-gray-500 "></div>
          <p className="text-xl text-center">ó</p>
          <div className=" border-t border-gray-500 "></div>
          <button
            onClick={() => {
              if (captcha) {
                const res = signIn("google", {
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
            className=""
            onChange={setCaptcha}
          />
        </div>
      </div>
    </form>
  );
}
