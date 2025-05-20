import { reThrowError } from '@/utils/reThrowError';

export function handleResponse<T>({
  data,
  error,
  response,
}: {
  data?: T;
  error?: unknown;
  response: Response;
}) {
  if (response.status === 404) {
    return undefined;
  }

  if (error) {
    reThrowError(error);
  }

  return data;
}
