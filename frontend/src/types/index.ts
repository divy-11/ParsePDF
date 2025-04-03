export interface User {
  _id: string;
  email: string;
  name: string;
  password?: string
}

export interface Conversion {
  _id: string;
  fileName: string;
  userId:string;
  originalSize: number; 
  convertedSize: number; 
  createdAt: string;
  status: 'processing' | 'completed' | 'error';
  pdfUrl: string;
  xmlContent: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}