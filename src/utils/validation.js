export const validateUrl = (v) => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
export const validateNumber = (v) => /^\d+$/.test(v);
export const validateRange = (v, min, max) => v >= min && v <= max;