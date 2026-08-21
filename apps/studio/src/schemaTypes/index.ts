import { portableText, source } from "./objects";
import {
  alertDocuments,
  navigation,
  page,
  peopleDocuments,
  programmeDocuments,
  redirect,
  scientificDocuments,
  siteSettings,
} from "./documents";

export const schemaTypes = [
  source,
  portableText,
  siteSettings,
  navigation,
  page,
  redirect,
  ...programmeDocuments,
  ...scientificDocuments,
  ...peopleDocuments,
  ...alertDocuments,
];
