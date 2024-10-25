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
    return !obj.length;
  }

  return !Object.keys(obj).length;
}
