// js/auth.js
import { supabase } from './supabase.js';

const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');

registerBtn.addEventListener('click', async () => {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
    emailRedirectTo: 'http://localhost:5500/huella_C02/calculadora.html'  // O el archivo que tú quieras mostrar luego del registro
  }
  });

  if (error) {
    alert('Error al registrar: ' + error.message);
  } else {
    alert('Registro exitoso. Revisa tu correo para confirmar.');
  }
});

loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert('Error al iniciar sesión: ' + error.message);
  } else {
    alert('Inicio de sesión exitoso');
    window.location.href = '/huella_C02/calculadora.html';
  }
});
