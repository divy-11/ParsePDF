# PDF to XML Converter

This project is a **PDF to XML Converter Web Application** that allows users to upload PDF files, convert them to a structured XML format, and access their conversion history. Users must sign up and log in to manage their conversions securely.

## Features

- **User Authentication:** Secure signup, login, and JWT-based authentication (stored as cookies).
- **File Upload:** Users can upload PDFs for conversion.
- **PDF to XML Conversion:** Extracts text from PDFs and converts it into XML format.
- **Conversion History:** Stores user conversions, allowing retrieval of past results.
- **Secure API:** Implements authentication middleware and proper error handling.

## Technology Choices & Reasoning

### Backend:
- **Node.js** + **Express.js**: Lightweight and efficient API development.
- **MongoDB** + **Mongoose**: NoSQL database for flexible storage of conversion data.
- **Multer**: Handles file uploads efficiently.
- **pdf-parse**: Extracts text content from PDF files.
- **fast-xml-parser**: Converts extracted JSON data into structured XML format.
- **jsonwebtoken**: Provides secure authentication.

### Frontend:
- **React.js**: Enables a dynamic and interactive user experience.
- **Axios**: Facilitates smooth API communication.
- **@react-pdf-viewer** – For displaying PDFs inside the browser.

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/divy-11/parsePDF.git
cd backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
DB_URL=your_mongodb_connection_string
TOKEN_AUTH=your_jwt_secret_key
```

### 4. Start the Server
```sh
node index.js
```

## API Endpoints

### **Authentication Routes** (`/api/user`)
- `POST /signup` → Register a new user.
- `POST /login` → Authenticate user and set JWT in cookies.
- `GET /` → Fetch user details by userId.
- `PUT /` → Update user name or password (requires token).

### **Conversion Routes** (`/api/conversion`)
- `POST /convert` → Upload a PDF, convert it to XML, and store the result.
- `GET /all` → Retrieve all conversions for a user.
- `GET /:id` → Fetch a specific conversion by ID.

## Implementation Details

### Challenge Level Implemented : Level 2 (Intermediate Implementation)

### Approach to PDF-to-XML Conversion
1. **PDF Upload**: Users upload PDFs using a frontend form.
2. **Text Extraction**: The backend uses `pdf-parse` to extract textual content.
3. **JSON Transformation**: The extracted text is structured into a JSON format.
4. **XML Conversion**: The JSON structure is converted into XML using `fast-xml-parser`.
5. **Storage & Retrieval**: The conversion results are stored in MongoDB for future reference.

## Assumptions & Limitations

### Assumptions:
- The PDFs contain extractable text (i.e., not scanned images or complex layouts).
- Users require authentication to access their conversion history.
- The XML output follows a simple structure representing the extracted text hierarchy.

### Limitations:
- **No Optical Character Recognition (OCR)**: PDFs with images or scanned content are not supported.
- **Basic Text Structure**: No advanced formatting retention (tables, bold text, etc.).
- **Single File Processing**: No batch processing; each PDF is converted individually.

## Future Improvements
- **OCR Support**: Integrate tools like Tesseract.js to extract text from scanned PDFs.
- **Enhanced Formatting**: Preserve document structure, including tables and bold text.
- **Batch Conversion**: Allow users to upload and convert multiple PDFs at once.
- **Cloud Storage Integration**: Enable exporting results to Google Drive or Dropbox.
- **User Dashboard**: Improve UI for better conversion management and analytics.

---
This project provides a solid foundation for PDF-to-XML conversion with user authentication. Future enhancements will focus on improving conversion accuracy, user experience, and scalability.
