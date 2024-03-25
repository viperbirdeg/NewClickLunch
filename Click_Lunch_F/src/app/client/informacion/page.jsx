import InformacionCliente from "@/components/informacion";
import Tablass from "@/components/paraTabla";
import TablaPedidos from "@/components/tablaPedidos";
export default function Informacion(request) {
  const { searchParams } = request;
  
  return (

    <div className="flex bg-white items-center justify-center h-screen">
        <div className="w-[600px] shadow-lg rounded-[50px] p-8">
  <InformacionCliente borrarCarrito={searchParams.borrar} />
  </div>
  </div>
  );
}
