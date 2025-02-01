export function theme() {
  applyTheme();
  const themeSwitchers = document.querySelectorAll(".theme-switcher");

  if (themeSwitchers) {
    themeSwitchers.forEach((switcher) => {
      switcher.addEventListener("click", () => {
        const activeTheme = localStorage.getItem("theme");
        localStorage.setItem(
          "theme",
          activeTheme === "dark" ? "light" : "dark"
        );
        applyTheme();
      });
    });
  }

  function applyTheme() {
    const body = document.body;
    const activeTheme = localStorage.getItem("theme");
    const moon = document.querySelector(".icon_moon");
    const sun = document.querySelector(".icon_sun");

    if (activeTheme === "dark") {
      body.classList.add("dark");
      moon.classList.add("none");
      sun.classList.remove("none");
    } else {
      body.classList.remove("dark");
      moon.classList.remove("none");
      sun.classList.add("none");
    }
  }
}
