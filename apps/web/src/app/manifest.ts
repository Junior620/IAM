import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Institut Africain du Médicament",
    short_name: "IAM",
    description:
      "Coopération pharmaceutique, scientifique et institutionnelle en Afrique.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EC",
    theme_color: "#0B1830",
    icons: [{ src: "/icon.png", sizes: "256x256", type: "image/png" }],
  };
}
