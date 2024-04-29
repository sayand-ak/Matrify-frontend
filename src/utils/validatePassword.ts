export function validatePassword(password: string) {
    // Add your password validation logic here
    // Example: Check if the password is at least 8 characters long
    if (password.length < 8) {
        return false;
    }
    return true;
}