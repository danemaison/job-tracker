export const formatDate = date => {
  if (typeof date.getDate !== 'function') date = new Date(date);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
