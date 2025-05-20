export function reThrowError(error: unknown) {
  if (error instanceof Error) {
    throw error;
  } else {
    throw new Error('An unknown error occured', {
      cause: error,
    });
  }
}

export function buildError(error: unknown) {
  if (error instanceof Error) {
    return error;
  } else {
    return new Error('An unknown error occured', {
      cause: error,
    });
  }
}
