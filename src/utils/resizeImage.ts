import Compress from 'compress.js';

const compress = new Compress();

async function resizeImage(file: any) {
  const resizedImage = await compress.compress([file], {
    size: 2, 
    quality: 1, 
    maxWidth: 28, 
    maxHeight: 28,
    resize: true
  })
  const img = resizedImage[0];
  const base64str = img.data;
  const imgExt = img.ext;
  const resizedFile = Compress.convertBase64ToFile(base64str, imgExt);
  return resizedFile;
}

export default resizeImage;