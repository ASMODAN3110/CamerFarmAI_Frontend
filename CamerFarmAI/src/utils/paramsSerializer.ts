export const serializeParams = (params: Record<string, any>): string => {
  const parts: string[] = [];

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (value === null || typeof value === 'undefined') {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((val) => {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
      });
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });

  return parts.join('&');
};

