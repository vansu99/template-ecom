/* eslint-disable @typescript-eslint/no-explicit-any */

export function removeUndefinedAndNull(obj: object) {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (obj[key as keyof object] !== undefined && obj[key as keyof object] !== null) {
      result[key as any] = obj[key as keyof object];
    }
  }

  return result;
}

export function isEmpty(obj: Array<any> | object): boolean {
  if (!obj || typeof obj !== 'object') return !obj;

  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  return Object.keys(obj).length === 0;
}

export const logger = ({ message, context }: { message: string; context?: unknown }) => {
  return {
    // eslint-disable-next-line no-console
    info: () => console.log(message, context),
    error: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      process.env.NODE_ENV !== 'production' && console.error(message, context);
    },
    warn: () => console.warn(message, context),
  };
};

export const extractId = (value: string) => {
  if (value.includes('.')) {
    return parseInt(value.split('.')[1]);
  }
  return parseInt(value);
};

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
}
