import { FavoriteInfo } from "./get_data.ts";

function formatFavoriteDate(favoriteDate: Date): string {
  return favoriteDate.toISOString().substring(0, 10);
}

function generateFavoriteTableRow(favoriteInfo: FavoriteInfo): string {
  return `<tr>
  <td>
    ${formatFavoriteDate(favoriteInfo.date)}
  </td>
  <td>
    <a href="${favoriteInfo.url}">${favoriteInfo.title}</a>
  </td>
  <td>
    <a href="${favoriteInfo.sourceURL}">${favoriteInfo.sourceName}</a>
  </td>
</tr>`;
}

function generateFavoriteTableRows(favoriteInfos: FavoriteInfo[]): string[] {
  return favoriteInfos.map((favoriteInfo) =>
    generateFavoriteTableRow(favoriteInfo)
  );
}

function generateFavoritesTable(tableRows: string[]): string {
  return `<table>
  <tr>
    <th>Date</th>
    <th>Source</th>
    <th>Title</th>
  <tr>
  ${tableRows.join("\n")}
</table>`;
}

function generateFullHTML(favoritesTableHTML: string): string {
  return `
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>FreshRSS Favorites Export</title>
  </head>
  
  <body>
    <h1>FreshRSS Favorites Export</h1>
    ${favoritesTableHTML}
  </body>
</html>`;
}

export function generateHTML(favoriteInfos: FavoriteInfo[]): string {
  return generateFullHTML(
    generateFavoritesTable(generateFavoriteTableRows(favoriteInfos)),
  );
}
