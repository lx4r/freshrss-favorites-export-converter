import {
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.89.0/testing/asserts.ts";
import { getFileName } from "./get_file_name.ts";

Deno.test("getFileName(): no arguments passed", () => {
  assertThrows(() => getFileName([]), undefined, "no JSON file specified");
});
Deno.test("getFileName(): empty file name passed", () => {
  assertThrows(() => getFileName([""]), undefined, "empty JSON file specified");
});
Deno.test("getFileName(): valid file name passed", () => {
  const jsonFileName = "my_file.json";
  assertStrictEquals(getFileName([jsonFileName]), jsonFileName);
});
