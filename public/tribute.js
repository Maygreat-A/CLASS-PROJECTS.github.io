
        document.getElementById('myForm').addEventListener('submit', function(event) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const formMessage = document.getElementById('formMessage');
            
            if (!name || !email || !message) {
                event.preventDefault(); // Prevent form submission
                formMessage.textContent = 'Please fill out all fields.';
            } else {
                formMessage.textContent = '';
            }
        });
  

//jokes


    const jokes = [
      "Why don't skeletons fight each other? They don't have the guts.",
      "I'm reading a book on anti-gravity. It's impossible to put down!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "What do you call fake spaghetti? An impasta!",
      "Why don’t scientists trust atoms? Because they make up everything!",
      "Why did the math book look sad? Because it had too many problems.",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "Want to hear a joke about construction? I'm still working on it.",
      "Why was the computer cold? It left its Windows open!",
      "What do you call cheese that isn't yours? Nacho cheese."
    ];

    const generateButton = document.getElementById('generateButton');
    const slider = document.getElementById('slider');
    const jokeCountDisplay = document.getElementById('jokeCount');
    const jokesContainer = document.getElementById('jokesContainer');

    // Update displayed joke count when slider changes
    slider.addEventListener('input', () => {
      jokeCountDisplay.textContent = slider.value;
    });

    // Generate jokes when button is clicked
    generateButton.addEventListener('click', () => {
      const jokeCount = parseInt(slider.value);
      jokesContainer.innerHTML = '';

      for (let i = 0; i < jokeCount; i++) {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        const jokeElement = document.createElement('div');
        jokeElement.classList.add('joke');
        jokeElement.textContent = randomJoke;
        jokesContainer.appendChild(jokeElement);
      }
    });
 
//**VALIDATION**
  // Show modal based on button click
  function showModal(isSignup) {
    const modal = document.getElementById('authModal');
    const modalTitle = document.getElementById('modalTitle');
    const confirmPasswordField = document.getElementById('confirmPasswordField');
    const submitButton = document.getElementById('submitButton');

    // Set title and display Confirm Password field for Signup
    if (isSignup) {
      modalTitle.innerText = 'Signup';
      confirmPasswordField.style.display = 'block';
      submitButton.onclick = submitSignup;
    } else {
      modalTitle.innerText = 'Login';
      confirmPasswordField.style.display = 'none';
      submitButton.onclick = submitLogin;
    }

    modal.style.display = 'block';
  }

  // Close the modal
  function closeModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
  }

 // Submit Signup
function submitSignup(event) {
  event.preventDefault(); // Prevent page reload
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      if (data.message === "Signup successful. User created.") closeModal();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}

// Submit Login
function submitLogin(event) {
  event.preventDefault(); // Prevent page reload
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      if (data.message === "Login successful.") closeModal();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}
