# JavaScript Arrow Function Event Handling Tasks

This repository contains solutions for JavaScript event handling tasks using **Arrow Functions**.

---

# Task 1  
## Button Click Event using Arrow Function 

### Scenario  
When the user clicks the Login button, a message should appear indicating that the login process has started.

### Requirement  
Use addEventListener  

Use Arrow Function  

Display a message in console and alert  

### HTML
```
<button id="loginBtn">Login</button>
```

### JavaScript
```
document.getElementById("loginBtn").addEventListener("click", (e) => {

console.log("Login button clicked");

alert("Login process started");

});
```

---

# Task 2  
## Search Input Keyboard Event using Arrow Function

### Scenario  
When the user presses Enter inside the search box, a search should be triggered.

### Requirement  
Use keydown  

Use Arrow Function  

Detect Enter key  

### HTML
```
<input type="text" id="searchBox" placeholder="Search product">
```

### JavaScript
```
document.getElementById("searchBox").addEventListener("keydown", (e) => {

if(e.key === "Enter"){

console.log("Search triggered");

alert("Searching product...");

}

});
```

---

# Task 3  
## Button Hover Event using Arrow Function 

### Scenario  
When the user moves the mouse over the Submit button, a message should appear.

### Requirement  
Use mouseover  

Use Arrow Function  

### HTML
```
<button id="submitBtn">Submit</button>
```

### JavaScript
```
document.getElementById("submitBtn").addEventListener("mouseover", () => {

console.log("Mouse hovered over submit button");

});
```

---

# Task 4  
## Input Character Counter

### Scenario  
When a user types inside a textarea, the system should display the number of characters typed.

### Requirement  
Use keyup  

Use Arrow Function  

Update character count dynamically  

### HTML
```
<textarea id="message"></textarea>

<p id="count">Characters: 0</p>
```

### JavaScript
```
document.getElementById("message").addEventListener("keyup", (e) => {

let length = e.target.value.length;

document.getElementById("count").innerText = "Characters: " + length;

});
```

---

# Task 5  
## Dark Mode Toggle Button

### Scenario  
When the user clicks the Dark Mode button, the background color should change.

### Requirement  
Use Arrow Function  

Modify CSS using JavaScript  

### HTML
```
<button id="darkMode">Toggle Dark Mode</button>
```

### JavaScript
```
document.getElementById("darkMode").addEventListener("click", () => {

document.body.classList.toggle("dark");

});
```

### CSS
```
.dark{
background:black;
color:white;
}
```

---

# Technologies Used

- HTML  
- CSS  
- JavaScript  
- DOM Events  
- Arrow Functions  

---