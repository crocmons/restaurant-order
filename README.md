# Restaurant Order Management System

This project is a **Restaurant Order Management System** built using modern web technologies, including **Next.js** for the frontend and **Flask** for the backend and **SQL** for database also **Stripe** for the payment gateway in real time. It allows users to place, view, and manage restaurant orders efficiently.

## Features

- **Search Items**: User can easily search their menu items and then place order.
- **Order Form**: Users can place orders by providing their details, including customer name, order name, quantity, price and order date.
- **Form Validation**: The form includes validation to ensure that all required fields are filled out before submission.
- **Stripe Payment**: When the user clicks the place order button it will redirect them to the stripe page and then they can pay from their payment gateway in real time.
- **Redirect to Orders Page**: After Successful payment the user will redirect to their orders page they can see their all orders in real time .
- **Pagination** : Added pagination in grid to give a better UI/UX.
- **Loader on Submission**: A loading spinner is displayed on the Orders Page when an order is being submitted.
- **Order Management**: View past orders and manage them through the backend.

## Technologies Used

- **Frontend**:
  - [Next.js](https://nextjs.org/): React framework for building fast web applications.
  - [TypeScript](https://www.typescriptlang.org/): A strongly typed programming language that builds on JavaScript.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
  - [Material UI](https://mui.com/): A popular React UI framework for building components.
  
- **Backend**:
  - [Flask](https://flask.palletsprojects.com/): A lightweight WSGI web application framework for Python.
  - [SQLAlchemy](https://www.sqlalchemy.org/): The Python SQL toolkit and Object-Relational Mapping (ORM) library.
  - [SQLite](https://www.sqlite.org/): A C-language library that provides a lightweight disk-based database.
  - Stripe for payment gateway

## Installation

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine.
- **Python**: Ensure that Python and pip are installed.
- **Flask**: Install Flask and other dependencies via pip.

### Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/restaurant-order-management.git
   cd restaurant-order-management
   ```

2. **Frontend Setup**:

   - Navigate to the frontend directory:

     ```bash
     cd frontend
     ```

   - Install the dependencies:

     ```bash
     npm install
     ```

   - Start the development server:

     ```bash
     npm run dev
     ```

3. **Backend Setup**:

   - Navigate to the backend directory:

     ```bash
     cd backend
     ```
   - create the virtual env -
     ```bash
     conda create -p venv python==3.12 -y

    - conda activate -
     ```bash
     conda activate
  
   - Install the Python dependencies:

     ```bash
     pip install -r requirements.txt
     ```

   - Run the Flask server:

     ```bash
     flask run
     ```

4. **Database Setup**:

   - Ensure the SQLite database is set up and migrations are applied.
   - Configure the connection in your Flask app.

### Usage

1. **Place an Order**: Go to the frontend application and fill out the order form with the required details.
2. **View Orders**: Visit the orders page to see the list of orders placed.

### Validation & Error Handling

- **Form Validation**: The form will prevent submission if any required field is empty and will show an error message.
- **Loading Indicator**: When the user submits an order, a loading spinner will appear on the "Place Order" button to indicate that the request is being processed.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

