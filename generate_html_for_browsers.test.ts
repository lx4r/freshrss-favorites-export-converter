import { assertStrictEquals } from "https://deno.land/std@0.89.0/testing/asserts.ts";
import { generateHTMLForBrowsers } from "./generate_html_for_browsers.ts";
import { FavoriteInfo } from "./get_data.ts";

Deno.test(
  "generateHTML(): generates a valid HTML scaffold when an empty array is passed",
  () => {
    const expected =
      '\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>FreshRSS Favorites Export</title>\n  </head>\n  \n  <body>\n    <h1>FreshRSS Favorites Export</h1>\n    <table>\n      <tr>\n        <th>Date</th>\n        <th>Source</th>\n        <th>Title</th>\n      </tr>\n\n    </table>\n  </body>\n</html>';

    assertStrictEquals(generateHTMLForBrowsers([]), expected);
  }
);
const VALID_FAVORITE_INFO_1: FavoriteInfo = {
  url: "https://example.com/bobs-blog/567",
  title: "Lorem ipsum",
  date: new Date(1537895060 * 1000),
  sourceName: "Bob's Blog",
  sourceUrl: "https://example.com/bobs-blog",
};
Deno.test(
  "generateHTMLForBrowsers(): generates a valid HTML file when one favorite info is passed",
  () => {
    const expected = `\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>FreshRSS Favorites Export</title>\n  </head>\n  \n  <body>\n    <h1>FreshRSS Favorites Export</h1>\n    <table>\n      <tr>\n        <th>Date</th>\n        <th>Source</th>\n        <th>Title</th>\n      </tr>\n      <tr>\n        <td>2018-09-25</td>\n        <td>\n          <a href="https://example.com/bobs-blog/567">Lorem ipsum</a>\n        </td>\n        <td>\n          <a href="https://example.com/bobs-blog">Bob's Blog</a>\n        </td>\n      </tr>\n    </table>\n  </body>\n</html>`;

    assertStrictEquals(
      generateHTMLForBrowsers([VALID_FAVORITE_INFO_1]),
      expected
    );
  }
);
Deno.test(
  "generateHTMLForBrowsers(): generates a valid HTML file when two favorite infos are passed",
  () => {
    const VALID_FAVORITE_INFO_2: FavoriteInfo = {
      url: "https://example.com/alices-blog/987",
      title: "Donec pede justo",
      date: new Date(0),
      sourceName: "Alice's Blog",
      sourceUrl: "https://example.com/alices-blog",
    };
    const expected = `\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>FreshRSS Favorites Export</title>\n  </head>\n  \n  <body>\n    <h1>FreshRSS Favorites Export</h1>\n    <table>\n      <tr>\n        <th>Date</th>\n        <th>Source</th>\n        <th>Title</th>\n      </tr>\n      <tr>\n        <td>2018-09-25</td>\n        <td>\n          <a href="https://example.com/bobs-blog/567">Lorem ipsum</a>\n        </td>\n        <td>\n          <a href="https://example.com/bobs-blog">Bob's Blog</a>\n        </td>\n      </tr>\n      <tr>\n        <td>1970-01-01</td>\n        <td>\n          <a href="https://example.com/alices-blog/987">Donec pede justo</a>\n        </td>\n        <td>\n          <a href="https://example.com/alices-blog">Alice's Blog</a>\n        </td>\n      </tr>\n    </table>\n  </body>\n</html>`;

    assertStrictEquals(
      generateHTMLForBrowsers([VALID_FAVORITE_INFO_1, VALID_FAVORITE_INFO_2]),
      expected
    );
  }
);
