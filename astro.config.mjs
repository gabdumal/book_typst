// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightKbd from "starlight-kbd";

/** @type {import('astro').AstroIntegration} */
const fancyboxIntegration = {
  hooks: {
    "astro:config:setup"({ injectScript }) {
      injectScript(
        "page",
        `
          import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
          import "@fancyapps/ui/dist/fancybox/fancybox.css";

          function enhanceImages() {
            const images = document.querySelectorAll(
              ".sl-markdown-content img"
            );

            images.forEach((img) => {
              // Preserve existing image links.
              if (img.closest("a")) return;

              const link = document.createElement("a");

              link.href = img.src;
              link.dataset.fancybox = "book-images";

              if (img.alt) {
                link.dataset.caption = img.alt;
              }

              img.before(link);
              link.append(img);
            });
          }

          // Set up the current page and subsequent navigations.
          document.addEventListener(
            "astro:page-load",
            enhanceImages
          );

          enhanceImages();

          Fancybox.bind('[data-fancybox="book-images"]');
        `,
      );
    },
  },

  name: "fancybox-for-starlight",
};

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

      favicon: "/public/logo_light.svg",

      locales: {
        root: {
          label: "Português",
          lang: "pt",
        },
      },

      logo: {
        dark: "/public/logo_dark.svg",
        light: "/public/logo_light.svg",
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
        {
          label: "Fundamentos",
          slug: "foundation",
        },
        {
          label: "Primeiro documento",
          slug: "first",
        },
        {
          items: [
            {
              label: "Arquivos",
              slug: "recipe/files",
            },
            {
              label: "Grades e tabelas",
              slug: "recipe/grids",
            },
            {
              label: "Customização",
              slug: "recipe/customization",
            },
            {
              label: "Funções",
              slug: "recipe/functions",
            },
            {
              label: "Listas",
              slug: "recipe/lists",
            },
          ],
          label: "Receita de bolo",
        },
        {
          label: "Currículo",
          slug: "curriculum",
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
    fancyboxIntegration,
  ],
  site: "https://typst.gabdumal.com",
});
