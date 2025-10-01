// src/auth/interfaces/auth-request.interface.ts

import { Request } from 'express';
import { User } from '@prisma/client';

// Extend the Express Request object to include the 'user' property
export interface AuthRequest extends Request {
  user: User;
}
