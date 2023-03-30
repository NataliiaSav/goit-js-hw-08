import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onDataInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onDataInput(event) {
  let savedData = localStorage.getItem(STORAGE_KEY);
  savedData = savedData ? JSON.parse(savedData) : {};
  savedData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
}

function onFormSubmit(event) {
  let { email, message } = formEl.elements;
  console.log({ email: email.value, message: message.value });
  event.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
}
