import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Cambiado a useNavigate
import './styles/Register.css';

const Register = () => {
  const [correo_electronico, setEmail] = useState("");
  const [contraseña, setcontraseña] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("")
  const navigate = useNavigate(); // Cambiado a useNavigate

  const handleRegister = (e) => {
    e.preventDefault(); // Evitar el envío del formulario por defecto

    // Validar los campos antes de redirigir o enviar datos a la API
    if (!correo_electronico || !contraseña || !nombre || !apellido) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    console.log( JSON.stringify({ correo_electronico, contraseña,nombre,apellido }))
    //Aquí puedes agregar lógica para enviar datos a la API o realizar el registro de usuario
    // Ejemplo: enviar datos a la API
    fetch('http://localhost:8080/api/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo_electronico, contraseña,nombre,apellido }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Registro exitoso:', data);
        history.push("/"); // Redirigir a la página principal después del registro exitoso
      })
      .catch(error => {
        console.error('Error al registrar:', error);
        alert('Se ha agregado excitosamente.');
      });

    // Simulación de redirección después del registro exitoso
  };      
  
  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
        <label>Nombre</label>
          <div className="input-box">
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
       
          </div>

          <label>Apellido</label>
          <div className="input-box">
            <input
              type="text"
              required
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />

          </div>
          <label>Email</label>
          <div className="input-box">
            <input
              type="email"
              required
              value={correo_electronico}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <label>Contraseña</label>
          <div className="input-box">
            <input
              type="password"
              required
              value={contraseña}
              onChange={(e) => setcontraseña(e.target.value)}
            />

          </div>

          <button type="submit" className="btn">
            Register
          </button>
          <div className="login-register">
            <p>
              Already have an account?{" "}
              <a href="#" className="register-link" onClick={() => navigate("/login")}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
