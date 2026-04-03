# 🌍 LinguaX – Multilingual React App

## 🚀 Overview

LinguaX is a modern multilingual web application built using **React** and the **Context API**. It enables users to switch between multiple languages instantly, with all UI content updating dynamically without reloading the page.

This project demonstrates how Context API can be used effectively for **language/localization (i18n)** in a clean and scalable way.

---

## ✨ Features

* 🌐 Supports **7 Languages**

  * English
  * Hindi
  * French
  * Japanese
  * Spanish
  * Tamil
  * Kannada

* ⚡ Instant language switching

* 🔄 Dynamic UI updates

* 🧠 Global state management using Context API

* 🎨 Modern UI design

* 📱 Responsive layout

* 🔽 Language dropdown selector

---

## 🧠 Concept Used

### React Context API for Localization

This project uses **React Context API** to manage language globally across the application.

### ✔ Why Context API?

* Eliminates prop drilling
* Centralized state management
* Easy scalability
* Cleaner architecture

### 🔄 Flow:

1. Language is stored in Context
2. Components consume context
3. On language change → UI updates automatically

---

## 📁 Project Structure

```
language-app/
│
├── public/
├── src/
│   ├── components/
│   │   ├── LanguageSwitcher.js
│   │   └── Navbar.js
│   │
│   ├── context/
│   │   └── LanguageContext.js
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   └── Contact.js
│   │
│   ├── translations/
│   │   └── translations.js
│   │
│   ├── App.js
│   └── index.js
│
├── package.json
└── README.md
```

---

## ⚙️ How It Works

### 1️⃣ Language Context

* Stores selected language
* Provides `language` and `setLanguage`

### 2️⃣ Translations File

* Contains all text in multiple languages
* Structured as key-value pairs

### 3️⃣ Language Switcher

* Dropdown UI for selecting language
* Updates global context

### 4️⃣ Components

* Access translations via context
* Automatically re-render when language changes

---

## 🖥️ UI Highlights

* 🎯 Hero section with dynamic text
* 🌈 Gradient typography (Borders text)
* 🔘 Language badges
* 📊 Stats section (Languages, Speed, Dynamic updates)

---

## 🛠️ Installation & Setup

# Navigate to folder
cd linguax

# Install dependencies
npm install

# Start development server
npm start
```

---

## 📦 Dependencies

* React
* React DOM
* React Scripts

---

## 💡 Key Learnings

* Practical implementation of Context API
* Managing global state efficiently
* Building scalable multilingual applications
* Improving UI/UX with dynamic content
