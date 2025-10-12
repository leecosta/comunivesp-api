const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function verificarDominioUnivesp(email) {
  const dominio = email.split("@")[1];
  return dominio === "univesp.br" || dominio === "aluno.univesp.br";
}

function validarFormatoEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

async function enviarEmail(email, token) {
  const link = `${process.env.BASE_URL}/auth/verificar-email?token=${token}`;

  const msg = {
    to: email,
    from: {
      name: "Comunivesp",
      email: process.env.EMAIL_USER,
    },
    subject: "Verificação de Conta",
    html: `
      <h2>Confirme seu e-mail</h2>
      <p>Clique no link abaixo para verificar seu e-mail:</p>
      <a href="${link}">${link}</a>`,
  };

  try {
    console.log("Tentando enviar e-mail via API HTTP do SendGrid...");
    await sgMail.send(msg);
    console.log("E-mail enviado com sucesso via SendGrid API!");
  } catch (error) {
    console.error("Erro CRÍTICO ao enviar e-mail via SendGrid API:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw new Error("O serviço de e-mail falhou.");
  }
}

module.exports = { enviarEmail, validarFormatoEmail, verificarDominioUnivesp };
