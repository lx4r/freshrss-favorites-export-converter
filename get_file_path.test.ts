import {
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.89.0/testing/asserts.ts";
import { getFilePath } from "./get_file_path.ts";

Deno.test("getFilePath(): no arguments passed", () => {
  assertThrows(() => getFilePath([]), undefined, "no JSON file specified");
});
Deno.test("getFilePath(): empty file name passed", () => {
  assertThrows(() => getFilePath([""]), undefined, "empty JSON file specified");
});
Deno.test("getFilePath(): valid file name passed", () => {
  const jsonFileName = "my_file.json";
  assertStrictEquals(getFilePath([jsonFileName]), jsonFileName);
});
