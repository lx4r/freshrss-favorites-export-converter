import { getFavoritesFileContent, filterFavoriteInfo } from "./get_data.ts";
import { getFileName } from "./get_file_name.ts";

const filename = getFileName();
getFavoritesFileContent(filename).then((content) => {
  console.log(filterFavoriteInfo(JSON.parse(content)));
});

export {};
