const TODO_INPUT = document.querySelector(".input");
const TODO_LIST = document.querySelector(".todo-list");

// const CHECK_BOXES = document.querySelectorAll(".checkbox");

// CHECK_BOXES.forEach((box) => {
//     box.addEventListener("click", () => {
//         box.classList.toggle("toggleCheck");
//     });
// });

const createTodo = () => {
    const TODO_ITEM = document.createElement("div");
    const CHECKBOX = document.createElement("span");
    const TODO_TEXT = document.createElement("p");

    TODO_ITEM.classList.add("todo-item");
    CHECKBOX.classList.add("checkbox");
    TODO_TEXT.classList.add("todoText");
    TODO_TEXT.innerText = TODO_INPUT.value;

    TODO_ITEM.append(CHECKBOX);
    TODO_ITEM.append(TODO_TEXT);
    TODO_LIST.append(TODO_ITEM);

    TODO_INPUT.value = "";

    CHECKBOX.addEventListener("click", () => {
        CHECKBOX.classList.toggle("toggleCheck");
    });
};

TODO_INPUT.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        createTodo();
    }
});
