function loadAllLeaves(){

const token = localStorage.getItem("token");

fetch("http://localhost:5119/api/Leave/all",{

headers:{
"Authorization":"Bearer "+token
}

})

.then(res=>res.json())

.then(data=>{

let table=document.getElementById("leaveTable");

table.innerHTML="";

data.forEach(l=>{

table.innerHTML+=`

<tr>
<td>${l.employeeId}</td>
<td>${l.leaveType}</td>
<td>${new Date(l.startDate).toLocaleDateString()}</td>
<td>${new Date(l.endDate).toLocaleDateString()}</td>
<td>${l.status}</td>
<td>
<button onclick="approveLeave(${l.id})">Approve</button>
<button onclick="rejectLeave(${l.id})">Reject</button>
</td>
</tr>

`;

});

});

}

function approveLeave(id){

const token = localStorage.getItem("token");

fetch(`http://localhost:5119/api/Leave/approve/${id}`,{

method:"PUT",

headers:{
"Authorization":"Bearer "+token
}

})

.then(res=>res.text())

.then(data=>{
alert(data);
loadAllLeaves();
});

}

function rejectLeave(id){

const token = localStorage.getItem("token");

fetch(`http://localhost:5119/api/Leave/reject/${id}`,{

method:"PUT",

headers:{
"Authorization":"Bearer "+token
}

})

.then(res=>res.text())

.then(data=>{
alert(data);
loadAllLeaves();
});

}