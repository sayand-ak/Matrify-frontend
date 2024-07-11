import axios from 'axios';


const API_URL = process.env.API_URL;

// Function to check if the user is blocked

export async function checkIfUserIsBlocked() {
    try {
        const response = await axios.get(`${API_URL}/check-report-user`, {
            withCredentials: true,
        });
        
        if (response.status === 403) { 
            return false; 
        }
        return true;
    } catch (error) {
        console.error('Error checking if user is blocked:', error);
        return false; 
    }
}