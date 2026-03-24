function togglePassword(){
    let pwd = document.getElementById("password");
    pwd.type = pwd.type === "password" ? "text" : "password";
}

async function login(){

    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let role = document.getElementById("role");
    let error = document.getElementById("error");

    error.innerText = "";

    // validation
    if(
        email.value.trim() === "" ||
        password.value.trim() === "" ||
        role.value === ""
    ){
        error.innerText = "All fields are required";
        return;
    }

    let response = await fetch(BASE_URL + "/Auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
            role: role.value        // ⭐ VERY IMPORTANT
        })
    });

    if(response.ok){

        let data = await response.json();

        localStorage.setItem("user", JSON.stringify(data));

        window.location.href = "dashboard.html";   // ⭐ because dashboard is inside pages
    }
    else{
        error.innerText = "Invalid email / password / role";
    }
}