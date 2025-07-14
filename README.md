# 🏟️ CourtNest — Court Booking Web App

## 🚀 Live Project Link
[![Live Demo](https://img.shields.io/badge/Live%20Demo-%20-%2300C853?style=for-the-badge&logo=appveyor)](https://courtnest.netlify.app/)

---

## 📌 Project Overview

**CourtNest** is a role-based court booking application that allows users to register, browse courts, book sessions, make payments via Stripe, and apply discount coupons. It includes a dynamic dashboard experience tailored for users, members, and administrators. The platform ensures secure access, efficient booking, and streamlined court management.

---

## 👤 Admin Access

To access the Admin Dashboard:

- **Email:** `admin@gmail.com`  
- **Password:** `123456`

*(Change these before deploying to production)*

---

## 🖼️ Project Banner

![CourtNest Banner](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-saidebinsabid/blob/main/courtnest.png)

---

## 🌟 Key Features

1. 🔐 **Secure Stripe Payment Integration**  
2. 🏷️ **Coupon System to Reduce Total Booking Price**  
3. 🧭 **Search Courts by Sport Category (e.g., Tennis, Squash)**  
4. 📅 **Display Recent Events Sorted by Date**  
5. 🧑‍💼 **Role-Based Dashboards for Users, Members & Admins**  
6. 📊 **Dynamic Admin Statistics (User Count, Member Count, Total Courts)**  
7. 📦 **Court Booking with Slot & Date Selection**  
8. 🧾 **Booking Lifecycle (Pending → Approved → Paid → Confirmed)**  
9. 🔄 **Toggle Payment History Between Table and Card View**  
10. 📍 **Location Display Using Leaflet Maps**

---

## 🧩 Client-Side Folder Structure

```bash
courtnest-client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── firebase/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   │   └── Dashboard/
│   ├── provider/
│   ├── router/
│   ├── routes/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
├── .env.local
├── index.html
├── package.json
├── vite.config.js

```

## 🧪 Challenges Faced

- Implemented **JWT authentication** and securely stored tokens in browser cookies.
- Created a **reusable Axios interceptor** to manage authenticated API requests.
- Managed **role-based routing** and protected layouts for different user types (User, Member, Admin).
- Built a responsive **toggle view system** to switch between **card** and **table layouts** in the payment history section.
- Integrated and tested **Stripe payment gateway**, including logic for applying discount **coupon codes**.

---

## 🛠 Tech Stack

### 💻 Frontend

- **React** `^19.1.0`
- **React Router DOM** `^7.6.3`
- **Tailwind CSS** + **DaisyUI**
- **TanStack React Query**
- **Axios**
- **React Hook Form**
- **Firebase**
- **Stripe** (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
- **React Icons**
- **AOS** (Animate On Scroll)
- **Lottie React**
- **Leaflet** & **React Leaflet**
- **SweetAlert2**

---

### 🌐 Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Stripe**
- **dotenv**
- **cookie-parser**
- **Stripe**
- **jsonwebtoken**
- **CORS**
---

## 🚀 How to Run Locally

```bash
# Clone the project
git clone https://github.com/yourusername/courtnest-client.git
cd courtnest-client

# Install dependencies
npm install

# Create environment file
touch .env.local

# Run the development server
npm run dev
```

---

## 🙌 Thank You for Visiting CourtNest!

Thank you for exploring **CourtNest** — a complete court booking platform tailored for clubs and players. I hope this project showcases my dedication to clean architecture, user experience, and full-stack development.

If you have any questions, feedback, or collaboration ideas —  
**feel free to reach out!**

📧 **Email:** ssaidebin1@gmail.com

---