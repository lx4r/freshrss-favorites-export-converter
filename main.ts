import { filterFavoriteInfo, getFavoritesFileContent } from "./get_data.ts";
import { getFilePath } from "./get_file_path.ts";
import { generateHTMLForDisplay } from "./generate_html_for_display.ts";
import { generateHTMLForImport } from "./generate_html_for_import.ts";

const FILE_FOR_IMPORT_PATH = "freshrss_favorites_for_firefox_import.html";
const FILE_FOR_DISPLAY_PATH = "freshrss_favorites_for_display.html";

const filePath = getFilePath(Deno.args);
getFavoritesFileContent(Deno.readTextFile, filePath)
  .then((rawFileContent) => JSON.parse(rawFileContent))
  .then(async (parsedContent) => {
    const htmlForDisplay = generateHTMLForDisplay(
      filterFavoriteInfo(parsedContent)
    );
    await Deno.writeTextFile(FILE_FOR_DISPLAY_PATH, htmlForDisplay);
    return parsedContent;
  })
  .then(async (parsedContent) => {
    const htmlForImport = generateHTMLForImport(
      filterFavoriteInfo(parsedContent)
    );
    await Deno.writeTextFile(FILE_FOR_IMPORT_PATH, htmlForImport);
    return parsedContent;
  })
  .then((_) => console.log("Files successfully written"));
