# Expense Tracker

#### Video Demo: [https://example.com/your-video-demo](https://example.com/your-video-demo)

#### Description:

The **Expense Tracker** project is a responsive and interactive web application that allows users to track their income and expenses, visualize financial summaries, and manage transactions efficiently. It was built using **HTML**, **CSS**, and **JavaScript**, with additional libraries like **Chart.js** for visual charts and **XLSX.js** for Excel file import/export functionality. The project focuses on simplicity, modern design, and usability, providing a complete experience for users to monitor and control their finances.

This project was created as part of a web development assignment and demonstrates proficiency in DOM manipulation, data persistence through **localStorage**, event handling, and UI/UX design. It runs entirely on the client side, requiring no external backend server, making it lightweight and easy to deploy.

---

## 🧩 Features

* Add, view, and delete transactions.
* Separate tracking for **Income** and **Expenses**.
* Category selection (Salary, Food, Transport, Entertainment, etc.).
* **Automatic total balance, income, and expense calculation**.
* **Doughnut chart** visualization of income vs. expenses using Chart.js.
* **Export data** to Excel format.
* **Import data** from Excel files to restore previous transactions.
* **Search bar** to filter transactions dynamically.
* **Dark mode toggle** for better accessibility.
* Persistent data using **localStorage**, even after reloading the page.
* Responsive design compatible with both desktop and mobile screens.

---

## 📁 Project Structure and File Descriptions

### 1. `index.html`

This file provides the main structure and layout of the application. It includes:

* Header section with the project logo and control buttons (Export, Import, Reset, Dark Mode).
* Dashboard area displaying **Total Balance**, **Total Income**, and **Total Expenses**.
* **Transaction Form** for adding income or expense records.
* **Recent Transactions List** that dynamically updates as transactions are added or deleted.
* Footer section with project credits.

External libraries included:

* **Font Awesome** for icons.
* **Chart.js** for graphical charts.
* **XLSX.js** for Excel export/import functionality.

### 2. `style.css`

This file defines the visual appearance of the app and includes:

* A clean, modern UI with gradients, shadows, and rounded card layouts.
* **CSS variables** for consistent theming and easier customization.
* A **dark mode** that toggles background, text, and card colors for night-time readability.
* Responsive design with flexible grid layouts and media queries.
* Interactive styles for hover effects and transitions.

Color scheme:

* Primary: Green shades for growth and finance symbolism.
* Accent: Red for expenses and warnings.
* Neutral: White and gray for readability and minimalism.

### 3. `script.js`

The core functionality and logic of the app are implemented here using vanilla JavaScript.
Key features include:

#### a. **Data Handling and Persistence**

* Uses `localStorage` to store all transactions locally on the browser.
* Automatically loads previous data on startup.

#### b. **Transaction Management**

* Users can add income or expense records with details like title, amount, date, and category.
* Each transaction is assigned a unique ID for easy manipulation.
* Transactions can be deleted individually.

#### c. **Summary and Chart Updates**

* Calculates and updates total balance, total income, and total expenses in real time.
* Dynamically updates a **doughnut chart** using Chart.js whenever a transaction is added or removed.

#### d. **Search and Filtering**

* Implements live search to instantly filter transactions by title.

#### e. **Excel Import and Export**

* Allows exporting all transactions to an Excel file.
* Supports importing Excel files back into the app for continuity.

#### f. **Dark Mode**

* A simple toggle button switches between light and dark themes.

---

## ⚙️ Design Choices

1. **Front-End Only Application:**
   The decision to use only HTML, CSS, and JavaScript was made to ensure simplicity and portability. Since localStorage suffices for small-scale financial tracking, no backend was required.

2. **Chart Visualization:**
   Chart.js was chosen for its simplicity and aesthetic appeal, helping visualize income vs. expenses quickly.

3. **Data Portability:**
   The integration of XLSX.js ensures that users can easily export or import their data, providing flexibility and reliability.

4. **Dark Mode Implementation:**
   The dark mode toggle enhances accessibility, ensuring that the app can be comfortably used in low-light conditions.

5. **Responsive Layout:**
   The grid-based design ensures that the app adapts seamlessly across devices, from mobile phones to large screens.

---

## 🚀 How to Run

1. Download or clone the repository.
2. Ensure all three files (`index.html`, `style.css`, `script.js`) are in the same folder.
3. Open the `index.html` file in any modern web browser (Chrome, Edge, or Firefox).
4. Start adding your income and expense records!

No additional installations are required since all functionality runs in the browser.

