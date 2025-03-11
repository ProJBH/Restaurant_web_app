# Restaurant Management Web App

A dynamic restaurant management system developed as an independent project (Dec 2024 – Present) that showcases full-stack development expertise. Designed and developed with React for the frontend and Node.js/Express for the backend, this application incorporates a secure JWT-based authentication system with bcrypt.js password hashing, robust RESTful API endpoints with comprehensive error handling, and a MySQL database for data management. The responsive UI built with Bootstrap ensures seamless compatibility across various devices.

[![Project Demo video](demoVideo.png)](https://youtu.be/FC11cGu0tb4)

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Highlights](#project-highlights)
- [Project Structure Overview](#project-structure-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [TODO](#todo)

## Overview

The Restaurant Management Web App is an independent project initiated in December 2024 to address real-world challenges in restaurant operations and management. The application leverages modern web development technologies to provide an intuitive interface for restaurant staff and customers alike. With a strong focus on security and scalability, the project features secure authentication, robust RESTful APIs, and a responsive design optimized for all devices.

## Tech Stack

**Front-End:**
- **React:** For building a dynamic, interactive user interface.
- **Bootstrap:** For responsive design and pre-built UI components.

**Back-End:**
- **Node.js:** JavaScript runtime for server-side development.
- **Express.js:** Framework for building RESTful API endpoints.
- **JWT & bcrypt.js:** For secure authentication and password hashing.
- **MySQL:** Relational database for efficient data storage and retrieval.

**Tools & Practices:**
- **ESLint & Prettier:** For code quality and consistency.
- **Git & GitHub:** For version control and collaboration.

## Project Highlights

- **Full-Stack Development:** React and Bootstrap are used on the front end to achieve responsive design, and Node.js and Express are used on the back end to build a RESTful API.
- **Secure Authentication:** JWT is used for user authentication, and bcrypt.js is used to implement secure password hash storage.
- **Robust CRUD Operations:** Complete menu item management is implemented, including creating, reading, updating, and disabling menu items, supporting file uploads and instant data updates.
- **Responsive UI with Carousel:** The home page provides a carousel display of popular dishes (PopularFoodCarousel) and discounted dishes (DiscountCarousel) to optimize the user interaction experience.
- **MySQL Integration:** MySQL database is used for data storage, and Axios is used to efficiently handle front-end and back-end communications.
- **Admin Dashboard:** An admin dashboard page (AdminDashBoardPage) is provided to simplify data maintenance and business operations.
- **Interactive Components:** Provides functional components such as data table (DataTable), sidebar (Sidebar), navigation bar (Navbar) and menu detail modal box (EditModal).

## Project Structure Overview

The project is organized as follows:

- **backend**: Contains the server-side code (middleware, routes, database configuration, etc.). 
  - `middleware/` – Stores custom middleware logic (e.g., authentication).
  - `routes/` – Defines server routes or controllers (e.g., `auth.ts`, `menu.ts`).
  - `db.ts` – Database connection or queries.
  - `index.ts` – Main entry point for the server application.
  - `.env` – Environment variables (not to be committed to version control).
  - `hash_func.js` – Example of a helper function.
  - `dist/`, `node_modules/`, `public/` – Compiled output, dependencies, and any public assets for the backend.

- **frontend**: Contains the client-side code (React application).
  - `src/` – Main application source code (components, pages, styles).
    - `pages/` – Separate route-based or feature-based components.
    - `App.tsx`, `index.tsx` – React entry points.
  - `public/`, `node_modules/` – Public assets and dependencies.
  - `.gitignore` – Files/folders to be ignored by Git.
  - `package.json`, `package-lock.json` – Dependencies and scripts for the frontend.

For a detailed view of the project structure, click below:

<details>
  <summary>Detailed Project Structure</summary>

```plaintext
├── backend
│   ├── src
│   │   ├── middleware
│   │   │   └── auth.ts (JWT authentication middleware)
│   │   ├── routes
│   │   │   ├── auth.ts (Authentication routes)
│   │   │   └── menu.ts (Menu CRUD routes)
│   │   ├── db.ts (MySQL database connection)
│   │   └── index.ts (Express server main entry)
│   ├── public (Uploaded assets like images)
│   ├── .env (Environment variables)
│   ├── hash_func.js (Password hashing utility)
│   └── package.json, tsconfig.json (Dependencies & configuration)
│
└── frontend
    ├── public (Static files & images)
    ├── src
    │   ├── components (Reusable React components)
    │   │   ├── Navbar (Navigation bar with conditional login state)
    │   │   ├── Sidebar (Sidebar navigation for CRUD operations)
    │   │   ├── DataTable (Dynamic table for menu items management)
    │   │   ├── CreateForm (Form for creating new menu items, with file upload support)
    │   │   ├── EditModal (Modal form for editing or disabling menu items)
    │   │   ├── PopularFoodCarousel (Popular food items carousel with touch and swipe support)
    │   │   └── DiscountCarousel (Discounted items carousel with autoplay feature)
    │   │
    │   ├── pages (App pages managed via React Router)
    │   │   ├── HomePage.tsx (Main landing page displaying carousel components)
    │   │   ├── AdminDashBoardPage.tsx (Admin dashboard for managing CRUD operations)
    │   │   ├── LoginPage.tsx (User login page with protected route logic)
    │   │   ├── Menu.tsx (Interactive menu listing with modal item detail views)
    │   │   └── BookingPage.tsx (Table booking page)
    │   │
    │   ├── App.tsx, index.tsx (React entry points)
    │   └── styles (Global SCSS modules for consistent UI styling)
    │
    ├── package.json, tsconfig.json (Dependencies & configuration)
    └── README.md (Project documentation)
```
</details>
## Installation

### Prerequisites
- **Node.js (v14+ recommended)**
- **npm**
- **MySQL**

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ProJBH/Restaurant_web_app.git
   cd Restaurant_web_app
   ```

2. **Install Dependencies:**
   - For the **backend**:
     ```bash
     cd backend
     npm install
     ```
   - For the **frontend**:
     ```bash
     cd ../frontend
     npm install
     ```


3. **Configure Environment Variables:**
   - In the backend directory, create a `.env` file with your configurations:
     ```env
     PORT=5001
     DB_HOST=localhost
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_NAME=your_database
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the Application:**
   - Start the **backend** in development mode:
     ```bash
     cd backend
     npm run dev
     ```
   - In a separate terminal, start the **frontend**:
     ```bash
     cd frontend
     npm start
     ```

## Usage

Once the application is running:
- **Frontend:** Visit http://localhost:3000 to browse the homepage, menu page and reservation page.
-The homepage provides a carousel of popular dishes and limited-time discounts.
-The menu page supports clicking to view dish details.
-The login page provides administrator authentication to enter the backend.
- **Backend:** The API service runs on http://localhost:5001, including:
-User login and JWT verification: /api/auth/login
-Menu data CRUD interface: /api/menu
- **Admin Dashboard:**
-After logging in, visit http://localhost:3000/admin/dashboard.
-Supports adding, editing, disabling and real-time updating of menu data.
-Provides file upload (picture) function, which is automatically stored on the server after uploading and generates a URL.

## Contributing
This project is a personal portfolio piece that demonstrates my independent work and technical capabilities. While I welcome feedback and suggestions for improvement, the repository is not actively seeking external contributions at this time.

For further information or inquiries, please contact [nzbohuajia@gmail.com].

## TODO

- **CI/CD Pipelines:** Integrate automated CI/CD pipelines for continuous testing, integration, and deployment.
- **UI Enhancements:** Expand the frontend by incorporating additional custom CSS styles, high-quality images, and multimedia assets to further refine the user experience and visual appeal.
- **OrderOnline**
