import axios from "axios";
import CardCocina from "@/components/CardCocina";
async function Menu() {
  const res = await axios.get(`http://localhost:3000/api/apiCliente/menu`);
  const comidas = res.data;
  return (
    <form className="bg-white flex flex-col items-center justify-center w-full overflow-hidden min-h-screen">
      <div className="w-full max-w-screen-2xl h-full flex flex-wrap justify-around bg-white relative">
        <div className="absolute top-4 md:top-8 lg:top-12 left-1/2 transform -translate-x-1/2 font-nunito font-normal text-black text-4xl md:text-5xl lg:text-6xl text-center leading-normal tracking-normal">
          Menú
        </div>

        <div className="mt-16 md:mt-24 lg:mt-32 w-full max-w-screen-2xl h-full flex flex-wrap items-center justify-center">
          {comidas.map((item) => (
            <CardCocina key={item.id} comidas={item} />
          ))}
        </div>
      </div>
    </form>
  );
}

export default Menu;
