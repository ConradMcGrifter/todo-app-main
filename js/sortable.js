import { TODO_LIST } from "./todo.js";

const dragArea = TODO_LIST;

new Sortable(dragArea, {
    animation: 350,
});
