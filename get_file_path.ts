export function getFilePath(scriptArgs: string[]): string {
  if (scriptArgs.length < 1) {
    throw new Error("no JSON file specified");
  }
  const filename = scriptArgs[0];
  if (filename === "") {
    throw new Error("empty JSON file specified");
  }
  return filename;
}
