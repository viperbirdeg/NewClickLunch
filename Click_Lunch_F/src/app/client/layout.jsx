"use client";
import BtnOpciones from "@/components/BtnOpciones";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function RootLayout({ children }) {
  const router = useRouter();
  const session = useSession();

  console.log(session.data);
  console.log(session.data.user.tipo);
  /*if (session.data) {
    if (session.data.user.tipo === 0) {*/
      return (
        <>
          <BtnOpciones></BtnOpciones>
          {children}
        </>
      );/*
    } else {
      router.push("/admin/pedidos");
    }
  }*/
}
