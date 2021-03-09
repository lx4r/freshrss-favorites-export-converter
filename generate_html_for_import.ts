import { FavoriteInfo } from "./get_data.ts";

function dateToSecondsTimestamp(date: Date): number {
  return Math.floor(date.valueOf() / 1000);
}

function generateFavoriteEntry({ url, date, title }: FavoriteInfo): string {
  return `            <DT><A HREF="${url}" ADD_DATE="${dateToSecondsTimestamp(
    date
  )}" LAST_MODIFIED="${dateToSecondsTimestamp(new Date())}">${title}</A>`;
}

function generateFavoritesListRows(favoriteInfos: FavoriteInfo[]): string[] {
  return favoriteInfos.map((favoriteInfo) =>
    generateFavoriteEntry(favoriteInfo)
  );
}

function generateFavoritesList(tableRowsHTML: string[]): string {
  const currentDateTimstampInSeconds = dateToSecondsTimestamp(new Date());
  return `<DL><p>
    <DT><H3 ADD_DATE="${currentDateTimstampInSeconds}" LAST_MODIFIED="${currentDateTimstampInSeconds}" UNFILED_BOOKMARKS_FOLDER="true">Other Bookmarks</H3>
    <DL><p>
        <DT><H3 ADD_DATE="1615304840" LAST_MODIFIED="1615305874">FreshRSS Favorites</H3>
        <DL><p>
${tableRowsHTML.join("\n")}
        </DL><p>
    </DL><p>
</DL>`;
}

function generateFullHTML(favoritesListHTML: string): string {
  return `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks Menu</H1>
${favoritesListHTML}`;
}

export function generateHTMLForImport(favoriteInfos: FavoriteInfo[]): string {
  return generateFullHTML(
    generateFavoritesList(generateFavoritesListRows(favoriteInfos))
  );
}
