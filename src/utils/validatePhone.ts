export function validatePhone(phone: string): boolean {
    // Remove any non-numeric characters from the phone number
    const numericPhone = phone.replace(/\D/g, '');

    // Define regular expressions for different phone number formats
    const phoneRegexes = [
        /^\d{10}$/, // 10 digits without any special characters
        /^\+\d{11,15}$/, // Country code with 11-15 digits, e.g., +12345678901
        /^\d{3}-\d{3}-\d{4}$/, // 3-3-4 format, e.g., 123-456-7890
        /^\(\d{3}\) \d{3}-\d{4}$/, // (XXX) XXX-XXXX format, e.g., (123) 456-7890
    ];

    // Check if the phone number matches any of the regex patterns
    const isValid = phoneRegexes.some(regex => regex.test(numericPhone));

    return isValid;
}
