
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const receiptButton = document.getElementById("receiptBtn");
const reservationFilters = document.querySelectorAll(".reservation-filters button");
const searchForm = document.getElementById("searchForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const error = document.getElementById("errorMessage");
    const emailField = emailInput.closest(".field");
    const passwordField = passwordInput.closest(".field");
    emailField.classList.remove("invalid");
    passwordField.classList.remove("invalid");

    if (!email || !password) {
      error.textContent = "Please fill in all fields.";
      return;
    }
    if (!emailInput.checkValidity()) {
      error.textContent = "Please enter a valid email address.";
      emailField.classList.add("invalid");
      return;
    }
    if (password.length < 6) {
      error.textContent = "Password must contain at least 6 characters.";
      passwordField.classList.add("invalid");
      return;
    }
    error.textContent = "";
    window.location.href = "home.html";
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const requiredFields = signupForm.querySelectorAll("[required]");
    const signupError = document.getElementById("signupError");
    const signupEmail = document.getElementById("signupEmail");
    const signupPassword = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    signupError.textContent = "";
    if (Array.from(requiredFields).some(function (field) { return !field.value.trim(); })) {
      signupError.textContent = "Please complete all fields.";
      return;
    }
    if (!signupEmail.checkValidity()) {
      signupError.textContent = "Please enter a valid email address.";
      signupEmail.closest(".field").classList.add("invalid");
      return;
    }
    if (signupPassword.value.length < 6) {
      signupError.textContent = "Password must contain at least 6 characters.";
      signupPassword.closest(".field").classList.add("invalid");
      return;
    }
    if (signupPassword.value !== confirmPassword.value) {
      signupError.textContent = "Passwords do not match.";
      confirmPassword.closest(".field").classList.add("invalid");
      return;
    }
    window.location.href = "home.html";
  });
}

if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const destination = document.getElementById("destination").value.trim();
    const error = document.getElementById("searchError");

    if (!destination) {
      error.hidden = false;
      return;
    }

    error.hidden = true;
    window.location.href = "results.html";
  });
}

if (receiptButton) {
  receiptButton.addEventListener("click", function () {
    const receipt = [
      "ROYAL STAY",
      "Reservation confirmed",
      "Hotel: Hotel Luxe",
      "Check-in: 12 Dec 2026",
      "Check-out: 15 Dec 2026",
      "Guests: 2 Adults",
      "Total: $540"
    ].join("\n");
    const blob = new Blob([receipt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "RoyalStay-Reservation.txt";
    link.click();
    URL.revokeObjectURL(url);
  });
}

if (reservationFilters.length) {
  reservationFilters.forEach(function (filter) {
    filter.addEventListener("click", function () {
      reservationFilters.forEach(function (button) {
        button.classList.remove("active");
      });
      filter.classList.add("active");

      const selectedStatus = filter.dataset.status;
      document.querySelectorAll(".reservation-card").forEach(function (card) {
        card.hidden = selectedStatus !== "all" && card.dataset.status !== selectedStatus;
      });
    });
  });
}
