const feedback = document.querySelector('.feedback-form');
const email = feedback.elements.email;
const message = feedback.elements.message;

const updateParsedData = () => {
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({
      email: email.value.trim(),
      message: message.value.trim(),
    })
  );

  // Оновлюємо parsedData після кожної події введення
  parsedData.email = email.value.trim();
  parsedData.message = message.value.trim();
};

const parsedData =
  JSON.parse(localStorage.getItem('feedback-form-state')) || {};

email.value = parsedData.email || '';
message.value = parsedData.message || '';

email.addEventListener('input', () => {
  updateParsedData();
});

message.addEventListener('input', () => {
  updateParsedData();
});

feedback.addEventListener('submit', e => {
  const trimmedEmail = email.value.trim();
  const trimmedMessage = message.value.trim();

  if (!trimmedEmail || !trimmedMessage) {
    e.preventDefault();

    if (!trimmedEmail) {
      email.setCustomValidity('E-mail is required to proceed');
    }

    if (!trimmedMessage) {
      message.setCustomValidity('Message is required to proceed');
    }

    return;
  }

  e.preventDefault();
  console.log({ email: trimmedEmail, message: trimmedMessage });
  localStorage.removeItem('feedback-form-state');
  feedback.reset();
});

window.addEventListener(
  'load',
  () => {
    document.body.classList.add('visible');
  },
  { once: true }
);
