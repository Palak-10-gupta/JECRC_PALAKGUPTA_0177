// APPLY LEAVE FUNCTION
function applyLeave(){

const token = localStorage.getItem("token");

if(!token){
alert("Please login first");
window.location.href="login.html";
return;
}

const data = {

leaveType: document.getElementById("leaveType").value,
startDate: document.getElementById("startDate").value,
endDate: document.getElementById("endDate").value,
reason: document.getElementById("reason").value

};

fetch("http://localhost:5119/api/Leave/apply",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + token
},

body: JSON.stringify(data)

})

.then(res => {

if(!res.ok){
throw new Error("Failed to apply leave");
}

return res.json();

})

.then(data => {

alert("Leave Applied Successfully");

})

.catch(error => {

console.error(error);
alert("Error applying leave");

});

}


// LOAD LEAVES FUNCTION
function loadLeaves(){

const token = localStorage.getItem("token");

if(!token){
alert("Please login first");
window.location.href="login.html";
return;
}

fetch("http://localhost:5119/api/Leave/my-leaves",{

headers:{
"Authorization":"Bearer " + token
}

})

.then(res => {

if(!res.ok){
throw new Error("Failed to load leaves");
}

return res.json();

})

.then(data => {

let table = document.getElementById("leaveTable");

table.innerHTML="";

data.forEach(l => {

table.innerHTML += `

<tr>
<td>${l.leaveType}</td>
<td>${new Date(l.startDate).toLocaleDateString()}</td>
<td>${new Date(l.endDate).toLocaleDateString()}</td>
<td>${l.status}</td>
</tr>

`;

});

})

.catch(error => {

console.error(error);
alert("Error loading leaves");

});

}