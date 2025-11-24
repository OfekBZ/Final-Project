export const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){4,})(?=.*[!@#$%^&*_-]).{8,}$/;

export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
