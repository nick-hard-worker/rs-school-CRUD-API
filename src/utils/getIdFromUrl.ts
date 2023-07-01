export interface ICheckUUID {
  valid: boolean;
  id: string
}

export const getUUIDFromUrl = (url: string | undefined): ICheckUUID | undefined => {
  if (url) {
    const parts = url.split('/');
    if (parts.length === 4) {
      const id = parts.pop() as string;
      if (isValidUUID(id)) return { valid: true, id };
      return { valid: false, id };
    }
  }
};

function isValidUUID(id: string): boolean {
  const regExpUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return regExpUUID.test(id);
};