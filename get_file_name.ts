export function getFileName(): string {
  const scriptArgs = Deno.args;
  if (scriptArgs.length < 1) {
    throw new Error("no JSON file specified");
  }
  const filename = Deno.args[0];
  if (filename === "") {
    throw new Error("empty file name specified");
  }
  return filename;
}
