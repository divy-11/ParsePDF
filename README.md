# PDF to XML Converter

This project is a **PDF to XML Converter Web Application** that allows users to upload PDF files, converts them to structured XML format, and stores conversion history. Users need to sign up and log in to access their conversions.

## Features

- **User Authentication:** Signup, login, and JWT-based authentication (stored in HTTP-only cookies).
- **File Upload:** Users can upload PDFs for conversion.
- **PDF to XML Conversion:** Extracts text from PDFs and converts it into XML format.
- **Conversion History:** Stores user conversions, allowing them to access past results.
- **Secure API:** Uses middleware for authentication and proper error handling.

## Tech Stack

### Backend:
- **Node.js** + **Express.js** (API development)
- **MongoDB** + **Mongoose** (Database)
- **Multer** (File Upload Handling)
- **pdf-parse** (PDF Text Extraction)
- **fast-xml-parser** (JSON to XML conversion)
- **jsonwebtoken** (Authentication)

### Frontend:
- **React.js**
- **Axios** (For API calls)

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/divy-11/parsePDF.git
cd backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and configure the following:
```env
DB_URL=your_mongodb_connection_string
TOKEN_AUTH=your_jwt_secret_key
```

### 4. Run the Server
```sh
node .\index.js
```

## API Endpoints

### **Auth Routes** (`/api/user`)
- `POST /signup` → Register a new user.
- `POST /signin` → Authenticate user and set JWT in cookies.

### **Conversion Routes** (`/api/conversion`)
- `POST /convert` → Upload a PDF, convert to XML, and store the result.
- `GET /conversions/:userId` → Get all conversions for a user.
- `GET /conversion/:id` → Get a specific conversion by ID.
