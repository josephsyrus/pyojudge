export function normalizeOutput(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n") // windows line endings
    .replace(/\r/g, "\n") // old Mac line endings
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

export function outputsMatch(expected: string, actual: string): boolean {
  return normalizeOutput(expected) === normalizeOutput(actual);
}

export function stripPyodidePaths(message: string): string {
  // Remove internal Pyodide file paths like /lib/python3.xx/...
  return message
    .replace(/File "\/[^"]*",\s*/g, "")
    .replace(/\s*\(\/[^)]*\)/g, "")
    .trim();
}
