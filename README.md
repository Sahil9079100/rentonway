# RentOn - Product Rental Platform

RentOn is a comprehensive product rental platform that allows users to rent various products like clothes, watches, sunglasses, etc. The platform connects customers, retailers, and delivery partners in a seamless ecosystem.

## Features

### User Types
- **Customers:** Rent products for specific durations
- **Retailers:** Add their products to the platform
- **Delivery Partners:** Deliver orders to customers

### Core Features
- **Membership Plans:** Monthly subscription plans for users
- **Product Filters:** Filter by season, event, price range, etc.
- **Order Tracking:** Real-time order tracking
- **Payment Gateway:** Support for UPI, cards, and net banking
- **Analytics Dashboard:** For orders, users, and retailers
- **Mobile-Friendly:** Responsive design for all devices

### Safety Features
- OTP-based authentication
- Aadhar verification
- Data encryption
- Role-based access control

## Technology Stack

### Frontend
- React.js with Vite
- React Router
- Redux for state management
- Material UI for components
- Socket.io client for real-time updates

### Backend
- Node.js with Express.js
- MySQL database with Sequelize ORM
- JWT for authentication
- Socket.io for real-time notifications
- Stripe for payment processing
- Twilio for OTP verification
- DigiLocker API for Aadhar verification

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/renton.git
cd renton
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Configure environment variables
- Create a `.env` file in the backend directory based on `.env.example`
- Set up your database credentials, JWT secret, and API keys

5. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# In a separate terminal, start frontend server
cd frontend
npm run dev
```

## Project Structure

### Backend
```
backend/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Request handlers
│   ├── middlewares/  # Custom middlewares
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── utils/        # Utility functions
│   └── index.js      # Entry point
├── .env              # Environment variables
└── package.json      # Dependencies
```

### Frontend
```
frontend/
├── src/
│   ├── assets/       # Static assets
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── features/     # Redux features
│   ├── app/          # Redux store
│   ├── utils/        # Utility functions
│   ├── services/     # API services
│   ├── App.jsx       # Main component
│   └── main.jsx      # Entry point
└── package.json      # Dependencies
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 