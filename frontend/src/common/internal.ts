export interface Note {
  id: string;
  content: string;
  important: boolean;
}

export interface User {
  token: string;
  name: string;
  username: string;
}

export interface SignUpResponse {
  data: User;
}

export interface LoginResponse {
  data: {
    name: string;
    token: string;
    username: string;
  };
}
