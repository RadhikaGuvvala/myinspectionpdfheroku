import getStream from "into-stream";

import azureStorage from "azure-storage";

import { BlockBlobClient } from "@azure/storage-blob";

const blobService1 = azureStorage.createBlobService(
  process.env.AZURE_CONNECTION_STRING
);

const containerName = process.env.AZURE_CONTAINER;

const getBlobName = (originalName) => {
  const identifier = Math.random().toString().replace(/0\./, ""); // remove "0." from start of string
  return `${identifier}-${originalName}`;
};

export function uploadToAzure(file, cb) {
  const blobName = getBlobName(file.originalname),
    stream = getStream(file.buffer),
    streamLength = file.buffer.length,
    options = {
      contentSetting: {
        contentType: file.mimetype,
      },
    };

  blobService1.createBlockBlobFromStream(
    containerName,
    blobName,
    stream,
    streamLength,
    options,
    (err, result) => {
      if (err) {
        console.log(err);
        cb(err);
        return;
      }

      cb(null, result);
    }
  );
}

export async function uploadToAzure2(file, cb) {
  const blobName = getBlobName(file.originalname),
    stream = getStream(file.buffer),
    streamLength = file.buffer.length,
    options = {
      blobHTTPHeaders: {
        blobContentType: file.mimetype,
      },
    };
  try {
    const blobService4 = new BlockBlobClient(
      process.env.AZURE_CONNECTION_STRING,
      containerName,
      blobName,
      options
    );
    let a = await blobService4.uploadStream(stream, streamLength, 1, options);
    cb(null, { result: a, name: blobName });
  } catch (err) {
    console.log(err, "error in here");
    cb(err);
  }
}

export async function uploadToAzureFromUrl(url, name) {
  const blobName = getBlobName(name);

  try {
    const blobService4 = new BlockBlobClient(
      process.env.AZURE_CONNECTION_STRING,
      containerName,
      blobName
      // options
    );
    let a = await blobService4.syncCopyFromURL(url);
    return { ...a, name: blobName };
  } catch (err) {
    console.log(err);
    return err;
  }
}
