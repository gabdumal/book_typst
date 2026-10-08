// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightKbd from "starlight-kbd";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      customCss: [
        "@fontsource-variable/atkinson-hyperlegible-next",
        "@fontsource-variable/atkinson-hyperlegible-mono",
        "./src/styles/global.css",
      ],

      defaultLocale: "root",

      description:
        "Guia de uso do Typst para compor documentos estilizados e conforme normas técnicas.",

      expressiveCode: {
        frames: {
          removeCommentsWhenCopyingTerminalFrames: false,
        },
      },

      locales: {
        root: {
          label: "Português",
          lang: "pt",
        },
      },

      plugins: [
        starlightKbd({
          types: [
            { default: true, id: "linux", label: "Linux" },
            { id: "windows", label: "Windows" },
          ],
        }),
      ],

      sidebar: [
        {
          label: "Introdução",
          slug: "introduction",
        },
      ],

      social: [
        {
          href: "https://github.com/gabdumal/book_typst",
          icon: "github",
          label: "GitHub",
        },
      ],

      title: "Typst",
    }),
  ],
});
