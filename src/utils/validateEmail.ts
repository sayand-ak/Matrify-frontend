export function validateEmail(email:string):boolean{
    // Regex to validate email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}