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
};

const parsedData =
  JSON.parse(localStorage.getItem('feedback-form-state')) || {};
email.value = parsedData.email || '';
message.value = parsedData.message || '';

feedback.addEventListener('input', e => {
  if (e.target === email || e.target === message) {
    updateParsedData();
  }
});

feedback.addEventListener('submit', e => {
  e.preventDefault();
  
  const trimmedEmail = email.value.trim();
  const trimmedMessage = message.value.trim();

  if (!trimmedEmail || !trimmedMessage) {
    if (!trimmedEmail) {
      email.setCustomValidity('E-mail is required to proceed');
    }
    if (!trimmedMessage) {
      message.setCustomValidity('Message is required to proceed');
    }
    return;
  }

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
