"use client";
import FormInicio from "@/components/formInicio";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("/menu");
  }
  return <FormInicio />;
}
