
const ENROLL_API = "https://localhost:7220/api/Enrollments";
const COURSE_API = "https://localhost:7220/api/Courses";
const USER_API = "https://localhost:7220/api/Users";

let allEnroll = [];
let allCourses = [];
let allStudents = [];

window.onload = async function () {

    await loadStudents();
    await loadCourses();
    await loadEnrollments();
};

/* ========= LOAD STUDENTS ========= */

async function loadStudents(){

    let res = await fetch(USER_API);
    let data = await res.json();

    allStudents = data.filter(x => x.role === "Student");

    let select = document.getElementById("studentSelect");
    select.innerHTML = "";

    allStudents.forEach(s => {

        select.innerHTML += `
        <option value="${s.userId}">
            ${s.name}
        </option>`;
    });
}

/* ========= LOAD COURSES ========= */

async function loadCourses(){

    let res = await fetch(COURSE_API);
    let data = await res.json();

    allCourses = data;

    let select = document.getElementById("courseSelect");
    select.innerHTML = "";

    allCourses.forEach(c => {

        select.innerHTML += `
        <option value="${c.courseId}">
            ${c.courseName}
        </option>`;
    });
}

/* ========= LOAD ENROLL ========= */

async function loadEnrollments(){

    let res = await fetch(ENROLL_API);
    let data = await res.json();

    allEnroll = data;

    renderEnroll(data);
}

/* ========= RENDER ========= */

function renderEnroll(list){

    let body = document.getElementById("enrollBody");
    body.innerHTML = "";

    list.forEach(e => {

        let student =
            allStudents.find(s => s.userId === e.userId);

        let course =
            allCourses.find(c => c.courseId === e.courseId);

        body.innerHTML += `
        <tr>
            <td>${e.enrollmentId}</td>

            <td>
                ${student ? student.name : "Unknown"}
            </td>

            <td>
                ${course ? course.courseName : "Unknown"}
            </td>

            <td>${formatDate(e.enrollmentDate)}</td>

            <td>
                ${e.dropDate
                    ? `<span class="status-no">Dropped</span>`
                    : `<span class="status-yes">Active</span>`
                }
            </td>

            <td>
                ${
                    e.dropDate
                    ? `-`
                    : `<button class="btn-light"
                        onclick="dropEnroll(${e.enrollmentId})">
                        Drop
                       </button>`
                }
            </td>

        </tr>`;
    });
}

/* ========= ADD ========= */

async function addEnrollment(){

    let userId =
        document.getElementById("studentSelect").value;

    let courseId =
        document.getElementById("courseSelect").value;

    let obj = {

        userId: parseInt(userId),
        courseId: parseInt(courseId)
    };

    let res = await fetch(ENROLL_API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(obj)
    });

    if(res.ok){

        closeModal();
        await loadEnrollments();

    } else {

        alert("Enrollment failed");

    }
}

/* ========= DROP ========= */

async function dropEnroll(id){

    await fetch(ENROLL_API + "/" + id,{
        method:"DELETE"
    });

    loadEnrollments();
}

/* ========= SEARCH ========= */

function searchEnroll(text){

    text = text.toLowerCase();

    let filtered = allEnroll.filter(e => {

        let student =
            allStudents.find(s => s.userId === e.userId);

        let course =
            allCourses.find(c => c.courseId === e.courseId);

        return (
            (student && student.name.toLowerCase().includes(text)) ||
            (course && course.courseName.toLowerCase().includes(text))
        );
    });

    renderEnroll(filtered);
}

/* ========= MODAL ========= */

function openModal(){
    document.getElementById("modal").style.display = "block";
}

function closeModal(){
    document.getElementById("modal").style.display = "none";
}

/* ========= DATE ========= */

function formatDate(d){

    let dt = new Date(d);

    return dt.toLocaleDateString();
}