/**
 * Input Validation Middleware for Vocabulary Input
 * Prevents unwanted content in user input
 */

export class InputValidator {
  constructor() {
    // Regular expressions for validation
    this.patterns = {
      // Only English letters (a-z, A-Z)
      englishOnly: /^[a-zA-Z]+$/,

      // Non-English characters (including accented characters, other scripts)
      nonEnglish: /[^\x00-\x7F]|[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/,

      // Numbers
      numbers: /\d/,

      // Special characters (excluding basic punctuation)
      specialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/,

      // Whitespace and line breaks
      whitespace: /\s/,

      // Emojis and emoticons (comprehensive pattern)
      emojis:
        /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,

      // Common non-dictionary words patterns
      repeatedChars: /(.)\1{3,}/, // 4+ repeated characters (aaaa)

      // URL patterns
      urls: /https?:\/\/|www\./i,

      // Email patterns
      emails: /@/,

      // HTML/XML tags
      htmlTags: /<[^>]*>/,

      // Profanity filter (basic examples - expand as needed)
      profanity: /\b(damn|hell|shit|fuck|bitch|ass|crap)\b/i,

      // Single characters (too short)
      tooShort: /^.{1,1}$/,

      // Too long (unreasonable vocabulary length)
      tooLong: /^.{51,}$/,

      // All caps (likely not a proper word)
      allCaps: /^[A-Z]{4,}$/,

      // Mixed case in unusual patterns (lIkE tHiS)
      weirdCasing: /^[a-zA-Z]*[a-z][A-Z][a-zA-Z]*$/,
    };

    // Common invalid inputs
    this.blockedWords = [
      "test",
      "testing",
      "123",
      "abc",
      "aaa",
      "zzz",
      "qwerty",
      "asdf",
      "hello",
      "world",
      "name",
      "password",
      "admin",
      "user",
      "null",
      "undefined",
    ];
  }

  /**
   * Validate input and return detailed results
   * @param {string} input - The user input to validate
   * @returns {Object} Validation results
   */
  validate(input) {
    const result = {
      isValid: true,
      errors: [],
      cleanedInput: input,
      suggestions: [],
    };

    // Check if input is empty
    if (!input || input.trim() === "") {
      result.isValid = false;
      result.errors.push("Input cannot be empty");
      return result;
    }

    // Store original for comparison
    const originalInput = input;

    // Check each validation rule
    this.checkNonEnglish(input, result);
    this.checkNumbers(input, result);
    this.checkSpecialCharacters(input, result);
    this.checkWhitespace(input, result);
    this.checkEmojis(input, result);
    this.checkRepeatedCharacters(input, result);
    this.checkUrls(input, result);
    this.checkEmails(input, result);
    this.checkHtmlTags(input, result);
    this.checkProfanity(input, result);
    this.checkLength(input, result);
    this.checkCasing(input, result);
    this.checkBlockedWords(input, result);
    this.checkEnglishDictionary(input, result);

    // Clean the input (remove unwanted characters)
    result.cleanedInput = this.cleanInput(originalInput);

    // Add suggestions if input was modified
    if (
      result.cleanedInput !== originalInput &&
      result.cleanedInput.length > 0
    ) {
      result.suggestions.push(`Did you mean: "${result.cleanedInput}"?`);
    }

    return result;
  }

  checkNonEnglish(input, result) {
    if (this.patterns.nonEnglish.test(input)) {
      result.isValid = false;
      result.errors.push("Only English letters are allowed");
    }
  }

  checkNumbers(input, result) {
    if (this.patterns.numbers.test(input)) {
      result.isValid = false;
      result.errors.push("Numbers are not allowed");
    }
  }

  checkSpecialCharacters(input, result) {
    if (this.patterns.specialChars.test(input)) {
      result.isValid = false;
      result.errors.push("Special characters are not allowed");
    }
  }

  checkWhitespace(input, result) {
    if (this.patterns.whitespace.test(input)) {
      result.isValid = false;
      result.errors.push("Spaces and line breaks are not allowed");
    }
  }

  checkEmojis(input, result) {
    if (this.patterns.emojis.test(input)) {
      result.isValid = false;
      result.errors.push("Emojis are not allowed");
    }
  }

  checkRepeatedCharacters(input, result) {
    if (this.patterns.repeatedChars.test(input)) {
      result.isValid = false;
      result.errors.push("Repeated characters (4+ in a row) are not allowed");
    }
  }

  checkUrls(input, result) {
    if (this.patterns.urls.test(input)) {
      result.isValid = false;
      result.errors.push("URLs are not allowed");
    }
  }

  checkEmails(input, result) {
    if (this.patterns.emails.test(input)) {
      result.isValid = false;
      result.errors.push("Email addresses are not allowed");
    }
  }

  checkHtmlTags(input, result) {
    if (this.patterns.htmlTags.test(input)) {
      result.isValid = false;
      result.errors.push("HTML tags are not allowed");
    }
  }

  checkProfanity(input, result) {
    if (this.patterns.profanity.test(input)) {
      result.isValid = false;
      result.errors.push("Inappropriate language is not allowed");
    }
  }

  checkLength(input, result) {
    if (this.patterns.tooShort.test(input)) {
      result.isValid = false;
      result.errors.push("Input is too short (minimum 2 characters)");
    } else if (this.patterns.tooLong.test(input)) {
      result.isValid = false;
      result.errors.push("Input is too long (maximum 50 characters)");
    }
  }

  checkCasing(input, result) {
    if (this.patterns.allCaps.test(input)) {
      result.isValid = false;
      result.errors.push("All caps input is not allowed");
    } else if (this.patterns.weirdCasing.test(input)) {
      result.isValid = false;
      result.errors.push("Unusual letter casing detected");
    }
  }

  checkBlockedWords(input, result) {
    const lowerInput = input.toLowerCase();
    if (this.blockedWords.includes(lowerInput)) {
      result.isValid = false;
      result.errors.push("Common test words are not allowed");
    }
  }

  checkEnglishDictionary(input, result) {
    // Basic check for English-like patterns
    if (!this.patterns.englishOnly.test(input)) {
      return; // Already caught by other checks
    }

    // Check for consonant/vowel patterns (basic heuristic)
    const vowels = input.match(/[aeiou]/gi);
    const consonants = input.match(/[bcdfghjklmnpqrstvwxyz]/gi);

    if (!vowels && input.length > 3) {
      result.isValid = false;
      result.errors.push("Input appears to be non-dictionary word (no vowels)");
    }

    if (!consonants && input.length > 2) {
      result.isValid = false;
      result.errors.push(
        "Input appears to be non-dictionary word (no consonants)",
      );
    }
  }

  /**
   * Clean input by removing unwanted characters
   * @param {string} input - Original input
   * @returns {string} Cleaned input
   */
  cleanInput(input) {
    return input
      .replace(this.patterns.emojis, "") // Remove emojis
      .replace(this.patterns.specialChars, "") // Remove special chars
      .replace(this.patterns.numbers, "") // Remove numbers
      .replace(this.patterns.whitespace, "") // Remove whitespace
      .replace(this.patterns.htmlTags, "") // Remove HTML tags
      .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII
      .toLowerCase() // Convert to lowercase
      .trim();
  }

  /**
   * Get user-friendly error message
   * @param {Array} errors - Array of error messages
   * @returns {string} Formatted error message
   */
  getErrorMessage(errors) {
    if (errors.length === 0) return "";
    if (errors.length === 1) return errors[0];

    const lastError = errors.pop();
    return `${errors.join(", ")} and ${lastError}`;
  }
}

// Export singleton instance
export const inputValidator = new InputValidator();

// Export validation function for easy use
export const validateVocabularyInput = (input) => {
  return inputValidator.validate(input);
};

export default inputValidator;
