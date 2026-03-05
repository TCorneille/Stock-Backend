

A production-ready backend system for handling  product with concurrency control, atomic reservations, expiration handling, and checkout processing.

---

System Goals

* Prevent overselling
* Handle high concurrency
* Automatically expire reservations
* Maintain clean architecture
* Support observability & debugging
* Be production deployable (Render / Railway / AWS)

---

## 🏗 Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB Atlas
* Mongoose
  

---
 📁 Project Structure

```
src/
│
├── controllers/
│   ├── productController.ts
│   ├── reservationController.ts
│   └── checkoutController.ts
│
├── services/
│   ├── reservationService.ts
│   └── checkoutService.ts
│
├── models/
│   ├── Product.ts
│   ├── Reservation.ts
│   └── Order.ts
│
├── routes/
│   ├── productRoutes.ts
│   ├── reservationRoutes.ts
│   └── checkoutRoutes.ts
│
├── middlewares/
│   └── errorHandler.ts
│
├── config/
│   └── db.ts
│
└── server.ts
```

---

## 🔐 Core Features
 1️⃣ Product Drop

* Single limited product endpoint
* Real-time stock updates

2️⃣ Reservation System

* Atomic MongoDB transaction
* Stock decrement happens safely
* Reservation expires automatically (5 minutes)
 3️⃣ Checkout

* Converts reservation to order
* Prevents duplicate checkout
* Ensures reservation validity

 4️⃣ Concurrency Handling

* MongoDB transaction sessions
* Prevents race conditions
* Ensures stock integrity

---

 ⚙️ Environment Variables

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongo_atlas_connection_string
```

---
🛠 Installation

```bash
npm install
```

---

## 🧪 Run Locally

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

---

## 
🌐 API EndpointsProduct

```
GET /api/products/
```

 Reserve Product

```
POST /api/reserve
```
 Checkout Reservation

```
POST /api/checkout
```

 Get All Orders

```
GET /api/orders
```

---
 Concurrency Strategy

* Uses MongoDB transactions
* Stock is decremented only inside transaction
* Rollback occurs automatically on failure
* Handles 100+ simultaneous users safely

---

## 🚀 Deployment Notes (Render)

* Must use `process.env.PORT`
* MongoDB Atlas must be Replica Set
* Build command: `npm run build`
* Start command: `node dist/server.js`

---

## 🧩 Architecture Principles

* Controller → Service → Model separation
* No business logic inside controllers
* Strict TypeScript (no `any`)
* Centralized error handling
* Clean scalable structure

---


