import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";

export const hours = document.getElementById("time");

export function hoursLoad({ date, dailySchedules }) {
  //Limpa a lista de horários
  hours.innerHTML = "";

  //Obtém a lista de todos os horário ocupados
  const unavailableHours = dailySchedules.map((schedule) =>
    dayjs(schedule.when).format("HH:mm"),
  );

  const opening = openingHours.map((hour) => {
    //Recupera somente a hora
    const [scheduleHour] = hour.split(":");

    //Adiciona a hora na data e verifica se está no passado
    const isHourFuture = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs());

    const available = !unavailableHours.includes(hour) && isHourFuture;

    return {
      hour,
      available,
    };
  });

  //Renderiza os horários
  opening.forEach(({ hour, available }) => {
    const option = document.createElement("option");

    option.classList.add("hour-option");
    option.classList.add(available ? "hour-available" : "hour-unavailable");
    if (!available) {
      option.setAttribute("disabled", "true");
    }
    option.textContent = hour;

    hours.append(option);
  });
}
