export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Conversion {
  _id: string;
  fileName: string;
  createdAt: string;
  status: 'processing' | 'completed' | 'error';
  pdfUrl: string;
  xmlContent: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}