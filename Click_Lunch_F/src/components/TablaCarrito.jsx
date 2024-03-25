
const TablaCarrito = ({ alimento, cantidad, subtotal }) => {
  return (
    <tr>
      <td>{alimento}</td>
      <td>{cantidad}</td>
      <td>${subtotal}</td>
    </tr>
  );
};

export default TablaCarrito;
