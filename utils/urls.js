export const API_URL = process.env.API_URL || "http://localhost:1337";

export const imgToUrl = (image) => {
  if (!image) {
    return "";
  }
  if (image.url.indexOf("/") === 0) {
    return `${API_URL}${image.url}`;
  }
  return image.url;
};
