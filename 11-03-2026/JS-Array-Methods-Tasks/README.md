# 📘 JavaScript Array Methods

This repository contains practice questions based on important JavaScript array methods such as **map(), filter(), and reduce().**

These tasks are designed to simulate real-world scenarios including student grading systems, e-commerce order filtering, shopping cart calculations, and price updates.

---

## 🚀 Assignment Questions

```js


// ========================================
// Task1 – E-Commerce Price Update
// ========================================

/*
Description:
A store wants to apply a 10% discount to all products.
*/

const prices = [1200, 800, 1500, 2000];

// Requirement:
// Use map() to generate a new array with discounted prices.

// Expected Output:
// [1080, 720, 1350, 1800]



// ========================================
// Task2 – Online Order Filtering
// ========================================

/*
Description:
An e-commerce platform wants to show only orders above ₹1000.
*/

const orders = [450, 1200, 700, 3000, 1500];

// Requirement:
// Use filter() to return orders greater than 1000.

// Expected Output:
// [1200, 3000, 1500]



// ========================================
// Task3 – Shopping Cart Total
// ========================================

/*
Description:
Calculate the total value of a customer’s shopping cart.
*/

const cart = [500, 1200, 800, 1500];

// Requirement:
// Use reduce() to find the total price.

// Expected Output:
// 4000



// ========================================
// Task4 – Student Grade Processing
// ========================================

/*
Description:
A teacher wants to increase every student's mark by 5 bonus marks.
*/

const marks = [65, 70, 80, 55, 90];

// Requirement:
// Use map() to add 5 marks to each student.

// Expected Output:
// [70, 75, 85, 60, 95]



// ========================================
// Task5 – Pass Students Only
// ========================================

/*
Description:
A system must display only students who scored above 50.
*/

const marksList = [35, 67, 48, 90, 55, 30];

// Requirement:
// Use filter() to find passing students.

// Expected Output:
// [67, 90, 55]