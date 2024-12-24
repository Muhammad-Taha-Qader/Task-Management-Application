# Task Management Application

## Introduction
The **Task Management Application** is designed to help users manage their tasks effectively. Built with **Next.js**, **TypeScript**, **MongoDB**, and **Tailwind CSS**, this application provides a secure, modern interface with dynamic routing, protected APIs, and token-based authentication using **JWT**.

---

## Features

### Core Features
- **Task Management**: 
  - Add, view, update, and delete tasks specific to the authenticated user.
  - Tasks are private and can only be managed by their respective users.
- **Authentication**:
  - Secure **Sign Up** and **Sign In** functionality with **JWT** for session management.
  - Passwords are hashed securely using **bcrypt**.
- **Dynamic Routing**:
  - Task-specific pages allow detailed task views using dynamic routing in Next.js.
- **Protected Routes**:
  - Both frontend and backend routes are secured.
  - A custom `useAuth` hook ensures only authenticated users can access protected frontend routes.

---
## Demo
## Demo Video

[![Watch the video](https://img.youtube.com/vi/Bnke_WnYYi8/0.jpg)](https://youtu.be/Bnke_WnYYi8)

---

## How to Use

### 1. Clone the Repository
```bash
git clone https://github.com/Muhammad-Taha-Qader/your-repo.git
cd your-repo
```

### 2. Install Dependencies
Run the following command to install all required packages:
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory with the following keys:
```env
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

### 4. Run the Development Server
Start the application locally:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### 5. Build for Production
To create a production build, run:
```bash
npm run build
```

---

## Application Workflow

### 1. Home Page
- A welcoming page with navigation links to:
  - **Task Management Dashboard**
  - **Sign Up** and **Sign In/Sign Out** pages.

### 2. User Authentication
- **Sign Up**:
  - Create a new account using your email and password.
- **Sign In**:
  - Log in to receive a JWT token for authentication.

### 3. Task Management
- Access the **Task Management Dashboard** after logging in:
  - **Create Tasks**: Add tasks with a name, description, and due date.
  - **View Tasks**: See all tasks associated with your account.
  - **Edit Tasks**: Modify existing tasks.
  - **Delete Tasks**: Remove tasks you no longer need.
- Each task is protected and linked to the authenticated user.

---

## API Endpoints

### Authentication
- **POST `/api/auth/signup`**: Register a new user.
- **POST `/api/auth/signin`**: Authenticate an existing user and return a JWT token.

### Task Management (Protected APIs)
- **POST `/api/tasks/create`**: Create a new task.
- **GET `/api/tasks/list`**: Retrieve all tasks for the authenticated user.
- **PUT `/api/tasks/update/:id`**: Update a specific task by its ID.
- **DELETE `/api/tasks/delete/:id`**: Delete a specific task by its ID.

---

## Folder Structure

```
.
├── app/
│   ├── page.tsx              # Home Page
│   ├── task/
│   │   ├── page.tsx          # Task Management Dashboard
│   │   └── [id]/
│   │       └── page.tsx      # Task Detail Page
├── components/
│   └── TaskCard.tsx          # Task Card Component
├── lib/
│   ├── db.ts                 # MongoDB Connection
│   ├── tokenHelper.ts        # TWL token Changer
│   ├── authMiddleware.ts     # Backend Protected Routes
│   └── useAuth.ts            # Custom Auth Hook for frontend Protected Routes
├── models/
│   ├── Task.ts               # Task Model
│   └── User.ts               # User Model
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup.ts     # Sign Up API
│   │   │   └── signin.ts     # Sign In API
│   │   └── tasks/
│   │       ├── create.ts     # Create Task API
│   │       ├── list.ts       # List Tasks API
│   │       ├── update/[id].ts # Update Task API
│   │       └── delete/[id].ts # Delete Task API
```
---

## Technologies Used

- **Frontend**:
  - **Next.js**
  - **TypeScript**
  - **Tailwind CSS**
- **Backend**:
  - **MongoDB**: NoSQL database for storing users and tasks.
  - **JWT**: Secure authentication mechanism for session management.
  - **bcrypt**: Password hashing for secure storage.
- **Utilities**:
  - **Middleware**: Secures APIs by verifying JWT tokens.
  - **Custom Hooks**: Implements frontend route protection.

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions, contributions, or collaborations, feel free to reach out:

- **GitHub**: [Muhammad-Taha-Qader](https://github.com/Muhammad-Taha-Qader)
- **LinkedIn**: [Muhammad Taha](https://linkedin.com/in/Muhammad-taha-07a1a0228)
