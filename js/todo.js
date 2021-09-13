const TODO_INPUT = document.querySelector(".input");
const TODO_LIST = document.querySelector(".todo-list");

// const CHECK_BOXES = document.querySelectorAll(".checkbox");

// CHECK_BOXES.forEach((box) => {
//     box.addEventListener("click", () => {
//         box.classList.toggle("toggleCheck");
//     });
// });

const createTodo = () => {
    if (TODO_INPUT.value == "") {
        return;
    }

    const TODO_ITEM = document.createElement("div");
    const CHECKBOX = document.createElement("span");
    const TODO_TEXT = document.createElement("p");
    const TODO_CLOSE = document.createElement("span");

    TODO_ITEM.classList.add("todo-item");
    CHECKBOX.classList.add("checkbox");
    TODO_TEXT.classList.add("todoText");
    TODO_CLOSE.classList.add("close");

    TODO_TEXT.innerText = TODO_INPUT.value;

    TODO_ITEM.append(CHECKBOX);
    TODO_ITEM.append(TODO_TEXT);
    TODO_ITEM.append(TODO_CLOSE);
    TODO_LIST.append(TODO_ITEM);

    TODO_INPUT.value = "";

    CHECKBOX.addEventListener("click", () => {
        CHECKBOX.classList.toggle("toggleCheck");
        TODO_TEXT.classList.toggle("completed");
    });

    TODO_CLOSE.addEventListener("click", () => {
        TODO_ITEM.remove();
    });
};

TODO_INPUT.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        TODO_LIST.classList.add("active");
        createTodo();
    }
});
