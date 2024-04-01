const e = require('express');
const { pool } = require('../../db.js');
const bcrypt = require('bcrypt');

//Usado para mandar registros
const register = async (req, res) => {

  //Conexion con la bd
  const client = await pool.connect();

  //Intentar insercion
  try {
    //Iniciar operacion 
    await client.query('BEGIN');

    //obtener data
    const data = await req.body;
    /*
    Formato data
    data = {
      email : "",
      name : "",
      password : ""
    }
    */
    const email = data.email;
    const username = data.name;
    const hashedPassword = await bcrypt.hash(data.password, 12);

    //Valida que no este registrado
    const validacionResult = await client.query(
      `SELECT * FROM clicklunch."UsuariosInfo" WHERE email = $1`,
      [email]
    );
    if (validacionResult.rowCount > 0) {
      return res.status(409).json({
        message: 'Usuarios ya registrado',
      });
    }

    //Inserciones
    const passwordResult = await client.query(
      `INSERT INTO clicklunch."Token"(token) VALUES ($1) RETURNING id`,
      [hashedPassword]
    );
    const idPassword = passwordResult.rows[0].id;
    const rolResult = await client.query(
      `INSERT INTO clicklunch."Rol"(rol) VALUES ($1) RETURNING id`,
      [0]
    );
    const idRol = rolResult.rows[0].id;
    const userResult = await client.query(
      `INSERT INTO clicklunch."Usuarios"(username, email, idrol, idtoken) VALUES ($1,$2,$3,$4) RETURNING id`,
      [username, email, idRol, idPassword]
    );

    //Terminar y confirmar operacion  
    await client.query('COMMIT');

    //Devolver datos
    if (userResult.rowCount > 0) {
      const response = await datosUsuario(userResult.rows[0].id);
      return res.status(response.estado).json(response.message);
    }
    res.status(404).json({
      error: `Hubo problemas encontrando el usuario`,
    });

  } catch (error) {
    //Manejar errores cancelando operacion
    await client.query('ROLLBACK');
    return res.status(500).json({
      message: 'Hubo problema registrando al usuario',
    });

  } finally {
    //Liberar la bd
    client.release();
  }
};

//Usado para inicios de sesion
const login = async (req, res) => {
  //Conexion con la bd
  const client = await pool.connect();

  //Intentar proceso
  try {
    //Obtener data
    const data = await req.body;
    /*
    data = {
      email = "";
      name = "";
      password = "";
    }
    */
    const email = data.email;

    //Validar existencia
    const validacionResult = await client.query(
      `SELECT * FROM clicklunch."UsuariosInfo" WHERE email = $1`,
      [email]
    );
    if (validacionResult.rowCount == 0) {
      return res.status(404).json({
        message: 'Usuarios no registrado',
      });
    }

    //Validar igualdad
    const datos = validacionResult.rows[0];
    if (await bcrypt.compare(data.password, datos.token)) {
      //Generar la sesion
      req.session.name = datos.username;
      req.session.email = datos.email;
      req.session.saldo = datos.saldo;
      req.session.token = datos.token;
      req.session.rol = datos.rol;
      return res.status(200).json({
        message: 'Ingreso correcto',
      });
    }
    return res.status(401).json('Contraseña incorrecta');

  } catch (error) {
    //Manejar errores
    return res.status(500).json({
      message: 'Ocurrio un error inesperado en login',
      error: error
    });

  } finally {
    //Liberar la bd
    client.release();
  }
};

//Usado para eliminar sesion
const logout = (req, res) => {

  req.session.destroy(() => {
    return res.status(200).json({ message: 'Sesion finalizada de manera correcta' });
  });

};

const update = async (req, res) => {

  //Conexion con la bd
  const client = await pool.connect();

  //Intentar insercion
  try {
    //Iniciar operacion 
    await client.query('BEGIN');

    //obtener data
    const data = await req.body;
    /*
    Formato data
    data = {
      email : "",
      name : "",
      password : ""
    }
    */
    const email = data.email;
    const username = data.name;
    const newToken = await bcrypt.hash(data.password, 12);

    //Cambio de contraseña    
    const id = await client.query(
      `SELECT (idtoken) FROM clicklunch."Usuarios" WHERE email = $1`,
      [email]
    );
    
    const validacionResult = await client.query(
      `UPDATE clicklunch."Token" set token = $1 WHERE id = $2`,
      [newToken, (id.rows[0].idtoken)]
    );

    //Terminar y confirmar operacion  
    await client.query('COMMIT');

    return res.status(200).json({ message: 'Cambio realizado de manera correcta' });

  } catch (error) {
    //Manejar errores cancelando operacion
    await client.query('ROLLBACK');
    return res.status(500).json({
      message: 'Hubo problema registrando al usuario',
    });
  } finally {
    //Liberar la bd
    client.release();
  }
};

//Usado para obtener todos los usuarios
const usersData = async (req, res) => {
  //Conexion con la bd
  const client = await pool.connect();

  //Intentar busqueda
  try {

    //Busqueda en db
    const vistaResult = await client.query(`SELECT * FROM clicklunch."UsuariosInfo"`);

    //Retorno de datos
    return res.status(200).json({ message: vistaResult });

  } catch (error) {
    //Manejo de errores
    return res.status(500).json('Ocurrio un error inesperado en el servidor');

  } finally {
    //Liberar la bd 
    client.release();
  }

};

//Usado para obtener un usuario a partir de un identificador
const userData = async (req, res) => {
  //Obtener identificador
  const id = req.body.id;

  //Buscar sus datos
  const userDatos = await datosUsuario(id);

  //Retornar datos
  return res.status(userDatos.estado).json({
    message: userDatos.message,
  });
};

//Funcion interna de obtencion de usuarios
const datosUsuario = async id => {
  //Conexion con la bd
  const client = await pool.connect();

  //Intentar busqueda
  try {

    //Busqueda en db
    const vistaResult = await client.query(
      `SELECT * FROM clicklunch."UsuariosInfo" WHERE "id" = ($1)`,
      [id]
    );
    if (vistaResult.rowCount > 0) {
      //Retorno de datos
      const userDatos = vistaResult.rows[0];
      return {
        estado: 200,
        message: userDatos,
      };
    }
    //Retorno error
    return {
      estado: 404,
      message: `No se ha encontrado`,
    };

  } catch (error) {
    //Manejo de errores
    return {
      estado: 500,
      message: 'Ocurrio un error inesperado en el servidor',
    };

  } finally {
    //Liberar la bd 
    client.release();
  }
};

//Exportaciones
module.exports = { register, login, update, userData, usersData, logout };
