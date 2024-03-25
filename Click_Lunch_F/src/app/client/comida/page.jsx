import FormComida from "@/components/formComida";
import BtnOpciones from "@/components/BtnOpciones";
import axios from "axios";


export default async function Comida(request) {
  const { searchParams } = request;
  const comidaId = searchParams.comida;
 
  return (

    <div className="bg-white flex flex-row justify-center w-full">
  <div className="bg-white top-[50px] w-[1440px] h-[864px] relative shadow-xl rounded-[50px]">
    <div className="absolute top-[29px] h-[500px]">
      <FormComida comidas={comidaId} />
    </div>
  </div>
</div>
  );
}