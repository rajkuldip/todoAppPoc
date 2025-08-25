# Westpac Todo App (POC)

A simple **Todo App** built with **React**, **TypeScript**, **Vite**, **Styled-Components**, **React Query**, and **React Hook Form**. This is a **proof of concept (POC)** demonstrating modern React practices, including state management, API integration, form handling, and accessibility.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)

---

## Features

- Add, read, and remove todos.
- Mark todos as **read/completed**.
- Stores todos in **localStorage** for persistence.
- Fetches initial tasks from a API using **React Query**.
- Form validation using **React Hook Form**.
- Styled with **Styled-Components**.
- Responsive layout for desktop and mobile.

---

## Tech Stack

- **React** (v18+)
- **TypeScript**
- **Vite** (fast build and dev environment)
- **Styled-Components** (CSS-in-JS)
- **React Query** (data fetching & caching)
- **React Hook Form** (form handling)
- **Icons**: `react-icons` (FaEnvelope, FaEnvelopeOpen, FiTrash2)

---

## Getting Started

```bash
// Clone the repo
git clone https://github.com/username/westpac-todo-app.git

// Go to project folder
cd westpac-todo-app

// Install dependecies
npm install

// Start the dev server
npm run dev

```


## Scripts

### Run Dev Server
"dev": "vite"

### Build
"build": "tsc -b && vite build"

### Check linting
"lint": "eslint ."

### Vite Preview
"preview": "vite preview"

### Run tests
"test": "vitest"