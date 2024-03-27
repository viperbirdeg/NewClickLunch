const app = require('./app.js');

const PORT = process.env.PORT || 3001;

//manejar las peticiones get
app.get("/api", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//Escucha de el servidor establecido en 3001
app.listen(PORT, () => {
    console.log(`Server listening on port:${PORT}...`);
});

