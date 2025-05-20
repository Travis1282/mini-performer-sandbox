export const hasUUID = (fileName: string): boolean => {
  if (!fileName) {
    return false;
  }

  // UUID regex pattern
  const uuidPattern = /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i;

  // Check if the file name contains a UUID
  return uuidPattern.test(fileName);
};
