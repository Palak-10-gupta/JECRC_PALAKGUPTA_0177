async function login(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

try{

const response = await fetch("http://localhost:5119/api/Auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username: username,
password: password
})
});

if(!response.ok){
const text = await response.text();
console.log("Server response:",text);
alert("Login failed");
return;
}

const data = await response.json();

console.log("Token received:",data.token);

localStorage.setItem("token",data.token);

alert("Login Successful");

window.location.href="dashboard.html";

}catch(error){

console.error("Login error:",error);
alert("Cannot connect to server");

}

}