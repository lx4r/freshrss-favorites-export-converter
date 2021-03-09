import { FavoriteInfo } from "./get_data.ts";

export const MOCK_DATE = new Date(1537895060 * 1000);
export const VALID_FAVORITE_INFO_1: FavoriteInfo = {
  url: "https://example.com/bobs-blog/567",
  title: "Lorem ipsum",
  date: MOCK_DATE,
  sourceName: "Bob's Blog",
  sourceUrl: "https://example.com/bobs-blog",
};

export const MOCK_DATE_2 = new Date(0);
export const VALID_FAVORITE_INFO_2: FavoriteInfo = {
  url: "https://example.com/alices-blog/987",
  title: "Donec pede justo",
  date: MOCK_DATE_2,
  sourceName: "Alice's Blog",
  sourceUrl: "https://example.com/alices-blog",
};
