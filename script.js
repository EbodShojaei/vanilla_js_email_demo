document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Perform form validation
      if (validateForm(name, email, message)) {
          try {
              const response = await fetch('http://localhost:3000/send', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ name, email, message }),
              });

              if (response.ok) {
                  form.reset();
                  formFeedback.classList.remove('hidden');
                  formFeedback.innerText = 'Your message has been sent!';
              } else {
                  throw new Error('Failed to send message');
              }
          } catch (error) {
              alert('Error sending message: ' + error.message);
          }
      }
  });

  function validateForm(name, email, message) {
      // Basic validation checks
      if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
          alert('Please fill in all fields.');
          return false;
      }
      if (!validateEmail(email)) {
          alert('Please enter a valid email address.');
          return false;
      }
      return true;
  }

  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }
});
