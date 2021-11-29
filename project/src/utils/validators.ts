export const validateEmail = (email: string): boolean => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2})+$/.test(email);

export const validatePassword = (password: string): boolean => /[a-zA-Z]+/.test(password) && /[0-9]+/.test(password);
