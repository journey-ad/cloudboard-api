import Cookie from "js-cookie";

export const mergeDeep = (...objects: Record<string, unknown>[]) => {
  const result: Record<string, unknown> = {};
  for (const object of objects) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (typeof object[key] === 'object' && object[key] !== null) {
          result[key] = mergeDeep(result[key] as Record<string, unknown>, object[key] as Record<string, unknown>);
        } else {
          result[key] = object[key];
        }
      }
    }
  }
  return result;
};

export const sizeToBytes = (size: string): number => {
  const unit = size.slice(-2);
  const value = parseInt(size);
  const units = {
    'KB': 1024,
    'MB': 1024 ** 2,
    'GB': 1024 ** 3,
    'TB': 1024 ** 4,
    'PB': 1024 ** 5,
    'EB': 1024 ** 6,
  };

  return units[unit as keyof typeof units] ? value * units[unit as keyof typeof units] : -1;
}

export { Cookie };
