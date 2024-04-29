export function validatePhone(phone: string): boolean {
    // Add your phone validation logic here
    // Example: Check if the phone number is in the correct format
    const phoneRegex = /^\d{9}$/;
    return phoneRegex.test(phone);
}