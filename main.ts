import * as fs from "node:fs";
import * as path from "node:path";

const ENTRY =
  "byealong — the awkward walk in the same direction after saying goodbye.";

if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(
    `entry must be 1-140 characters, got ${ENTRY.length}`,
  );
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
const separatorIndex = ENTRY.indexOf(" — ");
if (separatorIndex <= 0 || separatorIndex + 3 >= ENTRY.length) {
  throw new Error("entry must be 'word — definition' with a non-empty word and definition");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${ENTRY.length} chars): ${ENTRY}`);
