export const convertFileToBase64 = (
  file: File,
  onHexReady: (hex: string) => void,
  onBase64Ready: (base64: string) => void
) => {
  const reader = new FileReader();

  reader.onload = function (e) {
    const buffer = e.target?.result as ArrayBuffer;
    const byteArray = new Uint8Array(buffer);

    // Convert to hexadecimal
    const hexString = byteArray.reduce(
      (acc, byte) => acc + byte.toString(16).padStart(2, "0"),
      ""
    );
    onHexReady(hexString); // Callback with the hex string

    // Convert hex to Base64
    const base64Encoded = btoa(
      hexString
        .match(/\w{2}/g)
        ?.map((a) => String.fromCharCode(parseInt(a, 16)))
        .join("") || ""
    );
    onBase64Ready(base64Encoded); // Callback with the Base64 string
  };

  reader.readAsArrayBuffer(file);
};

export function convertFileToBase64Async (file : File) : Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const buffer = e.target?.result;
      if (buffer instanceof ArrayBuffer) {
        const byteArray = new Uint8Array(buffer);

        // Convert to hexadecimal
        const hexString = byteArray.reduce(
          (acc, byte) => acc + byte.toString(16).padStart(2, "0"),
          ""
        );

        // Convert hex to Base64
        const base64Encoded = btoa(
          hexString
            .match(/\w{2}/g)
            ?.map((a) => String.fromCharCode(parseInt(a, 16)))
            .join("") || ""
        );

        resolve(base64Encoded);
      } else {
        reject(new Error('Failed to read file as ArrayBuffer'));
      }
    };

    reader.onerror = function () {
      reject(new Error('Error occurred while reading the file'));
    };

    reader.readAsArrayBuffer(file);
  });
}

