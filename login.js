function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Basic hardcoded login
  if (username === "admin" && password === "1234") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "sample.html"; // change if your dashboard is named differently
  } else {
    document.getElementById("error-msg").textContent = "Invalid username or password.";
  }
}
