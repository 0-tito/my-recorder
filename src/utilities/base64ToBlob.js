export default function base64ToBlob(base64, mime = "text/plain") {
 const byteString = atob(base64.split(',')[1]); // Decode Base64 to raw binary
 const array = new Uint8Array(byteString.length);

 for (let i = 0; i < byteString.length; i++) {
array[i] = byteString.charCodeAt(i);
 }

 return new Blob([array], { type: mime });
}