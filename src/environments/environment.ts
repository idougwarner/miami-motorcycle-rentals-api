import { ApiEnvironment } from './env.interface';

export const environment: ApiEnvironment = {
  production: false,
  frontEndUrl: 'http://localhost:4200', // Frontend url to be used in email to redirect user to change password
  wpJsonBaseUrl: 'https://www.miamimotorcyclerentals.com',
  stripeSecretKey:
    'sk_test_51KCNhTLvkk9nJ8E0AJ4tEBRvXWzpXgKVNHBmfq9PkUICjJ69ItfTU089hHKuut85tM8MaXCrXFG975OWgxQzoNf600VRXYHZTq',
};
