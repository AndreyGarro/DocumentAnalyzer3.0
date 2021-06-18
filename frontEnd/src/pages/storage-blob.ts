import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';

//const sasToken = process.env.storagesastoken || "se=2021-06-03T05%3A28%3A49Z&sp=rwl&sv=2020-06-12&ss=b&srt=sco&sig=jHDxYT37Z6Vegt0%2B0sbF2yQoO75%2BV6ni6rqZ%2BnK5VLQ%3D"; // Fill string with your SAS token
var sasToken = process.env.storagesastoken || "test";
let user = localStorage.getItem("account")?.toLowerCase();

export var containerName = (user || '');
const storageAccountName = process.env.storageresourcename || "proyectosoa"; // Fill string with your Storage resource name

const createBlobInContainer = async (containerClient: ContainerClient, file: File) => {
  
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadBrowserData(file, options);
}

export const impFileName = async (file: File | null): Promise<string> => {
  if (!file) return "";
  return file.name;
}

const uploadFileToBlob = async (file: File | null, sas: string): Promise<string[]> => {
  console.log("entre");
  sasToken = sas;
  console.log(sasToken);
  if (!file) return [];
  impFileName(file);
  console.log("...: " + file.name);
  localStorage.setItem('nameFile', file.name);
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  const containerClient: ContainerClient = blobService.getContainerClient(containerName);
  await createBlobInContainer(containerClient, file);

  return []
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;