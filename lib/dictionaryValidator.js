/**
 * Dictionary Validation Middleware
 * Uses Free Dictionary API to validate English words before ChatGPT processing
 */

class DictionaryValidator {
  constructor() {
    this.baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';
    this.cache = new Map(); // Simple in-memory cache
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  }

  /**
   * Validate if a word exists in the dictionary
   * @param {string} word - The word to validate
   * @returns {Object} - Validation result with exists, data, and error properties
   */
  async validateWord(word) {
    if (!word || typeof word !== 'string') {
      return {
        exists: false,
        isValid: false,
        error: 'Invalid input: word must be a non-empty string'
      };
    }

    const normalizedWord = word.toLowerCase().trim();

    // Check cache first
    const cachedResult = this.getCachedResult(normalizedWord);
    if (cachedResult) {
      return cachedResult;
    }

    try {
      const response = await fetch(`${this.baseUrl}/${encodeURIComponent(normalizedWord)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'VocabLake-App/1.0'
        },
        // Add timeout
        // signal: AbortSignal.timeout(5000) // 5 second timeout
      });

      if (response.ok) {
        const data = await response.json();
        const result = {
          exists: true,
          isValid: true,
          data: this.extractWordData(data),
          source: 'dictionary-api'
        };

        // Cache successful result
        this.setCacheResult(normalizedWord, result);
        return result;

      } else if (response.status === 404) {
        const result = {
          exists: false,
          isValid: false,
          error: 'Word not found in dictionary',
          suggestion: 'Please check spelling or try a different word'
        };

        // Cache negative result (shorter expiry)
        this.setCacheResult(normalizedWord, result, 60 * 60 * 1000); // 1 hour
        return result;

      } else {
        return {
          exists: false,
          isValid: false,
          error: `Dictionary API error: ${response.status}`,
          shouldRetry: true
        };
      }

    } catch (error) {
      console.error('Dictionary validation error:', error);

      // Handle different error types
      if (error.name === 'AbortError') {
        return {
          exists: false,
          isValid: false,
          error: 'Dictionary lookup timeout',
          shouldRetry: true
        };
      }

      return {
        exists: false,
        isValid: false,
        error: 'Failed to validate word with dictionary',
        shouldRetry: true
      };
    }
  }

  /**
   * Extract useful data from dictionary API response
   * @param {Array} apiData - Raw API response data
   * @returns {Object} - Cleaned word data
   */
  extractWordData(apiData) {
    if (!apiData || !Array.isArray(apiData) || apiData.length === 0) {
      return null;
    }

    const wordData = apiData[0];
    return {
      word: wordData.word,
      phonetic: wordData.phonetic || null,
      phonetics: wordData.phonetics?.slice(0, 2) || [], // Limit to 2 phonetics
      meanings: wordData.meanings?.slice(0, 3).map(meaning => ({
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions?.slice(0, 2).map(def => ({
          definition: def.definition,
          example: def.example || null
        })) || []
      })) || [],
      sourceUrls: wordData.sourceUrls?.slice(0, 1) || []
    };
  }

  /**
   * Get cached validation result
   * @param {string} word - Normalized word
   * @returns {Object|null} - Cached result or null
   */
  getCachedResult(word) {
    const cached = this.cache.get(word);
    if (cached && Date.now() - cached.timestamp < cached.expiry) {
      return { ...cached.result, fromCache: true };
    }

    // Remove expired cache entry
    if (cached) {
      this.cache.delete(word);
    }

    return null;
  }

  /**
   * Set cache result
   * @param {string} word - Normalized word
   * @param {Object} result - Validation result
   * @param {number} customExpiry - Custom expiry time in milliseconds
   */
  setCacheResult(word, result, customExpiry = null) {
    this.cache.set(word, {
      result: { ...result },
      timestamp: Date.now(),
      expiry: customExpiry || this.cacheExpiry
    });

    // Simple cache cleanup - remove oldest entries if cache gets too large
    if (this.cache.size > 1000) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Batch validate multiple words
   * @param {string[]} words - Array of words to validate
   * @returns {Object[]} - Array of validation results
   */
  async validateWords(words) {
    if (!Array.isArray(words)) {
      throw new Error('Input must be an array of words');
    }

    const validationPromises = words.map(word => this.validateWord(word));
    return await Promise.all(validationPromises);
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache stats
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}

// Create singleton instance
const dictionaryValidator = new DictionaryValidator();

export default dictionaryValidator;