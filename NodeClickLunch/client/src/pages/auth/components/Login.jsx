import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { esCorreoElectronico, esContrasenaValida } from '../../../other/validation.js';
import axios from 'axios';
import { ReCAPTCHA } from 'react-google-recaptcha';

const Login = () => {
  const [credentials, setCreadentials] = useState({
    email:'',
    password:''
  });
  const [captcha, setCaptcha] = useState();
  const [error, setError] = useState('');
  const navigation = useNavigate();

  const handleChange = (e) => {
    setCreadentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!credentials.email || !credentials.password){
      return alert('Todos los campos son obligatorios');
    }
    if(!esCorreoElectronico(credentials.email)){
      return alert('El correo electronico es invalido');
    }
    if(!esContrasenaValida(credentials.password)){
      return alert('La contraseña es invalida');
    }
    if(captcha || true ){
      try {
        axios({
          method:'post',
          url:'http://localhost:3002/usuario/login',
          data: {credentials}
        }).then((res)=>{
          if(res.status === 200){
            navigation('/User');
          }else{
            return alert(res.message);
          }
        });
      } catch (error) {
       return alert(error);
      }
    } else {
      return alert('Ingresa el captcha');
    }
  } 

  return (
    <div className='Login'>
      <div className='IDK'>
        <span className='inciar-sesion'>
          Iniciar sesión
        </span>
        <img
          className='img'
          src='https://i.ibb.co/g9czN3L/logo.png'
          alt='Logo'
        />
        <form className='form' onSubmit={handleSubmit}>
          {error && (
            <div className='error'>{error}</div>
          )}
          <div className='email'>
            <input
              type='email'
              name='email'
              className='input-email'
              placeholder='correoprueba@xxxxx.xxx'
              required
              onChange={handleChange}
            />
          </div>
          <div className='password'>
            <input
              type='password'
              name='password'
              className='input-password'
              placeholder='Contraseña123.'
              required
              onChange={handleChange}
            />
          </div>
          <button className='button-submit'>
            <div className='submit'>
              Iniciar sesión
            </div>
          </button>
        </form>
        <NavLink to='/Auth/Register' className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
          <p className='register'>
            ¿No tienes cuenta? Registrate
          </p>
        </NavLink>
        <div className=''>
          <p>ó</p>
        </div>
        
        <button 
          onClick={() => {
            if(captcha){

            }else{
              alert('Ingrese el captcha');
            }
          }}
          className='google-button'
        >
          <div className='google-container'>
            <img 
              className='google-img'
              src='https://i.ibb.co/xJRLWfJ/gugulnobg-removebg-preview.png'
              alt='google-logo, idk'
            />
            Iniciar sesión con Google
          </div>
        </button>
        <ReCAPTCHA 
          sitekey='6LdfsbEpAAAAAIjUfDtKWVnjqnUlqBwg_ArAb5nz'
          onChange={setCaptcha}
        />
      </div>
    </div>

  )
}

export default Login