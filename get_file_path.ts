export function getFilePath(scriptArgs: string[]): string {
  if (scriptArgs.length < 1) {
    throw new Error("No path to the JSON file specified.");
  }
  const filename = scriptArgs[0];
  if (filename === "") {
    throw new Error("Empty path to the JSON file specified.");
  }
  return filename;
}
