import { filterFavoriteInfo, getFavoritesFileContent } from "./get_data.ts";
import { getFilePath } from "./get_file_path.ts";
import { generateHTMLForDisplay } from "./generate_html_for_display.ts";
import { generateHTMLForImport } from "./generate_html_for_import.ts";

const FILE_FOR_IMPORT_NAME = "freshrss_favorites_for_firefox_import.html";
const FILE_FOR_DISPLAY_NAME = "freshrss_favorites_for_display.html";

function logFileExported(fileName: string, filePurpose: string) {
  console.log(`${filePurpose} successfully saved as ${fileName}`);
}

const filePath = getFilePath(Deno.args);
getFavoritesFileContent(Deno.readTextFile, filePath)
  .then((rawFileContent) => JSON.parse(rawFileContent))
  .then(async (parsedContent) => {
    const htmlForDisplay = generateHTMLForDisplay(
      filterFavoriteInfo(parsedContent)
    );
    await Deno.writeTextFile(FILE_FOR_DISPLAY_NAME, htmlForDisplay);
    logFileExported(FILE_FOR_DISPLAY_NAME, "HTML for display");
    return parsedContent;
  })
  .then(async (parsedContent) => {
    const htmlForImport = generateHTMLForImport(
      filterFavoriteInfo(parsedContent)
    );
    await Deno.writeTextFile(FILE_FOR_IMPORT_NAME, htmlForImport);
    logFileExported(FILE_FOR_IMPORT_NAME, "HTML for import into Firefox");
  })
  .then((_) => console.log("Export finished successfully."))
  .catch((reason) => console.error("An error occurred. Reason:", reason));
