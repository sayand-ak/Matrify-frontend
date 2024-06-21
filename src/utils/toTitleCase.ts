export function toTitleCase(str:string) {
    // Split the camelCase string into separate words
    const words = str.replace(/([A-Z])/g, ' $1').split(' ');
  
    // Capitalize the first letter of each word
    const titleCasedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  
    // Join the words back into a single string
    return titleCasedWords.join(' ');
  }