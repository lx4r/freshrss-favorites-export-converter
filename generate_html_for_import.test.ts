import { assertStrictEquals } from "https://deno.land/std@0.89.0/testing/asserts.ts";
import { generateHTMLForImport } from "./generate_html_for_import.ts";
import {
  MOCK_DATE,
  MOCK_DATE_2,
  VALID_FAVORITE_INFO_1,
  VALID_FAVORITE_INFO_2,
} from "./test_data.ts";

Deno.test(
  "generateHTMLForImport(): generates a valid HTML scaffold when an empty array is passed",
  () => {
    const expected =
      '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<!-- This is an automatically generated file.\n     It will be read and overwritten.\n     DO NOT EDIT! -->\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n<TITLE>Bookmarks</TITLE>\n<H1>Bookmarks Menu</H1>\n<DL><p>\n    <DT><H3 ADD_DATE="1537895060" LAST_MODIFIED="1537895060" UNFILED_BOOKMARKS_FOLDER="true">Other Bookmarks</H3>\n    <DL><p>\n        <DT><H3 ADD_DATE="1615304840" LAST_MODIFIED="1615305874">FreshRSS Favorites</H3>\n        <DL><p>\n\n        </DL><p>\n    </DL><p>\n</DL>';

    assertStrictEquals(generateHTMLForImport([], MOCK_DATE), expected);
  }
);

Deno.test(
  "generateHTMLForImport(): generates a valid HTML file when one favorite info is passed",
  () => {
    const expected = `<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<!-- This is an automatically generated file.\n     It will be read and overwritten.\n     DO NOT EDIT! -->\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n<TITLE>Bookmarks</TITLE>\n<H1>Bookmarks Menu</H1>\n<DL><p>\n    <DT><H3 ADD_DATE="1537895060" LAST_MODIFIED="1537895060" UNFILED_BOOKMARKS_FOLDER="true">Other Bookmarks</H3>\n    <DL><p>\n        <DT><H3 ADD_DATE="1615304840" LAST_MODIFIED="1615305874">FreshRSS Favorites</H3>\n        <DL><p>\n            <DT><A HREF="https://example.com/bobs-blog/567" ADD_DATE="1537895060" LAST_MODIFIED="1537895060">Lorem ipsum</A>\n        </DL><p>\n    </DL><p>\n</DL>`;

    assertStrictEquals(
      generateHTMLForImport([VALID_FAVORITE_INFO_1], MOCK_DATE),
      expected
    );
  }
);
Deno.test(
  "generateHTMLForImport(): generates a valid HTML file when two favorite infos are passed",
  () => {
    const expected = `<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<!-- This is an automatically generated file.\n     It will be read and overwritten.\n     DO NOT EDIT! -->\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n<TITLE>Bookmarks</TITLE>\n<H1>Bookmarks Menu</H1>\n<DL><p>\n    <DT><H3 ADD_DATE="0" LAST_MODIFIED="0" UNFILED_BOOKMARKS_FOLDER="true">Other Bookmarks</H3>\n    <DL><p>\n        <DT><H3 ADD_DATE="1615304840" LAST_MODIFIED="1615305874">FreshRSS Favorites</H3>\n        <DL><p>\n            <DT><A HREF="https://example.com/bobs-blog/567" ADD_DATE="1537895060" LAST_MODIFIED="0">Lorem ipsum</A>\n            <DT><A HREF="https://example.com/alices-blog/987" ADD_DATE="0" LAST_MODIFIED="0">Donec pede justo</A>\n        </DL><p>\n    </DL><p>\n</DL>`;

    assertStrictEquals(
      generateHTMLForImport(
        [VALID_FAVORITE_INFO_1, VALID_FAVORITE_INFO_2],
        MOCK_DATE_2
      ),
      expected
    );
  }
);
