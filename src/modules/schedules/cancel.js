import { searchByDate, scheduleDays } from "./load.js";
import { scheduleCancel } from "../../services/schedule-cancel.js";

const periods = document.querySelectorAll(".schedule-list");

//Gerar evento de click para cada lista (manhã, tarde e noite)
periods.forEach((period) => {
  //Captura o evento de clique na lista
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("remove")) {
      //Obtém a li pai do elemento clicado
      const item = event.target.closest("li");
      const { id } = item.dataset;

      //Verifica o id para remover
      if (id) {
        //Confirma se o usuário quer cancelar
        const isConfirm = confirm(
          "Tem certeza que deseja cancelar o agendamento?",
        );

        if (isConfirm) {
          //Faz a requisição na API para cancelar
          await scheduleCancel({ id });

          //Recarrega a agenda e os horários disponíveis
          searchByDate();
          scheduleDays();
        }
      }
    }
  });
});
