import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new.js";
import { searchByDate } from "../schedules/load.js";
import { scheduleDays } from "../schedules/load.js";
import { inputClick } from "./input-click.js";

const dateSearch = document.getElementById("date-search");

const openFormButton = document.getElementById("open-form-button");

const displayForm = document.querySelector(".blur-container");
const form = document.querySelector("form");

const tutorNameInput = document.getElementById("tutor-name");
const petNameInput = document.getElementById("pet-name");
const phoneInput = document.getElementById("phone");
const descriptionInput = document.getElementById("description");
const scheduleDateInput = document.getElementById("date");
const hoursInput = document.getElementById("time");

const cancelButton = document.getElementById("cancel-button");

//Define a data atual

const currentDate = dayjs(new Date()).format("YYYY-MM-DD");

//Carrega a data atual no input de busca por data

dateSearch.value = currentDate;
scheduleDateInput.value = currentDate;

//Define a data mínima como sendo a data autal
scheduleDateInput.min = currentDate;

openFormButton.onclick = (event) => {
  displayForm.classList.add("active");
};

//Estilização do input selecionado
inputClick();

cancelButton.onclick = (event) => {
  displayForm.classList.remove("active");
};

form.onsubmit = async (event) => {
  //Previne o comportamento padrão de recarregamento da página
  event.preventDefault();

  try {
    //Recuperando os dados do agendamento
    const tutorName = tutorNameInput.value.trim();
    const petName = petNameInput.value.trim();
    const phone = phoneInput.value;
    const description = descriptionInput.value;
    const scheduleDate = scheduleDateInput.value;
    const hours = hoursInput.value;

    //Recupera a hora selecionada
    const [hour] = hours.split(":");

    //Insere a data na hora
    const when = dayjs(scheduleDate).add(hour, "hour");

    //Gera um ID
    const customID = new Date().getTime();

    if (
      !tutorName ||
      !petName ||
      !phone ||
      !description ||
      !scheduleDate ||
      !hours
    ) {
      return alert(
        "Dados ausentes. Por favor verifique e preencha corretamente.",
      );
    }

    await scheduleNew({
      customID,
      tutorName,
      petName,
      phone,
      description,
      when,
    });
    displayForm.classList.remove("active");

    //Recarrega a agenda
    searchByDate();
    scheduleDays();

    //Limpa os campos
    tutorNameInput.value = "";
    petNameInput.value = "";
    phoneInput.value = "";
    descriptionInput.value = "";

    return alert("Agendamento realizado com sucesso!");
  } catch (error) {
    alert(
      "Não foi possível realizar o agentamento. Tente novamente mais tarde.",
    );
    console.log(error);
  }
};
