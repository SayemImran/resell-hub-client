# Resell Hub 🔄

Resell Hub is a modern, full-stack marketplace platform designed for buying, selling, and growing community commerce. The application features a responsive design, real-time analytics, user-friendly search and filtering systems, safe payment handling, and custom user/admin dashboard boundaries.

---

## 🛠️ Technology Stack

### Core Frameworks & Runtime
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![ExpressJS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

### Database & Authentication
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![BetterAuth](https://img.shields.io/badge/Better--Auth-FF5733?style=for-the-badge&logo=auth0&logoColor=white)

### Payment Infrastructure
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

### UI Components, Data & Styling
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22c55e?style=for-the-badge&logo=chartdotjs&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)

---

## 🚀 Key Features

* **Dynamic Product Discovery:** Multi-tiered text search, custom category filtering, and price sorting utilizing optimized React state operations.
* **Role-Based Dashboards:** Isolated layouts and protected view scopes tailored for Buyers, Sellers, and Platform Administrators.
* **Secure Authentication:** Powered by a robust session management architecture with modular database syncing.
* **Interactive Admin Analytics:** Comprehensive telemetry summaries featuring interactive donut graphs for product inventory distribution and real-time order feeds.
* **Safe Payment Infrastructure:** Integrated transaction checkout flows for securing digital order requests.

---

## 📦 Full Dependency Breakdown

### Frontend & Client Architecture
* **Next.js** (App Router framework)
* **React** & **React DOM**
* **Better Auth** & **Better Auth Mongo Adapter** (Secure Session Engine)
* **Framer Motion** (Fluid UI animations)
* **React Hook Form** (Optimized form management)
* **Recharts** (Interactive data visualization graphs)
* **Sonner** (Toast notification popups)
* **Stripe JS** (Client payment hooks)

### UI Components & Styling Icons
* **HeroUI React** & **HeroUI Styles**
* **Gravity UI Icons**
* **Lucide React**
* **React Icons**

### Backend & Database Layer
* **ExpressJS** (REST API microservice controller router)
* **MongoDB** & **MongoDB Native Driver** (NoSQL Document Store)
* **Stripe Node SDK** (Server-side payment processing)
* **CORS** (Cross-origin configuration handler)

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root of your directory and supply the following core values:

```env
# Client Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication Keys
BETTER_AUTH_SECRET=your_auth_fallback_secret_key
MONGODB_URI=your_mongodb_atlas_connection_string

# Stripe Payments API
STRIPE_SECRET_KEY=your_stripe_back_end_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_front_end_publishable_key
```

## live site : https://resell-hub-bd.vercel.app/