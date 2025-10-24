export const API_VERSION = 'v1';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const greet = (name: string): string => {
  return `Hello, ${name}!`;
};