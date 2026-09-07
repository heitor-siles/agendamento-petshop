import { scheduleDays } from "../schedules/load.js";
import { searchByDate } from "../schedules/load.js";

//Seleciona o input de data
const scheduleDate = document.getElementById("date");

//Seleciona o input de busca por data
const dateSearch = document.getElementById("date-search");

//Recarrega a lista de horários quando o input de data mudar
scheduleDate.onchange = () => scheduleDays();
dateSearch.onchange = () => searchByDate();
