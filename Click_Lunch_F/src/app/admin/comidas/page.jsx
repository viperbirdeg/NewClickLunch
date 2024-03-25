"use client";

import BtnOpcionesAdmin from "@/components/BtnOpcionesAdmin";
import AlimentoCrear from "@/components/AlimentoCrear";

export default function IngresarComida() {
  return (
    <div className="bg-[#94A5A2] flex flex-row justify-center w-full">
      <div className="bg-[#94A5A2] w-[1440px] h-full relative">
        <AlimentoCrear />
      </div>
    </div>
  );
}
