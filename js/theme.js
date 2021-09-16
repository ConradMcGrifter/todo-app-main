const THEME_TOGGLE = document.querySelector("#theme-toggle");
let darkMode = localStorage.getItem("darkMode");

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
    } else if (!BODY.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", null);
    }
};

if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
}

THEME_TOGGLE.addEventListener("click", () => {
    toggleTheme();
});
