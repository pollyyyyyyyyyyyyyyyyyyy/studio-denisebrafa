// Rigenera il QR code e il PDF della locandina.
// Uso (dalla cartella strumenti):  npm install  &&  node genera-locandina.mjs [indirizzo]
// Indirizzo predefinito: /campus, che porta al calendario del Campus.
import QRCode from "qrcode";
import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

// Playwright: serve installato (npm i -D playwright && npx playwright install chromium)
const { chromium } = createRequire(import.meta.url)("playwright");

const url = process.argv[2] || "https://studio-denisebrafa.vercel.app/campus";
const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../locandina");

const svg = await QRCode.toString(url, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 0,
  color: { dark: "#2c3330", light: "#ffffff" },
});
await writeFile(path.join(dir, "qr.svg"), svg);
console.log("QR ->", url);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(path.join(dir, "locandina.html")).href, { waitUntil: "networkidle" });
await page.pdf({ path: path.join(dir, "locandina.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
await page.setViewportSize({ width: 794, height: 1123 });
await page.emulateMedia({ media: "print" });
await page.screenshot({ path: path.join(dir, "locandina.png"), clip: { x: 0, y: 0, width: 794, height: 1123 }, scale: "device" });
await browser.close();
console.log("Creati locandina.pdf e locandina.png");
