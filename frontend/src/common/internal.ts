export interface Note {
  id: string;
  title: string;
  htmlContent: string;
  plainTextContent: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  name: string;
  username: string;
}

export type User = Omit<AuthResponse, "accessToken" | "refreshToken">;
