const fs = require("fs");
const path = require("path");

const srcPath = path.resolve(__dirname, "../src/engine/slotMachine.js");
const destPath = path.resolve(__dirname, "../docs/js/slotMachine.js");

function ensureDestinationDir(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function copyEngine() {
    ensureDestinationDir(destPath);
    const contents = fs.readFileSync(srcPath, "utf8");
    fs.writeFileSync(destPath, contents, "utf8");
    console.log(`Copied slot machine engine to ${destPath}`);
}

copyEngine();
