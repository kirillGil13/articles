export const getFromLocalStorage = (name) => {
  const settings = localStorage.getItem(name);
  return settings ? JSON.parse(settings) : undefined;
};

export const saveToLocalStorage = (name, obj) => {
  localStorage.setItem(name, JSON.stringify(obj));
};
