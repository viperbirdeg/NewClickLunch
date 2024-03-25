"use client";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { esNumero, soloLetras } from "@/libs/val";
function AlimentoForm() {
  const [error, setError] = useState("");
  const [numeroIteraciones, setNumeroIteraciones] = useState(1);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState(
    []
  );

  const [comidaN, setComidaN] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    tipo: [],
  });
  const [datos, setDatos] = useState({
    ingrediente: [],
    tipo: "",
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setComidaN({
      ...comidaN,
      [e.target.name]: e.target.value,
    });
  };

  const handleIngredientChange = (index, elemento, cambiar) => {
    const ingredienteExistente = ingredientesSeleccionados.find(
      (ingrediente) => ingrediente.index === index
    );

    if (ingredienteExistente) {
      const nuevosIngredientes = ingredientesSeleccionados.map((ingrediente) =>
        ingrediente.index === index
          ? { ...ingrediente, [cambiar]: elemento }
          : ingrediente
      );

      setIngredientesSeleccionados(nuevosIngredientes);
    } else {
      if (cambiar === "id_ingrediente") {
        setIngredientesSeleccionados([
          ...ingredientesSeleccionados,
          { index, id_ingrediente: elemento, cantidad: 1 },
        ]);
      } else if (cambiar === "cantidad") {
        setIngredientesSeleccionados([
          ...ingredientesSeleccionados,
          { index, id_ingrediente: "", cantidad: elemento },
        ]);
      }
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/api/apiCafeteria/ingredientes`).then((res) => {
      const { nombre, descripcion, precio, imagen, ingredientes, tipos } =
        res.data;
      setComidaN({
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        tipo: tipos,
      });
      setDatos({
        ingrediente: ingredientes,
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!soloLetras(comidaN.nombre) || !soloLetras(comidaN.descripcion)) {
      setError("DS");
      alert("1");
      return;
    }
    if (esNumero(comidaN.precio)) {
      alert("2");

      setError("ds");
      return;
    }
    if (!file) {
      alert("3");

      setError("dsa");
      return;
    }

    if (!ingredientesSeleccionados.length > 0) {
      setError("da");
      alert("4");

      return;
    }
    if (
      !ingredientesSeleccionados.every(
        (ingrediente) => ingrediente.id_ingrediente && ingrediente.cantidad
      )
    ) {
      setError(
        "Alguno de los ingredientes seleccionados tiene propiedades nulas."
      );
      alert("5");

      return;
    }
    const r = comidaN.tipo.find((tipo) => {
      console.log(datos.tipo)
      tipo.id_tipos === datos.tipo;
    });
    if (!comidaN.tipo.find((tipo) => tipo.id_tipos == datos.tipo)) {
      setError("Seleccione un tipo válido.");
      alert("6");

      return;
    }

    const formData = new FormData();
    formData.append("nombre", comidaN.nombre);
    formData.append("descripcion", comidaN.descripcion);
    formData.append("precio", comidaN.precio);
    if (file) {
      formData.append("imagen", file);
    }
    formData.append("ingredientes", JSON.stringify(ingredientesSeleccionados));
    formData.append("tipos", datos.tipo);

    try {
      const resultado = await axios.post(
        `http://localhost:3000/api/apiCafeteria/Comida`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      form.current.reset();
      router.refresh();
      router.push("/admin/pedidos");
    } catch (error) {
      console.error("Error al enviar la comida:", error);
    }
  };

  return (
    <div className="absolute left-[400px] top-[60px] font-nunito">
      <h1 className="text-4xl font-bold text-center mb-8">
        Crear Nuevo Producto
      </h1>
      <form
        className="bg-white shadow-md rounded-[20px] px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="nombre"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre del Producto:
        </label>
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
          value={comidaN.nombre}
          className="shadow appearance-none border rounded w-full py-2 px-3 flex flex-row"
          autoFocus
        />
        <br />
        <label
          htmlFor="descripcion"
          className="block text-gray-700 text-sm font-bold mb-2 flex flex-row"
        >
          Descripción del Producto:
        </label>
        <textarea
          name="descripcion"
          rows={3}
          placeholder="Descripción"
          onChange={handleChange}
          value={comidaN.descripcion}
          className="shadow appearance-none border rounded w-full py-2 px-3 flex flex-row resize-none"
        />
        <br />
        <label
          htmlFor="precio"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Precio del Producto:
        </label>
        <input
          name="precio"
          type="number"
          placeholder="Precio"
          onChange={handleChange}
          value={comidaN.precio}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />
        <br />
        <div>
          <br />
          <label>
            Número de Ingredientes:
            <input
              className="shadow appearance-none border rounded ml-2"
              type="number"
              min={1}
              value={numeroIteraciones}
              onChange={(e) =>
                setNumeroIteraciones(parseInt(e.target.value, 10))
              }
            />
            <br />
          </label>
          <br />
          {[...Array(numeroIteraciones)].map((_, index) => (
            <div className="bt-4" key={index}>
              <label>
                Ingrediente {index + 1}:
                <select
                  className="outline-black"
                  name={`select-${index}`}
                  onChange={(e) =>
                    handleIngredientChange(
                      index,
                      e.target.value,
                      "id_ingrediente"
                    )
                  }
                >
                  <br />
                  <option className="mt-4" value="">
                    Seleccionar Ingrediente
                  </option>
                  {datos.ingrediente.map((ingrediente) => (
                    <option
                      key={ingrediente.id_ingrediente}
                      value={ingrediente.id_ingrediente}
                    >
                      {ingrediente.nombre}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <label className="mb-4">
                Cantidad:
                <input
                  className="shadow appearance-none border rounded ml-2"
                  type="number"
                  name={`cantidad-${index}`} // Nombre único para cada input
                  min={1}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value, "cantidad")
                  }
                  placeholder="Cantidad"
                />
                <br />
              </label>
            </div>
          ))}
        </div>
        <br />
        <select
          name="tipo"
          onChange={(e) => {
            setDatos({
              ...datos,
              [e.target.name]: e.target.value,
            });
          }}
        >
          <br />
          <option value="">Seleccionar tipo</option>
          {comidaN.tipo.map((item) => (
            <>
              <br />
              <option
                className="pt-4"
                key={item.id_tipos}
                value={item.id_tipos}
              >
                {item.nombre}
              </option>
              <br />
            </>
          ))}
          <br />
        </select>
        <br />
        <label
          className="block text-gray-700 text-sm font-bold mb-2 mt-4"
        >
          Imagen del Producto:
        </label>
        <input
          type="file"
          accept="img/*"
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <br />

        {file && (
          <img
            className="w-96 object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            alt=""
          />
        )}
        <br />
        <button
          onClick={handleSubmit}
          className="bg-[#25a18ee6] hover:bg-[#3AAA91] text-white font-bold py-2 px-4 rounded"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
}

export default AlimentoForm;
