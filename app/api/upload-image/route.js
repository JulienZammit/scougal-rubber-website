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

    let uploadedUrl = null;

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient("images");
    await containerClient.createIfNotExists();

    return new Promise((resolve, reject) => {
      const bb = busboy({ headers: { "content-type": contentType } });

      bb.on("file", (fieldname, file, info) => {
        if (fieldname !== "file") {
          // skip if not the right field
          file.resume();
          return;
        }
        const { filename, mimeType } = info;
        const chunks = [];

        file.on("data", (chunk) => {
          chunks.push(chunk);
        });

        file.on("end", async () => {
          // Actually upload to Azure
          const buffer = Buffer.concat(chunks);
          const ext = filename ? filename.substring(filename.lastIndexOf(".")) : "";
          const blobName = `${randomUUID()}${ext}`;

          try {
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(buffer, {
              blobHTTPHeaders: { blobContentType: mimeType },
            });
            uploadedUrl = blockBlobClient.url;
          } catch (err) {
            reject(err);
          }
        });
      });

      // IMPORTANT: use "finish" instead of "close"
      bb.on("finish", () => {
        if (uploadedUrl) {
          resolve(NextResponse.json({ imageUrl: uploadedUrl }));
        } else {
          resolve(
            NextResponse.json({ error: "No file uploaded" }, { status: 400 })
          );
        }
      });

      bb.on("error", (err) => reject(err));

      // Read request body with getReader + push to busboy
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
