import {
  assertStrictEquals,
  assertThrows,
  assertThrowsAsync,
  assertEquals,
} from "https://deno.land/std@0.89.0/testing/asserts.ts";
import {
  getFavoritesFileContent,
  filterFavoriteInfo,
  RawFavoriteInfo,
} from "./get_data.ts";

const VALID_RAW_FAVORITE_INFO: RawFavoriteInfo = {
  title: "Lorem ipsum",
  published: 1234,
  alternate: [{ href: "https://example.com/bobs-blog/567" }],
  origin: { title: "Lorem ipsum", htmlUrl: "https://example.com/bobs-blog" },
};

function getMockedFileGetter(
  fileContentToReturn: string
): (path: string | URL) => Promise<string> {
  return (_path: string | URL) =>
    new Promise<string>((resolve) => {
      resolve(fileContentToReturn);
    });
}

function getInvalidParsedFavoritesJSON(
  rawFavoriteInfo: unknown
): Record<string, unknown> {
  return { items: [rawFavoriteInfo] };
}

// TODO: Test number of executions of the file getter
Deno.test("getFavoritesFileContent(): throws on empty file", () => {
  const mockedFileGetter = getMockedFileGetter("");

  assertThrowsAsync(
    () => getFavoritesFileContent(mockedFileGetter, "some path"),
    undefined,
    "empty file"
  );
});
Deno.test("getFavoritesFileContent(): returns file content", async () => {
  const fileContent = "file content";
  const mockedFileGetter = getMockedFileGetter(fileContent);

  const actual = await getFavoritesFileContent(mockedFileGetter, "some path");
  assertStrictEquals(actual, fileContent);
});

Deno.test(
  'filterFavoriteInfo(): rejects invalid parsed JSON (no "items" attribute)',
  () => {
    const invalid = {};
    assertThrows(() => filterFavoriteInfo(invalid));
  }
);
Deno.test(
  'filterFavoriteInfo(): rejects invalid parsed JSON (no array in "items" attribute)',
  () => {
    const invalid = { items: {} };
    assertThrows(() => filterFavoriteInfo(invalid));
  }
);
Deno.test(
  "filterFavoriteInfo(): rejects invalid parsed JSON (raw favorite info without title)",
  () => {
    const { title, ...invalidRawFavoriteInfo } = VALID_RAW_FAVORITE_INFO;

    assertThrows(() =>
      filterFavoriteInfo(getInvalidParsedFavoritesJSON(invalidRawFavoriteInfo))
    );
  }
);
Deno.test(
  "filterFavoriteInfo(): rejects invalid parsed JSON (raw favorite info without publishing date)",
  () => {
    const { published, ...invalidRawFavoriteInfo } = VALID_RAW_FAVORITE_INFO;

    assertThrows(() =>
      filterFavoriteInfo(getInvalidParsedFavoritesJSON(invalidRawFavoriteInfo))
    );
  }
);
Deno.test(
  "filterFavoriteInfo(): rejects invalid parsed JSON (raw favorite info without alternate)",
  () => {
    const { alternate, ...invalidRawFavoriteInfo } = VALID_RAW_FAVORITE_INFO;

    assertThrows(() =>
      filterFavoriteInfo(getInvalidParsedFavoritesJSON(invalidRawFavoriteInfo))
    );
  }
);
Deno.test(
  "filterFavoriteInfo(): rejects invalid parsed JSON (raw favorite info with alternate without href)",
  () => {
    const invalidRawFavoriteInfo = {
      ...VALID_RAW_FAVORITE_INFO,
      alternate: [{}],
    };

    assertThrows(() =>
      filterFavoriteInfo(getInvalidParsedFavoritesJSON(invalidRawFavoriteInfo))
    );
  }
);
Deno.test(
  "filterFavoriteInfo(): rejects invalid parsed JSON (raw favorite info without origin)",
  () => {
    const { origin, ...invalidRawFavoriteInfo } = VALID_RAW_FAVORITE_INFO;

    assertThrows(() =>
      filterFavoriteInfo(getInvalidParsedFavoritesJSON(invalidRawFavoriteInfo))
    );
  }
);
Deno.test(
  'filterFavoriteInfo(): should accept valid parsed JSON (empty array in "items" attribute)',
  () => {
    const mockedJSON = { items: [] };
    assertEquals(filterFavoriteInfo(mockedJSON), []);
  }
);
Deno.test("filterFavoriteInfo(): should accept valid parsed JSON", () => {
  const validParsedJSON = {
    id: "awesome-id",
    title: "List of favourite articles",
    author: "alice",
    items: [
      {
        id: "https://example.com/bobs-blog/1234",
        timestampUsec: "1538240704486480",
        categories: ["web-security", "javascript"],
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        author: "Bob",
        published: 1537895060,
        updated: 1537996570,
        alternate: [
          {
            href: "https://example.com/bobs-blog/567",
            type: "text/html",
          },
        ],
        content: {
          content: "Lorem ipsum dolor sit amet",
        },
        origin: {
          streamId: 42,
          title: "Bob's Blog",
          htmlUrl: "https://example.com/bobs-blog",
          feedUrl: "https://example.com/bobs-blog/feed",
        },
      },
    ],
  };
  const expected = [
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      url: "https://example.com/bobs-blog/567",
      sourceName: "Bob's Blog",
      sourceUrl: "https://example.com/bobs-blog",
      date: new Date(1537895060 * 1000),
    },
  ];

  assertEquals(filterFavoriteInfo(validParsedJSON), expected);
});
