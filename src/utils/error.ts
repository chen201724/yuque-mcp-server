export class YuqueError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'YuqueError';
  }
}

export function handleYuqueError(error: unknown): never {
  if (error instanceof YuqueError) {
    throw error;
  }

  if (typeof error === 'object' && error !== null) {
    const err = error as { response?: { status?: number; data?: { message?: string } }; message?: string };

    if (err.response) {
      const status = err.response.status;
      const message = err.response.data?.message || err.message || 'Unknown Yuque API error';
      throw new YuqueError(message, status, error);
    }

    if (err.message) {
      throw new YuqueError(err.message, undefined, error);
    }
  }

  throw new YuqueError('Unknown error occurred', undefined, error);
}
