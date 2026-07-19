import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statischer Export, damit die Seite als reiner Ordner (ohne Node-Server)
  // z.B. bei Netlify per Drag & Drop hochgeladen werden kann.
  output: "export",
};

export default nextConfig;
