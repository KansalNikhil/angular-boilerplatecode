export interface LoginRequest {
    loginid: string;
    password: string;
  }
  
  export interface UserData {
    id: string;
    username: string;
    email: string;
    role: string;
    pages: pages[];
    // add other user properties as needed
  }
  
  export interface AuthResponse {
    token: string;
    userData: UserData;
  }
  
  export interface pages{
    pageid: string;
    pagename: string;
    pageurl: string;
  }