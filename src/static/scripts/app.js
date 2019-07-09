var token = "";

function login() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const url = `api/login`;
  const data = { email, password };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(r => {
      if (r.ok) {
        return r.json();
      } else {
        throw new Error("Login failed");
      }
    })
    .then(o => {
      localStorage.setItem("credentials", o.token);
      location.href = "app/home";
    });
}
