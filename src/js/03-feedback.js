import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};
formEl.addEventListener('input', throttle(onDataInput, 500));
formEl.addEventListener('submit', onFormSubmit);
// console.log(formEl.elements);
initForm();
function onDataInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  // console.log(event.target.name);
  // console.log(event.target.value);
}
function initForm() {
  let savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    savedData = JSON.parse(savedData);
    Object.entries(savedData).forEach(([name, value]) => {
      formEl.elements[name].value = value || '';
      formData[name] = value;
    });
    // for (const key in savedData) {
    //   formEl.elements[key].value = savedData[key] || '';
    // }
  }
}
function onFormSubmit(event) {
  let { email, message } = formEl.elements;
  console.log({ email: email.value, message: message.value });
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
