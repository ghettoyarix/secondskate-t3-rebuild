import type { Title, Option } from "src/models/FilterOptions";
function getTitle(obj: Option, chosenLanguage: "ua" | "eng"): string {
  let result;

  if (typeof obj?.title === "string") {
    result = obj.title;
  } else {
    if (typeof obj === "string") {
      result = obj;
    } else if (obj?.title?.[chosenLanguage]) {
      result = obj?.title[chosenLanguage];
    }
  }

  return result || "";
}
export default getTitle;
