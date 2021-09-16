const TODO_INPUT = document.querySelector(".input");
const TODO_LIST = document.querySelector(".todo-list");
const TODO_CONTAINER = document.querySelector(".todo--container");

const MOBILE_ACTIVE = document.querySelector(".active");
const MOBILE_COMPLETED = document.querySelector(".completed");
const MOBILE_ALL = document.querySelector(".all");

const CLEAR_COMPLETED = document.querySelector(".clear");

const TODO_EMPTY = document.querySelector(".todo-empty");
const EMPTY_TEXT = document.querySelector(".empty-text");

let globalCompletedArr = [];
let globalActiveArr = [];

// ------ ⚙ ⚙ ⚙ ⚙ ⚙ 🔻 FUNCTIONS 🔻 ⚙ ⚙ ⚙ ⚙ ⚙ ------

const tasksLeft = () => {
    const ITEMS_LEFT_COUNTER = document.querySelector(".itemsLeft"); // element that will display the number of tasks left to complete

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

const setGlobalArrayValues = () => {
    let items = Array.from(document.querySelectorAll(".todo-item")); // grab all the items currently in the todo list

    //filter all the items that dont have the "completed" class
    let activeItems = items.filter((e) => {
        return !e.classList.contains("completed");
    });

    //filter all the items that have the "completed" class
    let completedItems = items.filter((e) => {
        return e.classList.contains("completed");
    });

    //update the global array values
    globalActiveArr = activeItems;
    globalCompletedArr = completedItems;
};

const filterActive = () => {
    MOBILE_ACTIVE.classList.add("selected");
    MOBILE_COMPLETED.classList.remove("selected");
    MOBILE_ALL.classList.remove("selected");

    setGlobalArrayValues();

    //remove the "hidden" class from each item in the globalActiveArr
    globalActiveArr.forEach((item) => {
        item.classList.remove("hidden");
    });

    // add the hidden class to each item in the globalCompletedArr
    globalCompletedArr.forEach((item) => {
        item.classList.add("hidden");
    });

    if (MOBILE_ACTIVE.classList.contains("selected") && globalActiveArr.length > 0) {
        TODO_EMPTY.classList.remove("display");
    } else if (globalActiveArr.length === 0) {
        TODO_EMPTY.classList.add("display");
        EMPTY_TEXT.innerText = "No active tasks";
    } else {
        TODO_EMPTY.classList.remove("display");
    }
};

const filterCompleted = () => {
    MOBILE_ACTIVE.classList.remove("selected");
    MOBILE_COMPLETED.classList.add("selected");
    MOBILE_ALL.classList.remove("selected");

    setGlobalArrayValues();

    globalActiveArr.forEach((item) => {
        item.classList.add("hidden");
    });

    globalCompletedArr.forEach((item) => {
        item.classList.remove("hidden");
    });

    if (MOBILE_COMPLETED.classList.contains("selected") && globalCompletedArr.length === 0) {
        TODO_EMPTY.classList.add("display");
        EMPTY_TEXT.innerText = "No completed tasks";
    } else {
        TODO_EMPTY.classList.remove("display");
    }
};

const showAll = () => {
    MOBILE_ACTIVE.classList.remove("selected");
    MOBILE_COMPLETED.classList.remove("selected");
    MOBILE_ALL.classList.add("selected");

    globalCompletedArr.forEach((item) => {
        item.classList.remove("hidden");
    });

    globalActiveArr.forEach((item) => {
        item.classList.remove("hidden");
    });

    if (MOBILE_ALL.classList.contains("selected")) {
        TODO_EMPTY.classList.remove("display");
    }
};

const createTodo = () => {
    if (TODO_INPUT.value == "") {
        return;
    }

    if (globalActiveArr.length > 0) {
        if (globalActiveArr[0].classList.contains("hidden")) {
            showAll();
        }
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

    if (MOBILE_ACTIVE.classList.contains("selected")) {
        TODO_EMPTY.classList.remove("display");
    } else if (MOBILE_COMPLETED.classList.contains("selected")) {
        showAll();
    }

    // 🔔 event listener for the circle checkbox
    CHECKBOX.addEventListener("click", () => {
        CHECKBOX.classList.toggle("toggleCheck");
        TODO_TEXT.classList.toggle("completed");
        TODO_ITEM.classList.toggle("completed");

        if (MOBILE_ACTIVE.classList.contains("selected")) {
            filterActive();
        }

        if (MOBILE_COMPLETED.classList.contains("selected")) {
            filterCompleted();
        }

        setGlobalArrayValues();

        tasksLeft();
    });

    // 🔔 event listener for the "X" close button
    TODO_CLOSE.addEventListener("click", () => {
        TODO_ITEM.remove();

        setGlobalArrayValues();

        if (
            (MOBILE_COMPLETED.classList.contains("selected") && globalCompletedArr.length > 0) ||
            (MOBILE_ACTIVE.classList.contains("selected") && globalActiveArr.length > 0)
        ) {
            TODO_EMPTY.classList.remove("display");
        } else if (
            (MOBILE_COMPLETED.classList.contains("selected") && globalCompletedArr.length === 0) ||
            (MOBILE_ACTIVE.classList.contains("selected") && globalActiveArr.length === 0)
        ) {
            TODO_EMPTY.classList.add("display");
        }

        const ITEM_ARRAY = Array.from(document.querySelectorAll(".todo-item"));

        if (ITEM_ARRAY.length == 0) {
            TODO_CONTAINER.classList.toggle("active");
        }

        tasksLeft();
    });

    tasksLeft();
}; // createTodo() function end

// -------------------🔔 🔔 EVENT LISTENERS🔔 🔔-------------------

// 🔻 Clears all finished tasks when the "clear completed" element is clicked
CLEAR_COMPLETED.addEventListener("click", () => {
    globalCompletedArr.forEach((item) => {
        item.remove();
    });

    setGlobalArrayValues();

    if (MOBILE_COMPLETED.classList.contains("selected")) {
        TODO_EMPTY.classList.add("display");
        EMPTY_TEXT.innerText = "No completed tasks";
    }

    if (globalCompletedArr.length === 0 && globalActiveArr.length === 0) {
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

// 🔻 when the mobile "Active" element is clicked, run the filter function
MOBILE_ACTIVE.addEventListener("click", filterActive);

MOBILE_COMPLETED.addEventListener("click", filterCompleted);

MOBILE_ALL.addEventListener("click", showAll);
