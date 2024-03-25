import React from 'react'

const DatosIngrediente = () => {
  return (
    <form onSubmit={handleSubmit}>  
        <div className="absolute w-[219px] top-[211px] left-[523px] font-poppins font-normal text-[#09090999] text-[16px] leading-[24px] tracking-[0.15px]">Nombre</div>
        <div className="absolute w-[219px] top-[341px] left-[523px] font-poppins font-normal text-[#09090999] text-[16px] leading-[24px] tracking-[0.15px]">Cantidad</div>
        <div className="absolute w-[219px] top-[471px] left-[523px] font-poppins font-normal text-[#09090999] text-[16px] leading-[24px] tracking-[0.15px]">Unidad</div>


        <div className="absolute w-[450px] h-[48px] top-[242px] left-[495px] bg-white border border-[#797979]">
          <input name="nombre" placeholder="Nombre" className="absolute w-[438px] h-[35px] top-[5px] left-[5px] font-nunito font-normal text-black bg-[white] text-[24px] leading-normal tracking-normal border-none outline-none" onChange={handleCahnge}/>
        </div>

          <div className="absolute w-[450px] h-[48px] top-[373px] left-[495px] bg-white border border-[#797979]">
            <input type="number" placeholder="1" name="cantidad" min={1} className="absolute w-[438px] h-[35px] top-[4px] left-[5px] font-nunito font-normal bg-[white] text-black text-[24px] leading-normal tracking-normal border-none outline-none" onChange={handleCahnge}/>
          </div>

          <div className="absolute w-[450px] h-[48px] top-[504px] left-[495px] bg-white border border-[#797979]">
            <input type="text" placeholder="1" name="unidad" className="absolute w-[438px] h-[35px] top-[4px] left-[5px] font-nunito font-normal bg-[white] text-black text-[24px] leading-normal tracking-normal border-none outline-none" onChange={handleCahnge}/>
          </div>

          <button type="submit" className="absolute w-[450px] h-[77px] top-[670px] left-[495px] bg-[#25a18ee6] rounded-full border-none cursor-pointer">
          <div className="absolute w-[338px] h-[20px] top-[28px] left-[56px] font-poppins font-bold text-white text-[24px] text-center leading-[20px]">Crear ingrediente</div>
        </button>
    </form>
  )
}

export default DatosIngrediente
