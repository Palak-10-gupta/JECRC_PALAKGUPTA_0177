# JavaScript Array Methods Tasks

This repository contains practice questions based on important JavaScript array methods:

- map()
- filter()
- reduce()

These tasks simulate real-world scenarios like e-commerce filtering, cart calculation, and student grading systems.

---

# Task 1  
## E-Commerce Price Update

### Description  
A store wants to apply a 10% discount to all products.

### JavaScript
```
const prices = [1200, 800, 1500, 2000];

const discountedPrices = prices.map(price => price * 0.9);

console.log(discountedPrices);
```

### Expected Output
```
[1080, 720, 1350, 1800]
```

---

# Task 2  
## Online Order Filtering

### Description  
Show only orders greater than ₹1000.

### JavaScript
```
const orders = [450, 1200, 700, 3000, 1500];

const filteredOrders = orders.filter(order => order > 1000);

console.log(filteredOrders);
```

### Expected Output
```
[1200, 3000, 1500]
```

---

# Task 3  
## Shopping Cart Total

### Description  
Calculate total cart value.

### JavaScript
```
const cart = [500, 1200, 800, 1500];

const total = cart.reduce((sum, item) => sum + item, 0);

console.log(total);
```

### Expected Output
```
4000
```

---

# Task 4  
## Student Grade Processing

### Description  
Add 5 bonus marks to each student.

### JavaScript
```
const marks = [65, 70, 80, 55, 90];

const updatedMarks = marks.map(mark => mark + 5);

console.log(updatedMarks);
```

### Expected Output
```
[70, 75, 85, 60, 95]
```

---

# Task 5  
## Pass Students Only

### Description  
Display students who scored above 50.

### JavaScript
```
const marksList = [35, 67, 48, 90, 55, 30];

const passing = marksList.filter(mark => mark > 50);

console.log(passing);
```

### Expected Output
```
[67, 90, 55]
```

---

# Technologies Used

- JavaScript  
- Array Methods  
- Functional Programming Concepts  

---

# Author

Palak Gupta
