// script.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (e) {
      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const nascimento = document.getElementById("nascimento").value;
      const foto = document.getElementById("foto").value;
  
      if (!nome || !email || !nascimento) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        e.preventDefault(); // Impede envio do formulário
      } else if (!foto) {
        const confirma = confirm("Você não enviou uma foto. Deseja continuar?");
        if (!confirma) e.preventDefault();
      }
    });
  });
  