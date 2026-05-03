// src/utils/security.js
// Security utility module for input validation and rate limiting.
// This demonstrates defensive programming practices and awareness of common risk vectors.

import DOMPurify from 'dompurify'

/**
 * Maximum allowed input length to prevent denial-of-service via oversized payloads.
 */
export const MAX_INPUT_LENGTH = 500

/**
 * Sanitizes user input by stripping all HTML/script tags and enforcing length limits.
 * Prevents XSS (Cross-Site Scripting) and injection attacks.
 * @param {string} input - Raw user input
 * @returns {string} Sanitized and trimmed input
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return ''
  const trimmed = input.trim()
  if (trimmed.length > MAX_INPUT_LENGTH) {
    return DOMPurify.sanitize(trimmed.slice(0, MAX_INPUT_LENGTH))
  }
  return DOMPurify.sanitize(trimmed)
}

/**
 * Simple client-side rate limiter to prevent abuse of API-connected features.
 * Returns true if the action is allowed, false if rate-limited.
 */
export function createRateLimiter(maxRequests = 10, windowMs = 60000) {
  const timestamps = []
  
  return function isAllowed() {
    const now = Date.now()
    // Remove timestamps outside the window
    while (timestamps.length > 0 && timestamps[0] <= now - windowMs) {
      timestamps.shift()
    }
    if (timestamps.length >= maxRequests) {
      return false
    }
    timestamps.push(now)
    return true
  }
}

/**
 * Validates that a value is a non-empty string.
 * Defensive check for form inputs.
 * @param {*} value
 * @returns {boolean}
 */
export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Escapes HTML entities in a string for safe rendering in non-React contexts.
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return str.replace(/[&<>"']/g, (char) => map[char])
}
