export function validateUsername(username: string) {
    // Regular expression for validating usernames
    const usernameRegex = /^[a-zA-Z ]{3,20}$/;

    // Check if the username matches the regex pattern
    if (!usernameRegex.test(username)) {
        return false;
    }

    // If the username is valid, return null or an empty string
    return true;
}
