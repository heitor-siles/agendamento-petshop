export function inputClick() {
  const inputs = document.querySelectorAll(".input");

  document.addEventListener("click", (event) => {
    const inputTarget = event.target.closest(".input");

    if (inputTarget) {
      inputs.forEach((field) => field.classList.remove("input-active"));

      inputTarget.classList.add("input-active");
    } else {
      inputs.forEach((field) => field.classList.remove("input-active"));
    }
  });
}
