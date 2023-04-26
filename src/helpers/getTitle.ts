import type { Title, Option } from "~/models/FilterOptions";
function getTitle(obj: Option, chosenLanguage: "ua" | "eng"): string {
  let result;

  if (typeof obj?.title === "string") {
    result = obj.title;
  } else {
    if (typeof obj === "string") {
      result = obj;
    } else {
      result = obj?.title[chosenLanguage];
    }
  }

  return result;
}
export default getTitle;
