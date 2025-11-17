# CLUSTREX Full-Stack Developer Assignment

This project is a full-stack web application built using **ReactJS**, **Flask**, **PostgreSQL**, **JWT Authentication**, and **Google Login**.  
The system maintains a **single, shared product database**, where all users can **view, create, update, and delete** products.

The application demonstrates:

- A centralized product database
- Shared CRUD operations across all users
- Protected APIs using JWT authentication
- Google Login + Normal login support
- External API integration (DummyJSON carts)
- Analytics generated from the entire product dataset


All data operations (Create, Read, Update, Delete) directly affect the **same product table**, ensuring consistency across all user sessions.


## 1. Authentication

Implement two authentication methods:

- **Username & Password Login**
- **Google SSO Login**

After successful login, the user must receive a **JWT token** to access protected backend APIs.

---

## 2. External API Integration

Fetch data from: https://dummyjson.com/carts


Store the relevant cart/product data into **PostgreSQL**.

---

## 3. Analytics API

Create an API that returns:

- Total amount **before discount**
- Total amount **after discount**
- Average discount percentage
- Most expensive product
- Cheapest product
- Product with the highest discount
- Total quantity of products
- Number of unique products

---

## 4. CRUD Operations (JWT Protected)

Implement JWT-secured CRUD operations:

- Create product
- Get all products
- Get product by ID
- Update product
- Delete product

---

## 5. Frontend Requirements (ReactJS)

Build the following pages:

### 🔐 Google Login Page
### 🏠 Dashboard
- Load external API data  
- Display analytics  

### 📦 Product Management Page
- Create / Edit / Delete products  

---

## 6. Deliverables

Provide a GitHub repository containing:

- **Frontend** (React)
- **Backend** (Flask)
- **PostgreSQL setup / schema**
- **README** with:
  - Setup instructions  
  - Environment variables  
  - API documentation  
  - How to run frontend + backend  

---
---

## 📸 Screenshots

### 🔐 Login Page
<img width="1905" height="929" alt="image" src="https://github.com/user-attachments/assets/b85844e3-ade4-48bb-8b5e-968f8289ba12" />


### 🏠 Dashboard
<img width="1875" height="929" alt="image" src="https://github.com/user-attachments/assets/e7f83444-2ea2-44a8-898a-ec815a7dc297" />

### 📦 Product Creation
<img width="1836" height="847" alt="image" src="https://github.com/user-attachments/assets/06c806f8-eb41-4e91-af0f-cbb2a9898169" />


### 📊 Analytics View
<img width="1865" height="850" alt="image" src="https://github.com/user-attachments/assets/f72891d1-11d0-4cc2-b2b7-5462e61deab7" />

---



