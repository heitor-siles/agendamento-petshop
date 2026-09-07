import { apiConfig } from "./api-config.js";

export async function scheduleNew({
  customID,
  tutorName,
  petName,
  phone,
  description,
  when,
}) {
  try {
    //Faz a requisição para enviar os daodos do agendamento
    await fetch(`${apiConfig.baseUrl}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customID,
        tutorName,
        petName,
        phone,
        description,
        when,
      }),
    });

    //Exibe mensagem de agendamento realizado
    alert("Agendamento realizado com sucesso!");
  } catch (error) {
    console.log(error);
    alert("Não foi possível agendar. Tente novamente mais tarde.");
  }
}
