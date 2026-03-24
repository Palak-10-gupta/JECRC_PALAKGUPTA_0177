function register(){

const username=document.getElementById("username").value
const password=document.getElementById("password").value
const role=document.getElementById("role").value

fetch("http://localhost:5119/api/Auth/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username:username,
password:password,
role:role
})

})

.then(res=>res.json())

.then(data=>{
alert("User Registered Successfully")
window.location="login.html"
})

}