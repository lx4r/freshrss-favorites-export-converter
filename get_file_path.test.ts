import {
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.89.0/testing/asserts.ts";
import { getFilePath } from "./get_file_path.ts";

Deno.test("getFilePath(): throws when no arguments passed", () => {
  assertThrows(
    () => getFilePath([]),
    undefined,
    "No path to the JSON file specified."
  );
});
Deno.test("getFilePath(): throws when empty file name passed", () => {
  assertThrows(
    () => getFilePath([""]),
    undefined,
    "Empty path to the JSON file specified."
  );
});
Deno.test("getFilePath(): gets file path when valid file name passed", () => {
  const jsonFileName = "my_file.json";
  assertStrictEquals(getFilePath([jsonFileName]), jsonFileName);
});
