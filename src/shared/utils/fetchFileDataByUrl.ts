import axios from 'axios';

export default async function fetchFileData(url: string) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer', // Fetch the file as a buffer
  });

  const contentType = response.headers['content-type'];
  const buffer = Buffer.from(response.data);

  return { buffer, contentType };
}
