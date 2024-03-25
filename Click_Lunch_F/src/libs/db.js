const { Client } = require('pg');

const obtenerDatos = async () => {
    const client = new Client({
        user: "fl0user",
        host: "ep-proud-band-a5lbhg0g.us-east-2.aws.neon.fl0.io",
        database: "enfermeras-kawaii-db",
        password: zGE9Ii3PnhwR,
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect().then(() => {
        client.query(`SELECT * FROM "Personas" INNER JOIN "Numero_telefono" ON "Personas".num_tel_id = "Numero_telefono".num_tel_id`).then(res => {
            
            const result = res.rows;
            return result;

        });
    });
};


obtenerDatos().then((result) => {
    console.log("no hay datos");
});