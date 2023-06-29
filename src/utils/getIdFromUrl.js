export const getUUIDFromUrl = (url) => {
  const parts = url.split('/');
  if (parts.length === 4) {
    const id = parts.pop();
    if (isValidUUID(id)) return { valid: true, id };
    return { valid: false, id };
  }
};

function isValidUUID(id) {
  const regExpUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return regExpUUID.test(id);
};