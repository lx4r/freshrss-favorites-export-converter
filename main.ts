import { filterFavoriteInfo, getFavoritesFileContent } from "./get_data.ts";
import { getFilePath } from "./get_file_path.ts";
import { generateHTML } from "./generate_html.ts";

const filePath = getFilePath(Deno.args);
getFavoritesFileContent(Deno.readTextFile, filePath)
  .then((content) => {
    return generateHTML(filterFavoriteInfo(JSON.parse(content)));
  })
  .then((html) => {
    return Deno.writeTextFile("export.html", html);
  })
  .then((_) => console.log("File successfully written"));
