# Dough Divine Pizza App

![Dough Divine Pizza App](https://github.com/WhiteShadow11z1/Dough-Divine/raw/main/assets/logo.png)

The **Dough Divine Pizza App** is a web application built using the MERN (MongoDB, Express, React, Node.js) stack. It provides users with a platform to customize and order pizzas with various bases, toppings, and cheese options. Additionally, the app includes an admin inventory system that facilitates managing stock levels, low-stock notifications via email, and restocking options for individual items.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Dashboard](#admin-dashboard)
- [Low Stock Email Notifications](#low-stock-email-notifications)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration and Authentication**: Users can create accounts, log in, and maintain personalized profiles.
- **Pizza Customization**: Users can choose from different pizza bases, toppings, and cheese to create their own customized pizzas.
- **Order Placement**: Users can place orders and track their order history.
- **Admin Inventory System**: Admins have access to an inventory dashboard to manage stock levels.
- **Low Stock Email Notifications**: The app sends email notifications to admins when stock levels are low.
- **Restocking Functionality**: Admins can initiate restocking of specific items.

## Technologies Used

### Frontend

- React: A JavaScript library for building user interfaces.
- Redux: A state management library for managing application state.
- Axios: A promise-based HTTP client for making API requests.
- Material-UI: A popular React UI framework for designing consistent and modern user interfaces.

### Backend

- Node.js: A runtime environment for executing JavaScript on the server side.
- Express: A fast and minimalist web application framework for Node.js.
- MongoDB: A NoSQL database for storing application data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.

### Authentication and Authorization

- JSON Web Tokens (JWT): Used for secure user authentication and authorization.
- bcrypt: A library for hashing and salting passwords to enhance security.

### Admin Features

- Admin Dashboard: A user interface for managing inventory and monitoring orders.
- Nodemailer: A library for sending emails, used to notify admins of low stock.

### Deployment

- Heroku: A cloud platform used to deploy the app online.

## Installation

1. Clone the repository: `git clone https://github.com/WhiteShadow11z1/Dough-Divine.git`
2. Navigate to the project directory: `cd Dough-Divine`
3. Install frontend dependencies: `cd client && npm install`
4. Install backend dependencies: `cd ../server && npm install`

## Usage

1. Start the backend server: `cd server && npm start`
2. Start the frontend development server: `cd ../client && npm start`
3. Access the app in your browser at `http://localhost:3000`

## Admin Dashboard

Admins can access the admin dashboard by logging in with their credentials. Once logged in, they can:

- Manage inventory: Add, edit, and delete items from the inventory.
- Monitor orders: View and track incoming orders.
- Initiate restocking: Trigger restocking for items with low stock levels.

## Low Stock Email Notifications

The app utilizes the SMTP protocol to send email notifications to admins when stock levels are low. Admins receive an email with details about the items that need restocking.

## Contributing

We welcome contributions to the Dough Divine Pizza App project! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Implement your feature or bug fix.
4. Commit and push your changes: `git commit -m "Description of your changes"` and `git push origin feature-name`
5. Create a pull request detailing your changes.

## License

This project is licensed under the [MIT License](LICENSE).
