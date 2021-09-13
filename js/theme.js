const BODY = document.body;
const TEST_BTN = document.querySelector(".gaah");

const myTestFunc = () => {
    BODY.classList.toggle("dark-mode");
};

TEST_BTN.addEventListener("click", () => {
    myTestFunc();
    console.log("test");
});
