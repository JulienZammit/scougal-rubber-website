import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  try {
    const { filename } = await request.json();
    if (!filename) {
      return NextResponse.json({ error: "No filename" }, { status: 400 });
    }

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      return NextResponse.json(
        { error: "Missing AZURE_STORAGE_CONNECTION_STRING" },
        { status: 500 }
      );
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient("posts");

    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    const delRes = await blockBlobClient.deleteIfExists();
    if (!delRes.succeeded) {
      return NextResponse.json({ error: "File does not exist" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
