// scripts/setup-pdf-deps.js

import fs from "fs";
import path from "path";

const src = path.resolve("public", "05-versions-space.pdf");
const dest = path.resolve("node_modules", "pdfjs-dist", "legacy", "build", "test/data/05-versions-space.pdf");

try {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log("✔ Dummy PDF copied to pdfjs-dist/legacy/build/");
} catch (err) {
  console.error("❌ Failed to copy dummy PDF:", err);
  process.exit(1);
}
