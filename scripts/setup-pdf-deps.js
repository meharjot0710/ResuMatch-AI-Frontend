// scripts/setup-pdf-deps.js

import fs from "fs";
import path from "path";

// ✅ Keep the file in public/test/data/ or wherever you prefer
const src = path.resolve("public", "test", "data", "05-versions-space.pdf");

// ✅ Correct destination path — NO extra /test/data in destination
const dest = path.resolve("node_modules", "pdfjs-dist", "legacy", "build", "05-versions-space.pdf");

try {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log("✔ Dummy PDF copied to: " + dest);
} catch (err) {
  console.error("❌ Failed to copy dummy PDF:", err);
  process.exit(1);
}
