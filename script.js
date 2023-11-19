const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function newTodo() {
  const todoText = prompt('Введіть нову справу:');
  
  if (todoText) {
    const todoItem = document.createElement('li');
    todoItem.className = classNames.TODO_ITEM;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = classNames.TODO_CHECKBOX;
    checkbox.addEventListener('change', updateUncheckedCount);

    const todoTextElement = document.createElement('span');
    todoTextElement.className = classNames.TODO_TEXT;
    todoTextElement.textContent = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.className = classNames.TODO_DELETE;
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTodo);

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoTextElement);
    todoItem.appendChild(deleteButton);

    list.appendChild(todoItem);

    updateItemCount();
    updateUncheckedCount();
  }
}

function updateItemCount() {
  itemCountSpan.textContent = list.childElementCount;
}

function updateUncheckedCount() {
  const uncheckedCount = Array.from(list.children).filter(item => {
    const checkbox = item.querySelector(`.${classNames.TODO_CHECKBOX}`);
    return checkbox && !checkbox.checked;
  }).length;

  uncheckedCountSpan.textContent = uncheckedCount;
}

function deleteTodo() {
  const listItem = this.parentNode;
  list.removeChild(listItem);

  updateItemCount();
  updateUncheckedCount();
}
