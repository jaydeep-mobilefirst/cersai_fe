const dateFormattor = (date : Date) => {
     // Ensure the input is a Date object
  if (!(date instanceof Date)) date = new Date(date);

  let month = '' + (date.getMonth() + 1), // Months are zero-based
      day = '' + date.getDate(),
      year = date.getFullYear();

  // If day or month are less than 10, prepend with 0
  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('-');
}


export {dateFormattor}