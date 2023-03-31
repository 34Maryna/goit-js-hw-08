import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('[name="email"]'),
  textarea: document.querySelector('[name="message"]'),
  };

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onForm, 500));
refs.form.addEventListener('submit', onSubmit);

localStorageSetting();

function onSubmit(evt) {
  evt.preventDefault();
  const currentValue = localStorage.getItem(STORAGE_KEY);
  const parseValue = JSON.parse(currentValue);
  evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function onForm(evt) {
  const email = refs.input.value;
  const messageValue = refs.textarea.value;
  const message = messageValue.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, message }));
}

function localStorageSetting() {
  const currentValue = localStorage.getItem(STORAGE_KEY);
  const parseValue = JSON.parse(currentValue);

  if (currentValue) {
    refs.input.value = parseValue.email;
    refs.textarea.value = parseValue.message;
  }
}
