import "./style.scss";

// DEMONSTRATION BANNER
let demoBanner = document.querySelector('#banner-info');

let btnCloseDemoBanner = document.querySelector('#close-banner');

btnCloseDemoBanner.addEventListener('click', () => {


    demoBanner.addEventListener('transitionend', (e) => {
        e.stopPropagation();
        demoBanner.remove()
    });

    demoBanner.classList.add('close');
});



// PROJECT

// disable animation before load and when resizing page
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("animation-stopper");
  }, 100);
});

window.addEventListener("load", () => {
    document.body.classList.remove("animation-stopper"); 
});


// var

let inputTodo = document.querySelector('#input-todo');
let submitTodo = document.querySelector('#submit-todo');
let listTodo = document.querySelector('#list-todo');
let btnsRemoveTodo = document.querySelectorAll('.btn__remove');
let checkboxsTodo = document.querySelectorAll('.checkbox');

const todos = [{
        text: "Apprendre le javascript",
        done: false,
        editMode: false

    },
    {
        text: "Faire du javascript",
        done: true,
        editMode: false

    }
];


submitTodo.addEventListener('click', (e) => {
    e.preventDefault();

    // check if input is not empty
    if (inputTodo.value != '') addTodo(inputTodo.value);

    // remove value of input
    inputTodo.value = '';
});

btnsRemoveTodo.forEach(btn => {
    btn.addEventListener('click', (e) => {
        removeTodo(btn);
    });
});


const displayTodo = () => {
    const todosNode = todos.map((todo, index) => {
        if (todo.editMode) {
            return createTodoEditElement(todo, index);
        } else {
            return createTodoElement(todo, index);
        }
    });
    listTodo.innerHTML = "";
    listTodo.append(...todosNode);
};

const createTodoElement = (todo, index) => {

    // create new parent element li
    let todoItem = document.createElement("li");
    todoItem.classList.add('todo-item');

    // create checkbox
    let checkbox = document.createElement("div");
    todo.done ? checkbox.classList.add('checkbox', 'check') : checkbox.classList.add('checkbox');
    todoItem.appendChild(checkbox);

    checkbox.addEventListener("click", event => {
        toggleCheckedTodo(checkbox, index);
    });

    // create p element
    let textElement = document.createElement("p");
    textElement.classList.add('todo-item__text');
    textElement.innerText = todo.text;
    todoItem.appendChild(textElement);


    // create btn edit
    let btnEdit = document.createElement("button");
    btnEdit.classList.add('btn', 'btn__small', 'btn__primary');
    btnEdit.innerText = 'Editer';

    btnEdit.addEventListener("click", event => {
        editTodo(index);
    });

    todoItem.appendChild(btnEdit);

    // create btn remove
    let btnRemove = document.createElement("button");
    btnRemove.classList.add('btn', 'btn__small', 'btn__danger');
    btnRemove.innerText = 'Supprimer';

    // add events click
    btnRemove.addEventListener('click', (e) => {
        removeTodo(index);
    });

    todoItem.appendChild(btnRemove);

    return todoItem;
}

const createTodoEditElement = (todo, index) => {
    // create new parent element li
    let todoItem = document.createElement("li");
    todoItem.classList.add('todo-item', 'edit-mode');

    let input = document.createElement("input");
    input.type = "text";
    input.value = todo.text;
    input.classList.add('input-edit');

    todoItem.appendChild(input);

    // create btn cancel
    let btnEdit = document.createElement("button");
    btnEdit.classList.add('btn', 'btn__small', 'btn__danger');
    btnEdit.innerText = 'Annuler';

    btnEdit.addEventListener("click", event => {
        cancelEditTodo(index);
    });

    todoItem.appendChild(btnEdit);

    // create btn remove
    let btnRemove = document.createElement("button");
    btnRemove.classList.add('btn', 'btn__small', 'btn__primary');
    btnRemove.innerText = 'Valider';

    todoItem.appendChild(btnRemove);

    // add events click
    btnRemove.addEventListener('click', (e) => {
        validateEditTodo(input.value, index);
    });

    return todoItem;


}

const removeTodo = index => {
    todos.splice(index, 1);
    displayTodo();
}

const addTodo = text => {
    todos.push({
        text,
        done: false
    });
    displayTodo();
};

const toggleCheckedTodo = (checkbox, todo) => {
    checkbox.classList.toggle("check");
    todos[todo].done = !todos[todo].done;
};

const editTodo = (todo) => {
    todos[todo].editMode = true;
    displayTodo();
};

const cancelEditTodo = todo => {
    todos[todo].editMode = false;
    displayTodo();
};

const validateEditTodo = (text, todo) => {
    todos[todo].text = text;
    todos[todo].editMode = false;
    displayTodo();
};



displayTodo();