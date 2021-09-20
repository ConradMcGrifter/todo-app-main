const INPUT_WRAP = document.querySelector(".todo-input");
const TODO_INPUT = document.querySelector(".input");
export const TODO_LIST = document.querySelector(".todo-list");
const TODO_CONTAINER = document.querySelector(".todo--container");

const ACTIVE_FILTER = document.querySelector(".active");
const COMPLETED_FILTER = document.querySelector(".completed");
const ALL_FILTER = document.querySelector(".all");

const CLEAR_COMPLETED = document.querySelector(".clear");

const TODO_EMPTY = document.querySelector(".todo-empty");
const EMPTY_TEXT = document.querySelector(".empty-text");

const INPUT_CIRCLE = document.querySelector(".circle");

let globalCompletedArr = [];
let globalActiveArr = [];

// ------------------------------------⚙ ⚙ ⚙ ⚙ ⚙ 🔻 FUNCTIONS 🔻 ⚙ ⚙ ⚙ ⚙ ⚙

const displayTasksLeft = () => {
    const ITEMS_LEFT_COUNTER = document.querySelector(".itemsLeft"); // element that will display the number of tasks left to complete

    let itemsArray = Array.from(TODO_LIST.querySelectorAll(".todoText")); //grab all the items currently in the Todo List
    let unfinishedItemsArray = itemsArray.filter((e) => {
        return !e.classList.contains("completed");
    });

    //set inner text of the counter element based on the length of the unfinishedItemsArray
    ITEMS_LEFT_COUNTER.innerText = `${unfinishedItemsArray.length} items left`;
};
//-------------------------------------------------------------------------

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
//-------------------------------------------------------------------------

// this function takes the globalCompleted and globalActive arrays as parameters
const setItemVisibility = (hideArr, showArr) => {
    // add the hidden class to each item
    hideArr.forEach((item) => {
        item.classList.add("hidden");
    });

    //remove the "hidden" class from each item
    showArr.forEach((item) => {
        item.classList.remove("hidden");
    });
};
//-------------------------------------------------------------------------

const alertEmptyList = (filterElement, filteredArr, message) => {
    if (
        filterElement.classList.contains("selected") &&
        filteredArr.length === 0
    ) {
        TODO_EMPTY.classList.add("display");
    } else {
        TODO_EMPTY.classList.remove("display");
    }

    EMPTY_TEXT.innerText = message;

    //hide the entire todo-container if there are no completed or active tasks left
    if (globalCompletedArr.length === 0 && globalActiveArr.length === 0) {
        TODO_CONTAINER.classList.remove("active");
    }
};
//-------------------------------------------------------------------------

const filterActive = () => {
    ACTIVE_FILTER.classList.add("selected");
    COMPLETED_FILTER.classList.remove("selected");
    ALL_FILTER.classList.remove("selected");

    setGlobalArrayValues();

    // first array is hidden, second array is visible
    setItemVisibility(globalCompletedArr, globalActiveArr);

    alertEmptyList(ACTIVE_FILTER, globalActiveArr, "No active tasks");
};
//-------------------------------------------------------------------------

const filterCompleted = () => {
    ACTIVE_FILTER.classList.remove("selected");
    COMPLETED_FILTER.classList.add("selected");
    ALL_FILTER.classList.remove("selected");

    setGlobalArrayValues();

    // first array is hidden, second array is visible
    setItemVisibility(globalActiveArr, globalCompletedArr);

    alertEmptyList(
        COMPLETED_FILTER,
        globalCompletedArr,
        "No completed tasks"
    );
};
//-------------------------------------------------------------------------

const showAll = () => {
    ACTIVE_FILTER.classList.remove("selected");
    COMPLETED_FILTER.classList.remove("selected");
    ALL_FILTER.classList.add("selected");

    globalCompletedArr.forEach((item) => {
        item.classList.remove("hidden");
    });

    globalActiveArr.forEach((item) => {
        item.classList.remove("hidden");
    });

    if (ALL_FILTER.classList.contains("selected")) {
        TODO_EMPTY.classList.remove("display");
    }
};
//-------------------------------------------------------------------------

const saveLocalStorage = (todoText) => {
    let task = todoText;

    //check if there are any tasks saved in local storage, if not --> make an empty array (local storage only takes strings as args)
    if (localStorage.getItem("activeTasks") === null) {
        localStorage.setItem("activeTasks", "[]");
    }

    // get the tasks saved in local storage. JSON.parse() converts the string array into an actual array we can work with
    let saved_tasks = JSON.parse(localStorage.getItem("activeTasks"));

    //add the new task to saved_tasks array
    saved_tasks.push(task);

    //save the tasks list to local storage
    localStorage.setItem("activeTasks", JSON.stringify(saved_tasks));
};
//-------------------------------------------------------------------------

const removeFromLocalStorage = (todoText) => {
    let task = todoText;

    let saved_tasks = JSON.parse(localStorage.getItem("activeTasks"));

    let taskIndex = saved_tasks.indexOf(task);

    saved_tasks.splice(taskIndex, 1);

    localStorage.setItem("activeTasks", JSON.stringify(saved_tasks));
    console.log(taskIndex);
};
//-------------------------------------------------------------------------

const getSavedTodos = () => {
    //if there is nothing saved in activeTasks dont run the code
    if (
        localStorage.getItem("activeTasks") === "[]" ||
        localStorage.getItem("activeTasks") === null
    ) {
        return;
    }

    TODO_CONTAINER.classList.add("active");

    // get the string array of saved todos from "activeTasks" and parse it into an array that we can work with
    let savedTasks = JSON.parse(localStorage.getItem("activeTasks"));

    // create todo element for every item in the savedTasks array
    savedTasks.forEach((task) => {
        // create elements to be added to the DOM
        const TODO_ITEM = document.createElement("li");
        const CHECKBOX = document.createElement("span");
        const TODO_TEXT = document.createElement("p");
        const TODO_CLOSE = document.createElement("span");

        // add classes and set inner text
        TODO_ITEM.classList.add("todo-item");
        CHECKBOX.classList.add("checkbox");
        TODO_TEXT.classList.add("todoText");
        TODO_CLOSE.classList.add("close");
        TODO_TEXT.innerText = task;

        // append elements
        TODO_ITEM.append(CHECKBOX);
        TODO_ITEM.append(TODO_TEXT);
        TODO_ITEM.append(TODO_CLOSE);
        TODO_LIST.append(TODO_ITEM);

        // 📁  event listener for the circle checkbox from local storage
        CHECKBOX.addEventListener("click", () => {
            CHECKBOX.classList.toggle("toggleCheck");
            TODO_TEXT.classList.toggle("completed");
            TODO_ITEM.classList.toggle("completed");

            if (ACTIVE_FILTER.classList.contains("selected")) {
                filterActive();
            }

            if (COMPLETED_FILTER.classList.contains("selected")) {
                filterCompleted();
            }

            //if the circle is checked --> remove todo text from local storage, else add it back to local storage if unchecked
            if (CHECKBOX.classList.contains("toggleCheck")) {
                removeFromLocalStorage(TODO_TEXT.innerText);
            } else {
                saveLocalStorage(TODO_TEXT.innerText);
            }

            setGlobalArrayValues();
            displayTasksLeft();
        });

        // 📁  event listener for the todo-text from local storage--> it is the same code as the event listener for checkbox
        TODO_TEXT.addEventListener("click", () => {
            CHECKBOX.classList.toggle("toggleCheck");
            TODO_TEXT.classList.toggle("completed");
            TODO_ITEM.classList.toggle("completed");

            if (ACTIVE_FILTER.classList.contains("selected")) {
                filterActive();
            }

            if (COMPLETED_FILTER.classList.contains("selected")) {
                filterCompleted();
            }

            //if the circle is checked --> remove todo text from local storage, else add it back to local storage if unchecked
            if (CHECKBOX.classList.contains("toggleCheck")) {
                removeFromLocalStorage(TODO_TEXT.innerText);
            } else {
                saveLocalStorage(TODO_TEXT.innerText);
            }

            setGlobalArrayValues();
            displayTasksLeft();
        });

        // 📁  event listener for the "X" close button from local storage
        TODO_CLOSE.addEventListener("click", () => {
            //this animation runs before the item is rmoved
            TODO_ITEM.style.animation = "fadeOut .25s ease";

            //this code runs after 350 milliseconds so that the animation has time to play
            setTimeout(function () {
                TODO_ITEM.remove();
                setGlobalArrayValues();

                if (ACTIVE_FILTER.classList.contains("selected")) {
                    filterActive();
                }

                if (COMPLETED_FILTER.classList.contains("selected")) {
                    filterCompleted();
                }

                displayTasksLeft();

                //hide the entire todo-container if there are no completed or active tasks left
                if (
                    globalCompletedArr.length === 0 &&
                    globalActiveArr.length === 0
                ) {
                    TODO_CONTAINER.classList.remove("active");
                }
            }, 250);

            // remove todo text from local storage
            removeFromLocalStorage(TODO_TEXT.innerText);
        });
    });

    setGlobalArrayValues();

    //display current task count
    document.querySelector(
        ".itemsLeft"
    ).innerText = `${savedTasks.length} items left`;
};
//-------------------------------------------------------------------------

const createTodo = () => {
    if (TODO_INPUT.value == "") {
        INPUT_WRAP.style.setProperty("--opacity", 1);
        return;
    }

    INPUT_WRAP.style.setProperty("--opacity", 0);

    // display the list container if the input field isnt blank
    if (TODO_INPUT.value != "") {
        TODO_CONTAINER.classList.add("active");
    }

    // create elements to be added to the DOM
    const TODO_ITEM = document.createElement("li");
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

    setGlobalArrayValues();

    // when the user creates a todo item, if the filter by active option is selected and the number of active items is greater than 0 --> remove the display class from the "empty list warning" element
    if (
        ACTIVE_FILTER.classList.contains("selected") &&
        globalActiveArr.length > 0
    ) {
        TODO_EMPTY.classList.remove("display");
        filterActive();
    } else if (COMPLETED_FILTER.classList.contains("selected")) {
        showAll();
    }

    // 🔔 event listener for the circle checkbox
    CHECKBOX.addEventListener("click", () => {
        CHECKBOX.classList.toggle("toggleCheck");
        TODO_TEXT.classList.toggle("completed");
        TODO_ITEM.classList.toggle("completed");

        if (ACTIVE_FILTER.classList.contains("selected")) {
            filterActive();
        }

        if (COMPLETED_FILTER.classList.contains("selected")) {
            filterCompleted();
        }

        //if the circle is checked --> remove todo text from local storage, else add it back to local storage if unchecked
        if (CHECKBOX.classList.contains("toggleCheck")) {
            removeFromLocalStorage(TODO_TEXT.innerText);
        } else {
            saveLocalStorage(TODO_TEXT.innerText);
        }

        setGlobalArrayValues();
        displayTasksLeft();
    });

    // 🔔 event listener for the todo-text --> it is the same code as the event listener for checkbox
    TODO_TEXT.addEventListener("click", () => {
        CHECKBOX.classList.toggle("toggleCheck");
        TODO_TEXT.classList.toggle("completed");
        TODO_ITEM.classList.toggle("completed");

        if (ACTIVE_FILTER.classList.contains("selected")) {
            filterActive();
        }

        if (COMPLETED_FILTER.classList.contains("selected")) {
            filterCompleted();
        }

        //if the circle is checked --> remove todo text from local storage, else add it back to local storage if unchecked
        if (CHECKBOX.classList.contains("toggleCheck")) {
            removeFromLocalStorage(TODO_TEXT.innerText);
        } else {
            saveLocalStorage(TODO_TEXT.innerText);
        }

        setGlobalArrayValues();
        displayTasksLeft();
    });

    // 🔔 event listener for the "X" close button
    TODO_CLOSE.addEventListener("click", () => {
        // this animation runs before the item is rmoved
        TODO_ITEM.style.animation = "fadeOut .25s ease";

        // this code runs after 350 milliseconds so that the animation has time to play
        setTimeout(function () {
            TODO_ITEM.remove();
            setGlobalArrayValues();

            if (ACTIVE_FILTER.classList.contains("selected")) {
                filterActive();
            }

            if (COMPLETED_FILTER.classList.contains("selected")) {
                filterCompleted();
            }

            displayTasksLeft();

            // hide the entire todo-container if there are no completed or active tasks left
            if (
                globalCompletedArr.length === 0 &&
                globalActiveArr.length === 0
            ) {
                TODO_CONTAINER.classList.remove("active");
            }
        }, 250);

        // remove todo text from local storage
        removeFromLocalStorage(TODO_TEXT.innerText);
    });

    // save the todo text to local storage
    saveLocalStorage(TODO_TEXT.innerText);

    TODO_INPUT.value = ""; // reset input field to blank after user creates to-do item
    displayTasksLeft();
};
//-------------------------------------------------------------------------

// -------------------🔔 🔔 EVENT LISTENERS🔔 🔔-------------------

// 🔻 Clears all finished tasks when the "clear completed" element is clicked
CLEAR_COMPLETED.addEventListener("click", () => {
    globalCompletedArr.forEach((item) => {
        item.remove();
    });

    setGlobalArrayValues();

    alertEmptyList(
        COMPLETED_FILTER,
        globalCompletedArr,
        "No completed tasks"
    );
});

// 🔻 create todo item when the enter key is pressed
TODO_INPUT.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        createTodo();
    }
});

// 🔻when page is loaded --> create todos that are saved in local storage
document.addEventListener("DOMContentLoaded", getSavedTodos);

// 🔻 create todo item when the input circle is clicked
INPUT_CIRCLE.addEventListener("click", createTodo);

// 🔻 filter controls event listeners
ACTIVE_FILTER.addEventListener("click", filterActive);

COMPLETED_FILTER.addEventListener("click", filterCompleted);

ALL_FILTER.addEventListener("click", showAll);

// 🔻 on input --> if input value does not equal an empty string --> hide tooltip
TODO_INPUT.addEventListener("input", () => {
    if (TODO_INPUT.value != "") {
        INPUT_WRAP.style.setProperty("--opacity", 0);
    }
});
