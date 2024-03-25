"use client";

import { useSession } from "next-auth/react";
import TablaPedidos from "./tablaPedidos";

export default function Tablass() {
  const { data: session } = useSession();
  return <TablaPedidos id_cuenta={session.user.id_cuenta} />;
}
