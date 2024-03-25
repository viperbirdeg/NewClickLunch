const client = require('./db.js');

const obtenerDatos = async () => {
    try {
        await client.connect();
        const res = await client.query(`SELECT * FROM "Personas" INNER JOIN "Numero_telefono" ON "Personas".num_tel_id = "Numero_telefono".num_tel_id`);
        return res.rows;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error;
    } finally {
        await client.end();
    }

}

debugger;
obtenerDatos().then((result) => {
    console.log(result != null ? result : "No hay datos");
}).catch(error => {
    console.error("Error en la operación:", error);
});