
const inputContainer = document.querySelector(".todo-input");
const showInputAction = inputContainer.querySelector(".show-input-action");
const todoForm = inputContainer.querySelector(".todo-form");
const inputTodo = todoForm.querySelector("#input-todo");
const todoButton = todoForm.querySelector("#todo-button");

const listContainer = document.querySelector(".todo-lists");
const showResultAction = listContainer.querySelector(".show-result-action");
const unOrderList = listContainer.querySelector(".ul-list");
const clearButton = listContainer.querySelector("#reset-button");


const loadDataFromLocalStorage = () => {
  
  let todoArray = getDataFromLocalStorage();

  
  createListElementShow(todoArray);
};


const showActionAlert = (text, signal, element) => {
  element.textContent = text;
  element.classList.add(`show-alert-${signal}`);
  inputTodo.value = "";

  
  setTimeout(() => {
    element.classList.remove(`show-alert-${signal}`);
  }, 1500);
};


const checkDataValidity = (event) => {
  event.preventDefault();
  let todoValue = inputTodo.value;


  if (todoValue) {
    putDataInLocalStorage(todoValue);
    showActionAlert(`${todoValue} is successfully added`, "green", showInputAction);

  } else {
    showActionAlert("please enter a todo", "red", showInputAction);
  }
};

const getDataFromLocalStorage = () => {
  let todoArray, exist;

  exist = localStorage.getItem("todoArray");
  todoArray = exist === null ? [] : JSON.parse(exist);

  return todoArray;
};

const putDataInLocalStorage = (todoValue) => {
  let uniqueId, arryData, todoArray, serial;

  
  todoArray = getDataFromLocalStorage();

  
  uniqueId = Date.now().toString();


  arryData = { id: uniqueId, value: todoValue };

  
  todoArray.push(arryData);

  
  serial = todoArray.length;

  
  createListElement(arryData, serial);

  
  setDataInLocalStorage(todoArray);
};


const setDataInLocalStorage = (todoArray) => {
  
  let storableData = JSON.stringify(todoArray);

  
  localStorage.setItem("todoArray", storableData);
};


const createListElement = (arryData, serial) => {
  let uniqueId, value;
  uniqueId = arryData.id;
  value = arryData.value;

  
  const list = document.createElement("li");
  list.id = uniqueId;
  const element = `<p>${serial} :</p> <p>${value}</p> <p id="single-delete"><img  src="./icon/icons8-trash-30.png" alt="Delete" /></p>`;

  
  list.innerHTML = element;

  
  unOrderList.appendChild(list);

 
  const singleListDelete = list.querySelector("#single-delete");
  singleListDelete.addEventListener("click", deleteSingleItem);
};


const deleteSingleItem = (event) => {
  let todoArray, position, previousItem;

 
  const selectedList = event.target.parentElement.parentElement;
  const value = event.target.parentElement.previousElementSibling.innerText;
  const id = selectedList.id;

  
  unOrderList.removeChild(selectedList);

  
  showActionAlert(`${value} is removed successfully`, "green", showResultAction);

 
  todoArray = getDataFromLocalStorage();
  position = todoArray.findIndex((object) => {
    return object.id === id;
  });

  
  previousItem = todoArray.filter((value, index) => {
    return index > position;
  });

  
  todoArray = todoArray.filter((value, index) => {
    return index < position;
  });

  
  previousItem.forEach((value) => {
    todoArray.push(value);
  });

  
  setDataInLocalStorage(todoArray);
  
  setTimeout(() => {
    location.reload();
  }, 2000);
};

const createListElementShow = (todoArray) => {
  let arryData, serial;

    todoArray.forEach((value, index, array) => {
    arryData = value;
    serial = index + 1;
    createListElement(arryData, serial);
  });
};


const clearAllListItem = () => {
  let len = getDataFromLocalStorage().length;

  if (len !== 0) {
    
    let descition = confirm("Are You Sure To Delete All Todo ?");

    
    if (descition) {
     
      unOrderList.textContent = "";

      
      localStorage.removeItem("todoArray");
      showActionAlert("all items are successfully deleted", "red", showResultAction);

    } else {
      showActionAlert("items are not deleted", "green", showResultAction);
    }

  } else {
    showActionAlert("no more item to delete", "red", showResultAction);
  }
};

document.addEventListener("DOMContentLoaded", loadDataFromLocalStorage)
todoForm.addEventListener("submit", checkDataValidity);


clearButton.addEventListener("click", clearAllListItem);


todoButton.addEventListener("mousedown", () => {
  todoButton.classList.add("scaling");
});

todoButton.addEventListener("mouseup", () => {
  todoButton.classList.remove("scaling");
});

clearButton.addEventListener("mousedown", () => {
  clearButton.classList.add("scaling");
});

clearButton.addEventListener("mouseup", () => {
  clearButton.classList.remove("scaling");
});

