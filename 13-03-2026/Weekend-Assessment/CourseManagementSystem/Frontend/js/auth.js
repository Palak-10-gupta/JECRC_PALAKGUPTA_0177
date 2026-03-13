function getUser(){
    return JSON.parse(localStorage.getItem("user"));
}

function requireLogin(){

    let user = getUser();

    if(!user){
        window.location.href = "index.html";
    }
}

function isAdmin(){
    let user = getUser();
    return user && user.role === "Admin";
}

function isStudent(){
    let user = getUser();
    return user && user.role === "Student";
}

function logout(){
    localStorage.removeItem("user");
    window.location.href = "index.html";
}