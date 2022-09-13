/**
 * Хелперы для форматирования даты
 * Первая функция для данных в формате Date
 * Вторая функция для строки времени формата ISO (строка с временем с бека)
 * Виды options можно посмотреть на
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 * По дефолту выводит день, месяц и год
 * Вид вывода определяется по языку браузера пользователя
 */


export const formatDate = (date, options) => {
  const userLocale = navigator.language;
  return date.toLocaleDateString(userLocale, options);
};

export const formatDateFromString = (dateString, options) => {
  const date = new Date(dateString);
  return formatDate(date, options);
};


/**
 * Хелпер для деления массива на чанки по определенному колличеству
 */

export const formatArrayToChunks = (items, chunkSize) => {
  if (!chunkSize) return items;
  const chunksCount = Math.ceil(items.length / chunkSize);

  return Array.from(Array(chunksCount).keys())
      .map((item) => items.slice(item * chunkSize, item * chunkSize + chunkSize));
};


// преобразует дату и выводит время актуальное
export const getLocaleTime = (dateString) => {
  const differenceBetweenTimeZone = new Date().getTimezoneOffset()*-60000;
  const now = new Date(dateString).getTime();
  return new Date(now + differenceBetweenTimeZone);
};
