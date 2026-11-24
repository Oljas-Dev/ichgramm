import fs from "node:fs/promises";
import path from "node:path";

const UPLOAD_DIR = path.resolve("uploads");

export async function deleteUploadedFile(imageUrl) {
  if (!imageUrl?.startsWith("/uploads/")) return;

  const filename = imageUrl.slice("/uploads/".length);

  // Prevent path traversal
  if (!filename || path.basename(filename) !== filename) {
    throw new Error("Invalid upload path");
  }

  const filePath = path.join(UPLOAD_DIR, filename);

  try {
    await fs.unlink(filePath);
    console.log(`Deleted uploaded file: ${filename}`);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
}
