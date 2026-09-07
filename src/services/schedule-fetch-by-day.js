import dayjs from "dayjs";
import { apiConfig } from "./api-config.js";

export async function scheduleFetchByDay({ date }) {
  try {
    //Faz a requisição de pesquisa dos agendamentos
    const response = await fetch(`${apiConfig.baseUrl}/schedules?_sort=when`);

    //Converte para JSON
    const data = await response.json();

    //Filtra os agendamentos pelo dia selecionado
    const dailySchedules = data.filter((schedule) =>
      dayjs(date).isSame(schedule.when, "day"),
    );

    return dailySchedules;
  } catch (error) {
    console.log(error);
    alert(
      "Não foi possível consultar os agendamentos. Tente novamnete mais tarde.",
    );
  }
}
