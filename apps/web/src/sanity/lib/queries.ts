import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  montrealEnabled,
  legalName,
  contactEmail
}`);

export const approvedSearchQuery = defineQuery(`*[
  language == $locale &&
  editorialStatus == "approved" &&
  (!defined(verificationStatus) || verificationStatus == "verified") &&
  [title, coalesce(excerpt, ""), coalesce(summary, "")] match $search
][0...20]{
  "id": _id,
  "locale": language,
  "slug": slug.current,
  "kind": _type,
  title,
  "summary": coalesce(summary, excerpt),
  editorialStatus,
  verificationStatus,
  "sourceUrl": sources[0].url
}`);

export const approvedBySlugQuery = defineQuery(`*[
  language == $locale &&
  slug.current == $slug &&
  editorialStatus == "approved" &&
  (!defined(verificationStatus) || verificationStatus == "verified")
][0]{
  "id": _id,
  "locale": language,
  "slug": slug.current,
  "kind": _type,
  title,
  "summary": excerpt,
  body,
  editorialStatus,
  verificationStatus,
  verifiedAt,
  "sourceTitle": sources[0].title,
  "sourceUrl": sources[0].url
}`);
