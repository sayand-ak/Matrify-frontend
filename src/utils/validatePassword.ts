export function validatePassword(password: string) {
    // Check if the password is at least 8 characters long
    if (password.length < 8) {
        return false;
    }

    // // Check if the password contains at least one uppercase letter
    // if (!/[A-Z]/.test(password)) {
    //     return false;
    // }

    // // Check if the password contains at least one lowercase letter
    // if (!/[a-z]/.test(password)) {
    //     return false;
    // }

    // // Check if the password contains at least one digit
    // if (!/\d/.test(password)) {
    //     return false;
    // }

    // // Check if the password contains at least one special character
    // if (!/[@$!%*?&]/.test(password)) {
    //     return false;
    // }

    // All criteria passed, return true
    return true;
}
