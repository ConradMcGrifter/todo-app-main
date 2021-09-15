const TODO_INPUT = document.querySelector(".input");
const TODO_LIST = document.querySelector(".todo-list");
const TODO_CONTAINER = document.querySelector(".todo--container");

const CLEAR_COMPLETED = document.querySelector(".clear");

const tasksLeft = () => {
    const ITEMS_LEFT_COUNTER = document.querySelector(".itemsLeft");

    let itemsArray = Array.from(TODO_LIST.querySelectorAll(".todoText")); //grab all the items currently in the Todo List
    let unfinishedItemsArray = [];

    //if the item doesnt contain the class "completed" --> push it into the unfinishedItemsArray
    itemsArray.forEach((item) => {
        if (!item.classList.contains("completed")) {
            unfinishedItemsArray.push(item);
        }
    });

    //set inner text of the counter element based on the length of the unfinishedItemsArray
    ITEMS_LEFT_COUNTER.innerText = `${unfinishedItemsArray.length} items left`;
};

const createTodo = () => {
    if (TODO_INPUT.value == "") {
        return;
    }

    // create elements to be added to the DOM
    const TODO_ITEM = document.createElement("div");
    const CHECKBOX = document.createElement("span");
    const TODO_TEXT = document.createElement("p");
    const TODO_CLOSE = document.createElement("span");

    // add classes and set inner text
    TODO_ITEM.classList.add("todo-item");
    CHECKBOX.classList.add("checkbox");
    TODO_TEXT.classList.add("todoText");
    TODO_CLOSE.classList.add("close");
    TODO_TEXT.innerText = TODO_INPUT.value;

    // append elements
    TODO_ITEM.append(CHECKBOX);
    TODO_ITEM.append(TODO_TEXT);
    TODO_ITEM.append(TODO_CLOSE);
    TODO_LIST.append(TODO_ITEM);

    TODO_INPUT.value = ""; // reset input field to blank after user creates to-do item

    // 🔔 event listener for the circle checkbox
    CHECKBOX.addEventListener("click", () => {
        CHECKBOX.classList.toggle("toggleCheck");
        TODO_TEXT.classList.toggle("completed");

        tasksLeft();
    });

    // 🔔 event listener for the "X" close button
    TODO_CLOSE.addEventListener("click", () => {
        TODO_ITEM.remove();

        const ITEM_ARRAY = Array.from(document.querySelectorAll(".todo-item"));

        //if there are no items left, remove the active class and hide the todo container
        if (ITEM_ARRAY.length == 0) {
            TODO_CONTAINER.classList.remove("active");
        }

        tasksLeft();
    });

    tasksLeft();
}; // createTodo() function end

// -----------------------------------🔔 🔔 EVENT LISTENERS🔔 🔔-----------------------------------

// 🔻 Clears all finished tasks when the "clear completed" element is clicked
CLEAR_COMPLETED.addEventListener("click", () => {
    const TEXT_ARRAY = Array.from(document.querySelectorAll(".todoText"));

    TEXT_ARRAY.forEach((item) => {
        if (item.classList.contains("completed")) {
            item.parentElement.remove();
        }
    });

    const ITEM_ARRAY = Array.from(document.querySelectorAll(".todo-item"));

    if (ITEM_ARRAY.length == 0) {
        TODO_CONTAINER.classList.remove("active");
    }
});

// 🔻 adds todo item when the enter key is pressed
TODO_INPUT.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        TODO_CONTAINER.classList.add("active");

        createTodo();
    }
});
