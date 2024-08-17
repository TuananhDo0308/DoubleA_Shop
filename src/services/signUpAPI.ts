import axios from 'axios';
import API_URL from './LinkAPI';
interface SignInFormData {
    email: string;
    password: string;
  }
  // Rename FormData to UserFormData
interface UserFormData {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    retypePassword: string;
    profilePicture: File | null;
  }
  interface userIdType {
    userId:string;
  }
// Register a new user with multipart/form-data
export const registerUser = async (formData: UserFormData) => {
    const response = await axios.post(`${API_URL}/users/signup`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Login a user with email and password
export const loginUser = async (credentials: SignInFormData) => {
  console.log("Credentials: ", credentials);
  const response = await axios.post(`${API_URL}/users/signin`, credentials);
  return response.data;
};

// Get the order history for a user
export const getHistory = async (userId:userIdType) => {
  const response = await axios.post(`${API_URL}/getOrder`, userId);
  console.log("Received:", response.data);
  return response.data;
};

// Update a user's profile with multipart/form-data
export const updateProfile = async (user: FormData) => {
  console.log("User Data", user);
  const response = await axios.post(`${API_URL}/users/updateProfile`, user, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
