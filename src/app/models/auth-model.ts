export interface LoginRequest {
    userid: string;
    password: string;
  }
  
  export interface UserData {
    id: string;
    username: string;
    email: string;
    role: string;
    // add other user properties as needed
  }
  
  export interface AuthResponse {
    token: string;
    userData: UserData;
  }
  