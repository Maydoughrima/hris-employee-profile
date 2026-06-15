# Employee Profile Module for HRIS

A front-end only employee profile management module built using **Next.js (React)** and **Tailwind CSS**.

---

##  Installation and Setup

### 1. Install dependencies
```bash
npm install
````

### 2. Install required packages

```bash
npm install react-icons
```

### 3. Run development server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:3000
```

---

##  State Management Approach

This project uses React's built-in `useState` and `useEffect` hooks for state management.

### States used:

* `image` → stores profile image as Base64 string
* `contacts` → array of emergency contact objects
* `errors` → stores validation errors per contact ID

---

### Why this approach?

* Suitable for small to medium single-page applications (ideal for this project since it is a single-page module)
* Keeps logic simple, component-driven, and easy to maintain
* No need for external state management libraries

---

## ✅ Validation Handling Strategy

### File Upload Validation

* Allowed file types are: `image/png`, `image/jpeg`
* Maximum file size is: 2MB
* Immediate UI feedback for invalid uploads

---

### Emergency Contact Validation

* Triggered on input change
* Each contact is validated individually
* Errors are stored per contact ID for precise control

---

##  Persistence Approach

* Uses `localStorage` for data persistence
* Stores:

  * Profile image (Base64 string format)
  * Emergency contacts array
* Data is automatically loaded on component mount using `useEffect`


