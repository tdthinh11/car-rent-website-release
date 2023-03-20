const getUrl = (url: string) => {
  return new RegExp(`${url}/*`);
};

export { getUrl };
