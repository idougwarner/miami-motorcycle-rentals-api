import * as bcrypt from 'bcrypt';

export const comparePasswords = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};

export const calculateOffset = (page: number, limit: number): number => {
  return page * limit;
};

export const groupBy = (
  array: Array<any>,
  keyPath: string,
): { [key: string]: Array<any> } => {
  return array.reduce((result, item) => {
    const key = item[keyPath];

    if (result[key] == null) {
      return Object.assign(result, { [key]: [item] });
    }
    return Object.assign(result, { [key]: [...result[key], item] });
  }, {});
};

export const sliceIntoChunks = (
  collection: any[],
  chunkSize: number,
): any[][] => {
  const result = [];
  for (let i = 0; i < collection.length; i += chunkSize) {
    const chunk = collection.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

export const generateVerificationCode = (length: number = 5): string => {
  let randomString = '';
  let characters = '0123456789';
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return randomString;
};
