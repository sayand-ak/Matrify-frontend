export function calculateAgeInYears(dobString: string): number | null {

    if (!dobString) {
      return null; 
    }
  
    try {
      const dob = new Date(dobString);
  
      const today = new Date();
  
      let age = today.getFullYear() - dob.getFullYear();
      const months = today.getMonth() - dob.getMonth();
  
      if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
        age--; 
      }
  
      return age;
    } catch (error) {
      console.error("Error parsing date string:", error);
      return null;
    }
  }