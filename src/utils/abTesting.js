import { getCookie, setCookie } from './cookies';

const AB_TEST_COOKIE_NAME = 'veg';
const AB_TEST_VALUE = '1';

export const isVegetarianVariant = () => {
  const vegCookie = getCookie(AB_TEST_COOKIE_NAME);
  return vegCookie === AB_TEST_VALUE;
};

export const setVegetarianVariant = () => {
  setCookie(AB_TEST_COOKIE_NAME, AB_TEST_VALUE);
};

export const clearVegetarianVariant = () => {
  setCookie(AB_TEST_COOKIE_NAME, '0');
};
