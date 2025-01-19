export interface SignupFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    submit?: string;
  }