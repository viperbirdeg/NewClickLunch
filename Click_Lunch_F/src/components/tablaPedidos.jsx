import axios from "axios";

export default async function TablaPedidos({ id_cuenta }) {
  const res = await axios.get(
    `https://clicklunchf-production-2991.up.railway.app/api/apiCliente/pedido/${id_cuenta}`
  );
  const resultadosTransformados = res.data.map((resultado) => {
    const cantidades = resultado.cantidades_detalles.split(",").map(Number);
    const precios = resultado.precios_detalles.split(",").map(Number);
    const nombresComidas = resultado.nombres_comidas.split(",");
    if (
      cantidades.length === precios.length &&
      precios.length === nombresComidas.length
    ) {
      const idPedido = resultado.id_pedido;

      return cantidades.map((cantidad, index) => ({
        id_pedido: idPedido,
        cantidad,
        precio: precios[index],
        nombre: nombresComidas[index],
      }));
    } else {
      return [];
    }
  });

  return (
    <div className="flex justify-center items-center">
  <table className="absolute min-w-full max-w-md bg-white border border-gray-300 top-[180px] mx-5 mr-5">
  <thead className="bg-[#25a18ee6]">
    <tr>
      <th className="py-2 px-2 md:px-4 border-b">ID Pedido</th>
      <th className="py-2 px-2 md:px-4 border-b">Total</th>
      <th className="py-2 px-2 md:px-4 border-b">Estado</th>
      <th className="py-2 px-2 md:px-4 border-b">Fecha</th>
      <th className="py-2 px-2 md:px-4 border-b">Cantidades Detalles</th>
      <th className="py-2 px-2 md:px-4 border-b">Precios Detalles</th>
      <th className="py-2 px-2 md:px-4 border-b">Nombres Comidas</th>
    </tr>
  </thead>
  <tbody>
    {res.data.map((pedido) => (
      <tr key={pedido.id_pedido}>
        <td className="py-2 px-2 md:px-4 border-b text-center">{pedido.id_pedido}</td>
        <td className="py-2 px-2 md:px-4 border-b text-center">{pedido.total}</td>
        <td className="py-2 px-2 md:px-4 border-b text-center">{pedido.estado_nombre}</td>
        <td className="py-2 px-2 md:px-4 border-b text-center">{pedido.fecha}</td>
        <td className="py-2 px-2 md:px-4 border-b text-center">
          {pedido.cantidades_detalles.split(",").map((detalle, index) => (
            <div key={index} className="mb-1">{detalle}</div>
          ))}
        </td>
        <td className="py-2 px-2 md:px-4 border-b text-center">
          {pedido.precios_detalles.split(",").map((detalle, index) => (
            <div key={index} className="mb-1">{detalle}</div>
          ))}
        </td>
        <td className="py-2 px-2 md:px-4 border-b text-center">
          {pedido.nombres_comidas.split(",").map((detalle, index) => (
            <div key={index} className="mb-1">{detalle}</div>
          ))}
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
  );
}