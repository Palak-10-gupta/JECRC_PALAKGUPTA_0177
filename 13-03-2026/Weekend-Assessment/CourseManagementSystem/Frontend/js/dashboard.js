
let user = JSON.parse(localStorage.getItem("user"));

document.getElementById("welcomeUser").innerText =
    "Welcome, " + user.name;

document.getElementById("roleTag").innerText =
    user.role;

async function loadStats(){

    let courseRes = await fetch(BASE_URL + "/Courses");
    let courses = await courseRes.json();

    let enrollRes = await fetch(BASE_URL + "/Enrollments");
    let enrollments = await enrollRes.json();

    let userRes = await fetch(BASE_URL + "/Users");
    let users = await userRes.json();

    document.getElementById("courseCount").innerText = courses.length;
    document.getElementById("enrollCount").innerText = enrollments.length;

    let students = users.filter(x => x.role === "Student");
    document.getElementById("studentCount").innerText = students.length;
}

loadStats();

function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}