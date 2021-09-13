const THEME_TOGGLE = document.querySelector("#theme-toggle");

const toggleTheme = () => {
    const BODY = document.body;
    const MOON = document.querySelector(".moon");
    const SUN = document.querySelector(".sun");

    BODY.classList.toggle("dark-mode");
    SUN.classList.toggle("display");
    MOON.classList.toggle("hide");
};

THEME_TOGGLE.addEventListener("click", () => {
    toggleTheme();
});
