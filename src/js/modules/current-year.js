export function currentYear() {
  document
    .querySelectorAll(".year")
    .forEach((element) => (element.textContent = new Date().getFullYear()));
}
