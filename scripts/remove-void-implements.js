const fs = require("fs");

const filePaths = ["./api/classes/googlepayweb.md"];

for (const path of filePaths) {
  try {
    let data = fs.readFileSync(path, { encoding: "utf-8" });
    data = data.replace(/Overrides of: void/g, "");
    fs.writeFileSync(path, data);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

process.exit(0);
