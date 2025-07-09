import fs from "fs";
import path from "path";

const src = path.resolve("public", "05-versions-space.pdf");
const dest = path.resolve("node_modules", "pdfjs-dist", "legacy", "build", "05-versions-space.pdf");

fs.mkdirSync(path.dirname(dest), { recursive: true });

fs.copyFileSync(src, dest);

console.log("✔ Dummy PDF copied to pdfjs-dist for pdf-parse");
