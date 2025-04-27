

# eduLearn - Learning Management System

<div align="center">
  <img alt="eduLearn Logo" src="https://via.placeholder.com/800x200/0d6efd/FFFFFF?text=eduLearn">
</div>

---

## 📚 Overview

**eduLearn** is a comprehensive Learning Management System (LMS) designed to facilitate online education with powerful features for students, tutors, and administrators.  
It provides course management, user administration, detailed reporting, and secure payment processing — building a complete educational ecosystem.

---

## ✨ Features

### 🎓 For Students
- **Course Enrollment** — Browse and enroll in courses with intuitive filtering
- **Learning Dashboard** — Track progress and access course materials
- **Profile Management** — Customize your profile with personal information and image
- **Certificate Generation** — Earn certificates after completing courses

### 🧑‍🏫 For Tutors
- **Course Creation and Management** — Create, edit, and manage course content
- **Student Progress Tracking** — Monitor student engagement and performance
- **Teaching Profile** — Showcase qualifications and specializations
- **Course Analytics** — View detailed course performance reports

### 🛠️ For Administrators
- **Comprehensive User Management** — Manage students, tutors, and admins
- **Advanced Reporting** — Generate detailed reports on enrollments, revenue, and activity
- **System Configuration** — Manage platform settings and permissions
- **Financial Management** — Track payments and revenue streams

---

## 🛠️ Technology Stack

### Frontend
- **React.js** — UI library
- **Tailwind CSS** — Utility-first CSS framework
- **Chart.js** — Data visualization
- **React Router** — Navigation and routing
- **Axios** — API requests
- **React Hot Toast** — Notification system

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web application framework
- **MongoDB** — NoSQL database
- **JWT** — Authentication and authorization
- **Multer** — File uploads
- **Razorpay** — Payment processing

### DevOps & Tools
- **Firebase** — Storage and cloud functions
- **Git** — Version control
- **Vite** — Build tool and development server

---

## 📋 Prerequisites

Ensure you have the following installed:

- **Node.js** (v16.x or higher)
- **MongoDB** (local or Atlas)
- **Git**
- **npm** or **yarn**

---

## 🚀 Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/TechWithAkash/eduLearn.git
cd eduLearn
```

### Server Setup

```bash
cd server
npm install
cp .env.example .env  # Create environment file
npm run dev
```

### Client Setup

```bash
cd ../client
npm install
npm run dev
```

---

## ⚙️ Environment Configuration

Create a `.env` file inside the `server/` directory with the following variables:

```bash
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRE=7d

# Admin Bootstrap
ADMIN_NAME=System Administrator
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=StrongAdminPassword

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Firebase Configuration (Optional)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_STORAGE_BUCKET=your_storage_bucket
```

---

## 📱 Usage

### Default Admin Login

After setup, access the Admin Panel:

- **URL:** http://localhost:5173/login
- **Email:** `admin@example.com`
- **Password:** `StrongAdminPassword`

### Key User Journeys

- **Admin:** Manage users, view reports, configure system settings
- **Tutor:** Create courses, add content, monitor student progress
- **Student:** Browse courses, enroll, complete lessons, and earn certificates

---

## 📷 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/400x225/0d6efd/FFFFFF?text=Dashboard" alt="Dashboard" width="45%">
  <img src="https://via.placeholder.com/400x225/0d6efd/FFFFFF?text=Course+Listing" alt="Course Listing" width="45%">
  <img src="https://via.placeholder.com/400x225/0d6efd/FFFFFF?text=User+Management" alt="User Management" width="45%">
  <img src="https://via.placeholder.com/400x225/0d6efd/FFFFFF?text=Reports" alt="Reports" width="45%">
</div>

---

## 🔌 API Endpoints

eduLearn provides a full REST API:

### Authentication
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — User login
- `GET /api/auth/me` — Get current user info
- `PUT /api/auth/change-password` — Change password

### Users
- `GET /api/users` — Get all users (Admin)
- `GET /api/users/:id` — Get user by ID
- `PUT /api/users/:id` — Update user info
- `DELETE /api/users/:id` — Delete user

### Courses
- `GET /api/courses` — Get all courses
- `POST /api/courses` — Create a course
- `GET /api/courses/:id` — Get course details
- `PUT /api/courses/:id` — Update a course
- `DELETE /api/courses/:id` — Delete a course

### Enrollments
- `POST /api/enrollments` — Enroll in a course
- `GET /api/enrollments/me` — View personal enrollments
- `GET /api/courses/:id/students` — View students in a course

### Reports
- `GET /api/reports/enrollment` — Enrollment reports
- `GET /api/reports/revenue` — Revenue reports
- `GET /api/reports/users` — User registration reports

---

## 🤝 Contributing

We welcome contributions!  
Here's how:

```bash
# 1. Fork the repository
# 2. Create a new feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m 'Add some AmazingFeature'

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Akash Vishwakarma**

- GitHub: [TechWithAkash](https://github.com/TechWithAkash)

---

## 🙏 Acknowledgements

Special thanks to:

- React.js
- Tailwind CSS
- Express.js
- MongoDB
- Chart.js
- Razorpay

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/TechWithAkash">Akash Vishwakarma</a>
</p>

