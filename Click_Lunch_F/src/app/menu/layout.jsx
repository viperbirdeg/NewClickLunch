"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BtnOpciones from "@/components/BtnOpciones";

export default function Layout({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    if (session.user.tipo === 0) {
      return <>
      <BtnOpciones/>
      {children};</>;
    } else {
      router.push("/admin/pedidos");
    }
  }
}
