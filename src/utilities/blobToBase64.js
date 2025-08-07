export default async function blobToBase64(blob){
  if (!blob) return ;
  return new Promise((resolve,reject) => {
 const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);  
  })
} 
