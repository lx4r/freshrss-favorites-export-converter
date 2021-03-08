import { filterFavoriteInfo, getFavoritesFileContent } from "./get_data.ts";
import { getFileName } from "./get_file_name.ts";
import { generateHTML } from "./generate_html.ts";

const filename = getFileName();
getFavoritesFileContent(filename)
  .then((content) => {
    return generateHTML(filterFavoriteInfo(JSON.parse(content)));
  })
  .then((html) => {
    return Deno.writeTextFile("export.html", html);
  })
  .then((_) => console.log("File successfully written"));

export {};
