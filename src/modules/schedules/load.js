import { hoursLoad } from "../form/hours-load.js";
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { schedulesShow } from "./show.js";

const scheduleDate = document.getElementById("date");

const dateSearch = document.getElementById("date-search");

export async function scheduleDays() {
  //Obtém a data do input
  const date = scheduleDate.value;

  //Busca na API os agendamentos
  const dailySchedules = await scheduleFetchByDay({ date });

  //Exibe os agendamentos
  schedulesShow({ dailySchedules });

  //Rederiza as horas disponíveis
  hoursLoad({ date, dailySchedules });
}

export async function searchByDate() {
  //Obtém a data do input
  const date = dateSearch.value;

  //Busca na API os agendamentos
  const dailySchedules = await scheduleFetchByDay({ date });

  //Exibe os agendamentos
  schedulesShow({ dailySchedules });
}
