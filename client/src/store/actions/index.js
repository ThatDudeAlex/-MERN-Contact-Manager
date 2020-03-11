import { ADD_ARTICLE } from "../constants/actionTypess";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}
