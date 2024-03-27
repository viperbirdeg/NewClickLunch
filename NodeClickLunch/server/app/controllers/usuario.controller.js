const { pool } = require('../../db.js');
const bcrypt = require('bcrypt');
const axios = require('axios');

const register = async (req, res) => {

    const client = await pool.connect();
    try {

        await client.query('BEGIN');
        const data = await req.body;
        /*
        data = {
            email = "";
            name = "";
            password = "";
        }
        */
        const email = data.email;
        const username = data.name;

        const validacionResult = await client.query(`SELECT * FROM clicklunch."Usuarios" WHERE email = $1`, [email]);
        if (validacionResult.rowCount > 0) {
            return res.status(409).json({ message: "Usuarios ya registrado" });
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        const passwordResult = await client.query(`INSERT INTO clicklunch."Token"(token) VALUES ($1) RETURNING id`, [hashedPassword]);
        const idPassword = passwordResult.rows[0].id;

        const rolResult = await client.query(`INSERT INTO clicklunch."Rol"(rol) VALUES ($1) RETURNING id`, [0]);
        const idRol = rolResult.rows[0].id;

        const userResult = await client.query(`INSERT INTO clicklunch."Usuarios"(username, email, idrol, idtoken) VALUES ($1,$2,$3,$4) RETURNING id`, [username, email, idRol, idPassword]);

        await client.query('COMMIT');
        if (userResult.rowCount > 0) {

            const userDatos = userResult.rows[0].id;

            const response = await datosUsuario(userDatos);

            return res.status(200).json(response);

        } res.status(500).json({ error: `Ocurrio un error inesperado en register ${userResult.rows[0].id},,,,,, ${userResult.rowCount}` });

    } catch (error) {

        await client.query('ROLLBACK');
        return res.status(500).json({ message: "Ocurrio un error inesperado en register" });

    } finally {

        client.release();

    }
}

const login = (req, res) => {

}

const logout = (req, res) => {

}

const update = (req, res) => {

}

const usersData = (req, res) => {

}

const userData = async (req, res) => {

    const client = await pool.connect();
    const id = req.body.id;

    console.log('id');

    try {
        const vistaResult = await client.query(`SELECT * FROM clicklunch."UsuariosInfo" WHERE id = ($1)`, [id]);

        if (vistaResult.rowCount > 0) {
            const userDatos = userResult.rows[0];
            return res.status(200).json(userDatos);
        } res.status(500).json({ error: `Ocurrio un error inesperado en userData ${vistaResult}` });

    } catch (error) {
        return res.status(500).json({ message: "Ocurrio un error inesperado en userData" });
    } finally {
        client.release();
    }
}

const datosUsuario = async (id) => {
    const client = await pool.connect();

    try {
        const vistaResult = await client.query(`SELECT * FROM clicklunch."UsuariosInfo" WHERE "id" = ($1)`, [id]);

        if (vistaResult.rowCount > 0) {

            const userDatos = vistaResult.rows[0];
            return userDatos;

        } return ({ error: `Ocurrio un error inesperado en userData` });

    } catch (error) {
        return ({ message: "Ocurrio un error inesperado en userData" });
    } finally {
        client.release();
    }

}

module.exports = { register, login, update, userData, usersData, logout };