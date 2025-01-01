import { NextResponse } from "next/server";
import busboy from "busboy";
import { BlobServiceClient } from "@azure/storage-blob";
import { randomUUID } from "crypto";

export const config = {
  runtime: "nodejs",
};

export async function POST(request) {
  try {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      return NextResponse.json(
        { error: "Missing AZURE_STORAGE_CONNECTION_STRING" },
        { status: 500 }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // We'll store the file data in memory
    let fileBuffer = null;
    let fileExt = "";
    let fileMime = "";

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient("images");
    await containerClient.createIfNotExists();

    return new Promise((resolve, reject) => {
      const bb = busboy({ headers: { "content-type": contentType } });

      bb.on("file", (fieldname, file, info) => {
        if (fieldname !== "file") {
          // skip any other fields
          file.resume();
          return;
        }
        const { filename, mimeType } = info;
        fileMime = mimeType;
        fileExt = filename
          ? filename.substring(filename.lastIndexOf(".")) 
          : "";

        // We'll accumulate all chunks in memory
        const chunks = [];
        file.on("data", (chunk) => {
          chunks.push(chunk);
        });

        file.on("end", () => {
          // Store the entire file in memory for later
          fileBuffer = Buffer.concat(chunks);
        });
      });

      bb.on("finish", async () => {
        try {
          if (!fileBuffer) {
            // We never got a file
            return resolve(
              NextResponse.json({ error: "No file uploaded" }, { status: 400 })
            );
          }

          // Now do the actual Azure upload
          const blobName = `${randomUUID()}${fileExt}`;
          const blockBlobClient = containerClient.getBlockBlobClient(blobName);
          await blockBlobClient.uploadData(fileBuffer, {
            blobHTTPHeaders: { blobContentType: fileMime },
          });

          const uploadedUrl = blockBlobClient.url;
          // Return final result
          return resolve(NextResponse.json({ imageUrl: uploadedUrl }));
        } catch (err) {
          return reject(err);
        }
      });

      bb.on("error", (err) => reject(err));

      // Pipe the request body to busboy
      const reader = request.body.getReader();

      async function read() {
        const { done, value } = await reader.read();
        if (done) {
          bb.end();
          return;
        }
        bb.write(value);
        return read();
      }

      read();
    });
  } catch (err) {
    console.error("Upload image error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
