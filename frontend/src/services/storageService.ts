const LS_KEY = "TOKEN";

export const getToken = <T>(): T[] => {
  let tokenList = localStorage.getItem(LS_KEY) || "[]";
  return JSON.parse(tokenList) as T[];
};

export const setToken = <T>(newToken: T): void => {
  localStorage.setItem(LS_KEY, JSON.stringify(newToken));
};
