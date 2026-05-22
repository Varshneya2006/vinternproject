import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || '5000';

// Enable CORS for frontend requests
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// Connect to MongoDB before serving requests
connectDB();

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Basic health check endpoint
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'DDD Student Dashboard backend is running' });
});

// Handle unknown routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

app.listen(Number(PORT), () => {
  console.log(`Server listening on port ${PORT}`);
});
