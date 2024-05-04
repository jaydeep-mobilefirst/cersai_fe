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
