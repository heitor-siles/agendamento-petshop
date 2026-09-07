import dayjs from "dayjs";

//Seleciona as sessões (manhã tarde e noite)

const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodEvening = document.getElementById("period-evening");

export function schedulesShow({ dailySchedules }) {
  try {
    //Limpa as listas
    periodMorning.innerHTML = "";
    periodAfternoon.innerHTML = "";
    periodEvening.innerHTML = "";

    //Renderiza os agendamentos por período
    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li");
      item.classList.add("schedule");

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("info");

      const time = document.createElement("strong");
      time.classList.add("hour");

      const petName = document.createElement("span");
      petName.classList.add("pet-name");

      const tutorName = document.createElement("span");
      tutorName.classList.add("tutor-name");

      const service = document.createElement("span");
      service.classList.add("service");

      const removeButton = document.createElement("span");
      removeButton.classList.add("remove");

      //Adiciona o ID do agendamento
      item.setAttribute("data-id", schedule.id);

      time.textContent = dayjs(schedule.when).format("HH:mm");
      petName.textContent = schedule.petName;
      tutorName.textContent = `/ ${schedule.tutorName}`;
      service.textContent = schedule.description;
      removeButton.textContent = "Remover agendamento";

      //Adiciona os dados no item
      item.append(infoDiv, removeButton);
      infoDiv.append(time, petName, tutorName, service);

      //Obtém somente a hora
      const hour = dayjs(schedule.when).hour();

      //Renderiza o agendamento na sessão (manhã, tarde ou noite)
      if (hour <= 12) {
        periodMorning.appendChild(item);
      } else if (hour > 12 && hour <= 18) {
        periodAfternoon.appendChild(item);
      } else {
        periodEvening.appendChild(item);
      }
    });
  } catch (error) {
    alert("Não foi possível exibir os agendamentos.");
    console.log(error);
  }
}
