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

async function getMimeTypeFromArrayBuffer(arrayBuffer : any) {
    const uint8arr = new Uint8Array(arrayBuffer)
  
    const len = 4
    if (uint8arr.length >= len) {
      let signatureArr = new Array(len)
      for (let i = 0; i < len; i++)
        signatureArr[i] = (new Uint8Array(arrayBuffer))[i].toString(16)
      const signature = signatureArr.join('').toUpperCase()
        // 25504446 - pdf
        // 3C737667 - svg
      switch (signature) {
        case '89504E47':
          return 'image/png'
        case '47494638':
          return 'image/gif'
        case '25504446':
          return 'application/pdf'
        case 'FFD8FFDB':
        case 'FFD8FFE0':
          return 'image/jpeg'
        case '504B0304':
          return 'application/zip'
        case '3C737667':
          return 'image/svg+xml'
        default:
          return null
      }
    }
    return null
  }

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export {dateFormattor, panRegex, emailRegex, getMimeTypeFromArrayBuffer}