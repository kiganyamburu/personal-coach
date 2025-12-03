/**
 * Validation utilities for request data
 */

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  valid: boolean;
  message?: string;
} {
  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters long",
    };
  }
  return { valid: true };
}

export function validateAmount(amount: number): {
  valid: boolean;
  message?: string;
} {
  if (typeof amount !== "number" || isNaN(amount)) {
    return {
      valid: false,
      message: "Amount must be a valid number",
    };
  }
  if (amount < 0) {
    return {
      valid: false,
      message: "Amount must be positive",
    };
  }
  return { valid: true };
}

export function validateDate(dateString: string): {
  valid: boolean;
  message?: string;
} {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return {
      valid: false,
      message: "Invalid date format",
    };
  }
  return { valid: true };
}

export function validateCategory(category: string): {
  valid: boolean;
  message?: string;
} {
  if (!category || category.trim().length === 0) {
    return {
      valid: false,
      message: "Category is required",
    };
  }
  return { valid: true };
}

