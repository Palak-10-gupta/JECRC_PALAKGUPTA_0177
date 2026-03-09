document.getElementById("message").addEventListener("keyup", (e) => {

let length = e.target.value.length;

document.getElementById("count").innerText = "Characters: " + length;

});