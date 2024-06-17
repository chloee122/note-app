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