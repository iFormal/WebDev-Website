var user_id = document.getElementById('user_id');
var user_email = document.getElementById('user_email');
var pwd = document.getElementById('pwd');

function store() {
    localStorage.setItem('user_id', user_id.value);
    localStorage.setItem('user_email', user_email.value);
    localStorage.setItem('pwd', pwd.value);
}

function check() {
  var storeduser = localStorage.getItem('user_id');
  var storedemail = localStorage.getItem('user_email');
  var storedpwd = localStorage.getItem('pwd');

  var userID = document.getElementById('userID');
  var userPWD = document.getElementById('userPWD');

  if (userID.value == storeduser && userPWD.value == storedpwd) {
    event.preventDefault();
    window.location = "account.html";
  }
  else {
    alert('Username or Password is Incorrect');
  }
}

function logout() {
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_id');
  localStorage.removeItem('pwd');
  event.preventDefault();
  window.location = "index.html"
}
