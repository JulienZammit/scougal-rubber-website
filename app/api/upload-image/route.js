import { NextResponse } from "next/server";
import busboy from "busboy";
import { BlobServiceClient } from "@azure/storage-blob";
import { randomUUID } from "crypto";

// Import NextAuth
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

// Nécessaire pour exécuter cette API côté "nodejs" (pour Busboy)
export const runtime = "nodejs"

export async function POST(request) {
  // 1) Vérification de la session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    // On stockera le fichier en mémoire
    let fileBuffer = null;
    let fileExt = "";
    let fileMime = "";

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      connectionString
    );
    const containerClient = blobServiceClient.getContainerClient("images");
    await containerClient.createIfNotExists();

    // On encapsule la logique Busboy dans une Promise pour gérer l'async
    return new Promise((resolve, reject) => {
      const bb = busboy({ headers: { "content-type": contentType } });

      bb.on("file", (fieldname, file, info) => {
        if (fieldname !== "file") {
          // Ignore les autres champs
          file.resume();
          return;
        }

        const { filename, mimeType } = info;
        fileMime = mimeType;
        fileExt = filename
          ? filename.substring(filename.lastIndexOf("."))
          : "";

        // Accumule les chunks pour recréer le fichier en mémoire
        const chunks = [];
        file.on("data", (chunk) => {
          chunks.push(chunk);
        });

        file.on("end", () => {
          fileBuffer = Buffer.concat(chunks);
        });
      });

      bb.on("finish", async () => {
        try {
          if (!fileBuffer) {
            // Aucun fichier reçu
            return resolve(
              NextResponse.json({ error: "No file uploaded" }, { status: 400 })
            );
          }

          // On upload sur Azure
          const blobName = `${randomUUID()}${fileExt}`;
          const blockBlobClient = containerClient.getBlockBlobClient(blobName);

          await blockBlobClient.uploadData(fileBuffer, {
            blobHTTPHeaders: { blobContentType: fileMime },
          });

          const uploadedUrl = blockBlobClient.url;
          // Renvoie l'URL de l'image uploadée
          return resolve(NextResponse.json({ imageUrl: uploadedUrl }));
        } catch (err) {
          return reject(err);
        }
      });

      bb.on("error", (err) => reject(err));

      // On pipe le flux du body dans busboy
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
