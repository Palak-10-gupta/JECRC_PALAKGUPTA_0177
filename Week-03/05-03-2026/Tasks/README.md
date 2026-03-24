## Task-1 : E-Commerce Add to Cart Button

### Scenario

In an online shopping website, when a user clicks **Add to Cart**, the product should be added to the cart and a message displayed.

### Requirement

* Use click event
* Display product name in console
* Show message in UI

```html
<button id="addCart">Add to Cart</button>
<p id="msg"></p>

<script>
document.getElementById("addCart").addEventListener("click", function(){

    console.log("Product added to cart");

    document.getElementById("msg").innerHTML =
    "Item successfully added to cart";

});
</script>
```

## Task-2 : Login Form Keyboard Event

### Scenario

When the user presses Enter, the login form should submit.

### Requirement

Use keydown

```
<input type="text" id="username" placeholder="Enter username">

<script>

document.getElementById("username").addEventListener("keydown", function(e){

if(e.key === "Enter"){

console.log("Login attempt triggered");

alert("Submitting login form");

}

});

</script>
```

## Task-3 : Secure Banking App Right Click Disable

### Scenario

A banking application disables right-click to protect sensitive information.

### Requirement

Use contextmenu
Prevent default behavior

```id="q3req"
document.addEventListener("contextmenu", function(e){

e.preventDefault();

console.warn("Right click disabled for security");

});
```
## Task-4 : Customer Support Chat Mouse Hover

### Scenario

A chat icon shows tooltip when mouse hovers over it.

### Requirement

Use mouseover
Display message

```id="q4req"
<div id="chatIcon">💬 Chat Support</div>
<p id="info"></p>

<script>

document.getElementById("chatIcon").addEventListener("mouseover", function(){

    document.getElementById("info").innerText =
    "Click here to talk with customer support";

    console.log("Mouse hovered over chat icon");

});

</script>
```

## Task-5 : Website Double Click to Like Product

### Scenario

In many apps (Instagram, shopping apps), double-clicking a product image likes the product.

### Requirement

Use dblclick
Increase like counter

```id="q5req"
<img id="product" src="https://via.placeholder.com/200">
<p>Likes: <span id="count">0</span></p>

<script>
let likes = 0;

document.getElementById("product").addEventListener("dblclick", function(){

    likes++;

    document.getElementById("count").innerText = likes;

    console.log("Product liked", likes);

});
</script>
```

## Task-6 : Track User Login Activity

### Scenario

In a web application, developers want to log when a user logs in for monitoring purposes.

### Requirement

Capture login button click
Send log to remote server
Include username in log

```id="q6req"
<input id="username" placeholder="Enter Username">
<button onclick="login()">Login</button>

<script>
function login(){

const user = document.getElementById("username").value;

logger.log("INFO", "User Login Attempt", {username:user});

}
</script>
```

## Task-7 : Log Form Validation Errors

### Scenario

If a user submits an invalid form, developers log the issue.

### Requirement

Validate email input
Log invalid email error

```id="q7req"
function validateForm(){

const email = document.getElementById("email").value;

if(!email.includes("@")){

logger.log("WARN","Invalid Email Entered",email);

alert("Invalid email");

}

}
```

## Task-8 : Track Button Click Analytics

### Scenario

A company wants to track which buttons users click the most.

### Requirement

Track button clicks
Log user actions

```id="q8req"
<button onclick="trackClick('Buy Now')">Buy Now</button>
<button onclick="trackClick('Add Wishlist')">Add Wishlist</button>

<script>

function trackClick(action){

logger.log("INFO","User Action:",action);

}

</script>
```

## Task-9 : Monitor Page Load Performance

### Scenario

Developers track how long a page takes to load.

### Requirement

Use performance.now()
Send duration to remote logger

```id="q9req"
const start = performance.now();

window.onload = function(){

const end = performance.now();

const loadTime = end - start;

logger.log("INFO","Page Load Time:", loadTime + " ms");

}
```
