import { sanitizeInput, createRateLimiter, isNonEmptyString, escapeHtml, MAX_INPUT_LENGTH } from './security'

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('strips HTML tags to prevent XSS', () => {
      const malicious = '<script>alert("xss")</script>Hello'
      const result = sanitizeInput(malicious)
      expect(result).not.toContain('<script>')
      expect(result).toContain('Hello')
    })

    it('trims whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello')
    })

    it('returns empty string for non-string input', () => {
      expect(sanitizeInput(null)).toBe('')
      expect(sanitizeInput(undefined)).toBe('')
      expect(sanitizeInput(123)).toBe('')
    })

    it('enforces maximum input length', () => {
      const longString = 'a'.repeat(600)
      const result = sanitizeInput(longString)
      expect(result.length).toBeLessThanOrEqual(MAX_INPUT_LENGTH)
    })
  })

  describe('createRateLimiter', () => {
    it('allows requests within limit', () => {
      const limiter = createRateLimiter(3, 1000)
      expect(limiter()).toBe(true)
      expect(limiter()).toBe(true)
      expect(limiter()).toBe(true)
    })

    it('blocks requests exceeding limit', () => {
      const limiter = createRateLimiter(2, 1000)
      expect(limiter()).toBe(true)
      expect(limiter()).toBe(true)
      expect(limiter()).toBe(false) // 3rd should be blocked
    })
  })

  describe('isNonEmptyString', () => {
    it('returns true for valid strings', () => {
      expect(isNonEmptyString('hello')).toBe(true)
    })

    it('returns false for empty or non-string', () => {
      expect(isNonEmptyString('')).toBe(false)
      expect(isNonEmptyString('   ')).toBe(false)
      expect(isNonEmptyString(null)).toBe(false)
      expect(isNonEmptyString(42)).toBe(false)
    })
  })

  describe('escapeHtml', () => {
    it('escapes HTML special characters', () => {
      const input = '<div class="test">&</div>'
      const result = escapeHtml(input)
      expect(result).toBe('&lt;div class=&quot;test&quot;&gt;&amp;&lt;/div&gt;')
    })
  })
})
