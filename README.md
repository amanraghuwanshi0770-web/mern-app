# 🛒 AR E-Commerce

A full-stack E-Commerce web application built using React.js, Node.js, Express.js, and MongoDB. The project provides an online shopping experience with user authentication, product management, cart functionality, checkout, and Razorpay test payment integration.

## 🚀 Features

- 🔐 User Registration and Login
- 👤 User Profile Management
- 🛍️ Product Listing and Product Details
- 🔎 Product Search
- 🛒 Add to Cart and Remove from Cart
- ➕ Increase and Decrease Product Quantity
- 💰 Cart Total and Price Calculation
- 📦 Checkout and Order Management
- 💳 Razorpay Test Payment Integration
- 🔒 JWT Authentication
- 🗄️ MongoDB Database
- 📱 Responsive User Interface

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

### Payment Gateway
- Razorpay Test Mode

## 📂 Project Structure

```text
AR-E-Commerce/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

*Note: Update the folder names above if your actual project structure is different.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd AR-E-Commerce
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

Add any other environment variables required by your backend code.

Start the backend server:

```bash
npm run dev
```

### 3. Setup the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown in your terminal, usually:

```text
http://localhost:5173
```

## 💳 Payment Gateway

The project uses Razorpay in test mode for payment integration.

- Create payment orders through the backend.
- Open the Razorpay checkout on the frontend.
- Verify payment signatures on the backend.
- Save order details and payment status in MongoDB.

**Important:** Use test credentials during development. Never expose your Razorpay secret key or JWT secret in frontend code or commit your `.env` file to GitHub.

## 🗄️ Database

MongoDB is used to store application data, including:

- User accounts
- Product details
- Product images
- Stock information
- Orders and payment status

## 🔐 Security

- Password hashing with bcryptjs
- JWT-based authentication
- Protected backend routes
- Server-side payment signature verification
- Environment variables for secret credentials

## 📸 Screenshots

Add screenshots of your project here to showcase the user interface.

```text
screenshots/
├── home.png
├── products.png
├── cart.png
├── profile.png
└── checkout.png
```

## 🎯 Project Goal

The goal of AR E-Commerce is to build a full-stack online shopping application and gain practical experience with React, REST APIs, authentication, database management, order processing, and payment gateway integration.

## 👨‍💻 Developer

**Aman Raghuwanshi**

GitHub: [amanraghuwanshi0770-web](https://github.com/amanraghuwanshi0770-web)

---

⭐ If you like this project, consider giving it a star on GitHub!
