import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/schemaTypes";
import { structure } from "./src/structure";

const previewUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";

export default defineConfig({
  name: "iam",
  title: "Institut Africain du Médicament",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "demo",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: previewUrl,
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
