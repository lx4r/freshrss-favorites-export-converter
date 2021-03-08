export async function getFavoritesFileContent(
  filePath: string
): Promise<string> {
  const fileContent = await Deno.readTextFile(filePath);
  if (fileContent === "") {
    throw new Error("empty file");
  }
  return fileContent;
}

interface RawFavoriteInfo {
  published: number;
  title: string;
  alternate: { href: string }[];
  origin: FavoriteInfoOrigin;
}

interface FavoriteInfoOrigin {
  title: string;
  htmlUrl: string;
}

function isFavoriteInfoOrigin(input: unknown): input is FavoriteInfoOrigin {
  const potentialOrigin = input as FavoriteInfoOrigin;
  return (
    typeof potentialOrigin === "object" &&
    typeof potentialOrigin.title === "string" &&
    typeof potentialOrigin.htmlUrl === "string"
  );
}

export type FavoriteInfo = {
  url: string;
  title: string;
  sourceName: string;
  sourceURL: string;
  date: Date;
};

function isRawFavoriteInfo(input: unknown): input is RawFavoriteInfo {
  const potentialFavoriteInfo = input as RawFavoriteInfo;
  if (
    typeof potentialFavoriteInfo.published === "number" &&
    typeof potentialFavoriteInfo.title === "string" &&
    Array.isArray(potentialFavoriteInfo.alternate) &&
    isFavoriteInfoOrigin(potentialFavoriteInfo.origin)
  ) {
    return true;
  }
  return false;
}

function isRawFavoriteInfoArray(input: unknown): input is RawFavoriteInfo[] {
  if (!Array.isArray(input)) {
    return false;
  }
  return input.every((elem) => isRawFavoriteInfo(elem));
}

export function filterFavoriteInfo(
  parsedJSON: Record<string, unknown>
): FavoriteInfo[] {
  if (!isRawFavoriteInfoArray(parsedJSON.items)) {
    throw new Error(
      "invalid JSON, e.g. because attributes of favorites are missing"
    );
  }
  return parsedJSON.items.map(
    ({
      title,
      origin,
      alternate,
      published,
    }: {
      title: string;
      origin: { title: string; htmlUrl: string };
      alternate: { href: string }[];
      published: number; // in seconds
    }) => ({
      title,
      url: alternate[0].href,
      sourceName: origin.title,
      sourceURL: origin.htmlUrl,
      date: new Date(published * 1000),
    })
  );
}
