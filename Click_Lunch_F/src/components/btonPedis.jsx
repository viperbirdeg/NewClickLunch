import axios from "axios";
import Link from "next/link";
export default function BtonPedir({ carrito, id_cuenta, saldo }) {
  const datos = { ...carrito, id_cuenta };
  var error;
  const handleSubmit = async () => {
    if (datos.total <= saldo) {
      const res = await axios.post(
        "/api/apiCliente/pedido",
        datos
      );
      if (res.error) return console.log(error);
    } else {
      error = "fjasd";
      alert("No tienes suficiente dinero <3");
    }
  };

  return (
      <button
        onClick={handleSubmit}
        className="absolute w-[528px] h-[95px] top-[759px] left-[426px] bg-[#25a18ee6] rounded-full border-none cursor-pointer"
      >
        <div className="absolute w-[523px] h-[20px] top-[37px] left-[0px] font-poppins-bold text-[white] text-[32px] text-center leading-[20px]">
          Pedir
        </div>
      </button>
  );
}
