
const ENROLL_API = "https://localhost:7220/api/Enrollments";
const COURSE_API = "https://localhost:7220/api/Courses";
const USER_API = "https://localhost:7220/api/Users";

let enrollments = [];
let courses = [];
let students = [];

/* ⭐ LOAD PAGE */

window.onload = async function () {

    await Promise.all([
        loadCourses(),
        loadStudents()
    ]);

    await loadHistory();
};

/* ⭐ LOAD COURSES */

async function loadCourses(){
    let r = await fetch(COURSE_API);
    courses = await r.json();
}

/* ⭐ LOAD STUDENTS */

async function loadStudents(){
    let r = await fetch(USER_API);
    let data = await r.json();

    students = data.filter(x => x.role === "Student");
}

/* ⭐ LOAD HISTORY */

async function loadHistory(){

    let r = await fetch(ENROLL_API);
    enrollments = await r.json();

    renderHistory(enrollments);
}

/* ⭐ RENDER TABLE */

function renderHistory(list){

    let body = document.getElementById("historyBody");
    body.innerHTML = "";

    list.forEach(e => {

        let student =
            students.find(s => s.userId === e.userId);

        let course =
            courses.find(c => c.courseId === e.courseId);

        body.innerHTML += `
        <tr>
            <td>${e.enrollmentId}</td>

            <td>
                ${student ? student.name : "-"}
            </td>

            <td>
                ${course ? course.courseName : "-"}
            </td>

            <td>${format(e.enrollmentDate)}</td>

            <td>
                ${e.dropDate ? format(e.dropDate) : "-"}
            </td>

            <td>
                ${
                    e.dropDate
                    ? `<span class="status-no">Dropped</span>`
                    : `<span class="status-yes">Active</span>`
                }
            </td>

        </tr>`;
    });
}

/* ⭐ SEARCH */

function searchHistory(text){

    text = text.toLowerCase();

    let filtered = enrollments.filter(e => {

        let student =
            students.find(s => s.userId === e.userId);

        let course =
            courses.find(c => c.courseId === e.courseId);

        return (
            (student && student.name.toLowerCase().includes(text)) ||
            (course && course.courseName.toLowerCase().includes(text))
        );
    });

    renderHistory(filtered);
}

/* ⭐ DATE FORMAT */

function format(d){
    return new Date(d).toLocaleDateString();
}