export async function getFavoritesFileContent(
  fileGetter: (path: string | URL) => Promise<string>,
  filePath: string
): Promise<string> {
  const fileContent = await fileGetter(filePath);
  if (fileContent === "") {
    throw new Error("empty file");
  }
  return fileContent;
}

type RawFavoriteInfoAlternate = { href: string };

export interface RawFavoriteInfo {
  published: number; // in seconds
  title: string;
  alternate: RawFavoriteInfoAlternate[];
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
  sourceUrl: string;
  date: Date;
};

function isRawFavoriteInfoAlternate(
  input: unknown
): input is RawFavoriteInfoAlternate {
  if (typeof (input as RawFavoriteInfoAlternate).href === "string") {
    return true;
  }
  return false;
}

function isRawFavoriteInfoAlternateArray(
  input: unknown
): input is RawFavoriteInfoAlternate[] {
  if (!Array.isArray(input)) {
    return false;
  }
  return input.every((elem) => isRawFavoriteInfoAlternate(elem));
}

function isRawFavoriteInfo(input: unknown): input is RawFavoriteInfo {
  const potentialFavoriteInfo = input as RawFavoriteInfo;
  if (
    typeof potentialFavoriteInfo.published === "number" &&
    typeof potentialFavoriteInfo.title === "string" &&
    isRawFavoriteInfoAlternateArray(potentialFavoriteInfo.alternate) &&
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
    ({ title, origin, alternate, published: publishedInSeconds }) => ({
      title,
      url: alternate[0].href,
      sourceName: origin.title,
      sourceUrl: origin.htmlUrl,
      date: new Date(publishedInSeconds * 1000),
    })
  );
}
