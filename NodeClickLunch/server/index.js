const { app } = require('./app.js');

//Puerto por default o 3001
const PORT = process.env.PORT || 3001;

//Escucha de el servidor establecido en 3001
app.listen(PORT, () => {
    console.log(`Server listening on port:${PORT}...`);
});

