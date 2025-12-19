# 🛒 ProShop E-commerce API

A professional, fully-featured RESTful API for an E-commerce platform built with Node.js, Express, and MongoDB. This backend handles user authentication, product management, order processing, payment simulation, and media uploads.

## 🚀 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **Authentication:** JWT (JSON Web Tokens)
* **File Handling:** Multer (Image Uploads)
* **Security:** Bcryptjs (Password Hashing)

---

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd ecommerce-api
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```

4.  **Create Uploads Folder**
    Manually create a folder named `uploads` in the root directory to store images.

5.  **Run the Server**
    ```bash
    # Development Mode (using Nodemon)
    npm run dev

    # Production Mode
    npm start
    ```

---

## 📡 API Endpoints

### 👤 Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Login user & get Token | Public |
| POST | `/logout` | Logout user (Clear cookie/token) | Public |

### 📦 Products (`/api/v1/products`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/` | Fetch all products | Public |
| GET | `/:id` | Fetch single product by ID | Public |
| POST | `/` | Create a new product | Admin |
| PUT | `/:id` | Update a product | Admin |
| DELETE | `/:id` | Delete a product | Admin |

### 🛒 Orders (`/api/v1/orders`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/` | Create a new order | User |
| GET | `/myorders` | Get logged-in user's orders | User |
| GET | `/:id` | Get order details by ID | User/Admin |
| PUT | `/:id/pay` | Update order to Paid | User/Admin |
| PUT | `/:id/deliver` | Update order to Delivered | Admin |
| GET | `/` | Get ALL orders (Dashboard) | Admin |

### 📸 Uploads (`/api/v1/upload`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/` | Upload an image file (jpg/png) | Public |

---

## 📂 Project Structure