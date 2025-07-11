export const parseMongoDate = (date) => {
  if (!date) return null;
  try {
    if (typeof date === "string" || date instanceof Date) {
      return new Date(date);
    }
    if (date.$date) {
      if (typeof date.$date === "object" && date.$date.$numberLong) {
        return new Date(parseInt(date.$date.$numberLong));
      }
      return new Date(date.$date);
    }
    return new Date(date);
  } catch {
    return null;
  }
};
