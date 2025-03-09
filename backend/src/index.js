import 'dotenv/config' ;
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import db from './config/database.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
// These routes will be uncommented as they are created
// import orderRoutes from './routes/orderRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import retailerRoutes from './routes/retailerRoutes.js';
// import deliveryPartnerRoutes from './routes/deliveryPartnerRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
// These routes will be uncommented as they are created
// app.use('/api/orders', orderRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/retailers', retailerRoutes);
// app.use('/api/delivery-partners', deliveryPartnerRoutes);
// app.use('/api/admin', adminRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Join a room based on user ID
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });
  
  // Handle order updates
  socket.on('orderUpdate', (data) => {
    io.to(data.userId).emit('orderStatusUpdate', data);
    console.log(`Order update sent to user ${data.userId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Database connection
db.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    return db.sync(); // Sync models with database
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export io instance for use in other files
export { io };