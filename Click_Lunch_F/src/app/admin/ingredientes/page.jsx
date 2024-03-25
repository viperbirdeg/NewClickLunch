"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Ingredientes() {
  const [datos, setDatos] = useState({
    nombre: "",
    cantidad: 0,
    precio: 0,
    unidad: 0,
  });
  const [unidades, setUnidades] = useState([]); // Estado para almacenar las unidades
  const router = useRouter();

  useEffect(() => {
    const cargarUnidades = async () => {
      const unidadesData = await dats();
      setUnidades(unidadesData);
    };
    cargarUnidades();
  }, []);

  const handleCahnge = (e) => {
    setDatos((prevDatos) => ({
      ...prevDatos,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(datos)
    const res = await axios.post(
      `https://clicklunchf-production-2991.up.railway.app/api/apiCafeteria/crearIngrediente`,
      datos
    );
    if (res.data) {
      const conf = Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "La creación del ingrediente fue exitosa.",
      });
      router.push('/admin/pedidos');
    }
  };

  const dats = async () => {
    const res = await axios.get(
      "/api/apiCafeteria/crearIngrediente"
    );
    return res.data;
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
    <div className="w-[1440px] h-[1000px] flex flex-wrap justify-around bg-white relative">

    <div className="absolute w-[600px] h-[800px] top-[80px] left-[504px] shadow-lg rounded-[50px]">
    <div className="absolute top-[24px] left-[120px] font-nunito font-normal text-black text-[40px] text-center leading-normal tracking-normal">
            Crear Ingrediente
          </div>

    <form onSubmit={handleSubmit}>
      <div className="absolute w-[219px] top-[121px] left-[63px] font-poppins font-normal text-[#09090999] text-[16px] leading-[24px] tracking-[0.15px]">
        Nombre
      </div>
      <div className="absolute w-[219px] top-[241px] left-[63px] font-poppins font-normal text-[#09090999] text-[16px] leading-[24px] tracking-[0.15px]">
        Cantidad
      </div>
      <div className="absolute w-[219px] top-[371px] left-[63px] font-poppins font-normal text-[#09090999] text-[16px] leading-[24px] tracking-[0.15px]">
        Precio
      </div>
      <div className="absolute w-[219px] top-[491px] left-[63px] font-poppins font-normal text-[#09090999] text-[16px] leading-[24px] tracking-[0.15px]">
        Unidad
      </div>

      <div className="absolute w-[450px] h-[48px] top-[152px] left-[85px] bg-white border border-[#797979]">
        <input
          name="nombre"
          placeholder="Nombre"
          className="absolute w-[438px] h-[35px] top-[5px] left-[5px] font-nunito font-normal text-black bg-[white] text-[24px] leading-normal tracking-normal border-none outline-none"
          onChange={handleCahnge}
        />
      </div>


      <div className="absolute w-[450px] h-[48px] top-[273px] left-[85px] bg-white border border-[#797979]">
        <select
          name="unidad"
          className="absolute w-[438px] h-[35px] top-[260px] left-[0px] font-nunito font-normal bg-[white] text-black text-[24px] leading-normal tracking-normal border-none outline-none"
          onChange={handleCahnge}
        >
          <option value="">Seleccionar Unidad</option>
          {unidades.map((unidad) => (
            <option key={unidad.id_unidad} value={unidad.id_unidad}>
              {unidad.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
        className="absolute w-[438px] h-[35px] top-[280px] left-[90px] font-nunito font-normal text-black bg-[white] text-[24px] leading-normal tracking-normal border-none outline-none"
          name="cantidad"
          placeholder="Cantidad"
          type="number"
          onChange={handleCahnge}
        />
      </div>
      <div className="absolute w-[450px] h-[48px] top-[402px] left-[85px] bg-white border border-[#797979]">
        <input
        className="absolute w-[438px] h-[35px] top-[5px] left-[5px] font-nunito font-normal text-black bg-[white] text-[24px] leading-normal tracking-normal border-none outline-none"
          name="precio"
          placeholder="Precio"
          type="number"
          onChange={handleCahnge}
        />
      </div>
      <button className="absolute w-[450px] h-[77px] top-[700px] left-[70px] bg-[#25a18ee6] rounded-full border-none cursor-pointer">
        <div className="absolute w-[338px] h-[20px] top-[28px] left-[56px] font-poppins font-bold text-white text-[24px] text-center leading-[20px]">
          Crear Ingrediente
        </div>
      </button>
    </form>
    </div>

    </div>
    </div>
  );
}
