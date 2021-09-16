const THEME_TOGGLE = document.querySelector("#theme-toggle");
let darkMode = localStorage.getItem("darkMode");

if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
}

const toggleTheme = () => {
    const BODY = document.body;
    const MOON = document.querySelector(".moon");
    const SUN = document.querySelector(".sun");

    BODY.classList.toggle("dark-mode");
    SUN.classList.toggle("display");
    MOON.classList.toggle("hide");

    darkMode = localStorage.getItem("darkMode");

    if (BODY.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", null);
    }
};

THEME_TOGGLE.addEventListener("click", () => {
    toggleTheme();
});
