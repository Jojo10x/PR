# Pamasola Resources Product Management Application

The proposed IT solution aims to develop a comprehensive product management application for Pamasola Resources, facilitating the comparison, addition, and management of sustainable energy products. Key components of the solution include a front-end built with React, a back-end developed using Node.js and Express, and a MongoDB database for data storage. The application will feature user-friendly interfaces for product comparison and management while ensuring robust performance and security.

## Development

### High-Level Architecture

The architecture comprises the following components:

1. **Front-End**: React application to deliver a responsive user interface, allowing users to view, compare, and add products.
2. **Back-End**: Node.js and Express to handle API requests, manage product data, and interact with the database.
3. **Database**: MongoDB for efficient data storage and retrieval of product information.

### Technologies Used

* **Front-End**: React, Axios for API calls, and Tailwind CSS for styling.
* **Back-End**: Node.js, Express.js for server setup, and Mongoose for MongoDB object modeling.
* **Database**: MongoDB to store product details securely.

## Security Measures

To ensure data security and integrity, the following measures will be implemented:

1. **Data Validation**: Validate user inputs on both the client and server sides to prevent malicious data entries.
2. **CORS**: Implement Cross-Origin Resource Sharing (CORS) to control access to the API from allowed origins.
3. **HTTPS**: Use HTTPS for secure data transmission between the client and server.
4. **Environment Variables**: Store sensitive data (e.g., database credentials) in environment variables to keep them out of the codebase.
5. **File Upload Security**: Limit file upload types and validate files to prevent unwanted files from being stored on the server.

## Sustainability

To align with Pamasola Resources' objective of promoting sustainable energy solutions, the application will:

1. **Support Green Technologies**: Focus on showcasing and promoting products that are environmentally friendly and sustainable.
2. **Efficient Data Management**: Utilize efficient database practices to minimize server load and optimize resource usage.
3. **User Education**: Include information and resources on sustainable energy practices within the application to inform and engage users.

This solution will enhance Pamasola Resources' operational efficiency and customer engagement while aligning with sustainable practices.

Running the Application Client-Side (Development Build) To start the frontend React application in development mode:

cd client npm run dev Server-Side (Development Build) To start the Node.js backend server:

cd server npm run dev

Deployment The application is hosted on Render, providing a scalable and reliable environment for both the frontend and backend. MongoDB is used for managing persistent data such as user search history.

to access admin page: /addproducts 
login: admin
password: admin

Live site: 