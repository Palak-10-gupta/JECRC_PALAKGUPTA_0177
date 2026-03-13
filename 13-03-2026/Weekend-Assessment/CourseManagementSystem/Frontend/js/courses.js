const API = "https://localhost:7220/api/Courses";

let allCourses = [];

window.onload = function () {
    loadCourses();
};

async function loadCourses() {

    try {

        let res = await fetch(API);

        if (!res.ok) throw new Error("API failed");

        let data = await res.json();

        allCourses = data;

        render(data);

    }
    catch (e) {

        console.log("Error loading courses", e);
        alert("Unable to load courses");

    }
}

function render(list) {

    let body = document.getElementById("courseBody");
    body.innerHTML = "";

    list.forEach(c => {

        body.innerHTML += `
        <tr>
            <td>${c.courseId}</td>
            <td>${c.courseName}</td>
            <td>${c.departmentId}</td>
            <td>${c.credits}</td>

            <td>
                ${c.seatsAvailable
                ? `<span class="status-yes">Available</span>`
                : `<span class="status-no">Full</span>`}
            </td>

            <td>
                <button onclick="deleteCourse(${c.courseId})" class="btn-light">
                    Delete
                </button>
            </td>

        </tr>`;
    });
}

/* ---------- ADD COURSE ---------- */

function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

async function addCourse() {

    let name = document.getElementById("name").value.trim();
    let dept = document.getElementById("dept").value.trim();
    let credits = document.getElementById("credits").value.trim();

    if (name === "" || dept === "" || credits === "") {
        alert("Please fill all fields");
        return;
    }

    let courseObj = {
        courseName: name,
        departmentId: parseInt(dept),
        credits: parseInt(credits),
        seatsAvailable: true
    };

    try {

        let res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(courseObj)
        });

        if (!res.ok) throw new Error("Insert failed");

        closeModal();

        loadCourses();

        document.getElementById("name").value = "";
        document.getElementById("dept").value = "";
        document.getElementById("credits").value = "";

    }
    catch (e) {

        console.log(e);
        alert("Course add failed (check DepartmentId)");

    }
}

/* ---------- DELETE ---------- */

async function deleteCourse(id) {

    if (!confirm("Delete this course?")) return;

    await fetch(API + "/" + id, {
        method: "DELETE"
    });

    loadCourses();
}

/* ---------- SEARCH ---------- */

function searchCourse(text) {

    let filtered = allCourses.filter(x =>
        x.courseName.toLowerCase().includes(text.toLowerCase())
    );

    render(filtered);
}