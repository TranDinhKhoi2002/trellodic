import { externalRequest } from '../request';

export const login = (data: { email: string; password: string; signal: AbortSignal }) => {
  const { signal, ...rest } = data;
  return externalRequest.post('http://localhost:8080/api/v1/auth/login', rest, { signal });
};

export const signup = (data: {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  birthday: string;
  signal: AbortSignal;
}) => {
  const { signal, ...rest } = data;
  return externalRequest.post('http://localhost:8080/api/v1/auth/register', rest, { signal });
};

export const verifyToken = (token: string) => {
  return externalRequest.post(`http://localhost:8080/api/v1/auth/verify?token=${token}`, {});
};