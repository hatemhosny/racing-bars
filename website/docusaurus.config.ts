import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Racing Bars',
  tagline: 'Bar chart race made easy 🎉',
  url: 'https://racing-bars.hatemhosny.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'hatemhosny', // Usually your GitHub org/user name.
  projectName: 'racing-bars', // Usually your repo name.
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/hatemhosny/racing-bars/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/hatemhosny/racing-bars/tree/main/website/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Racing Bars',
      logo: {
        alt: 'Racing Bars',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'docs/overview',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'docs/gallery', activeBasePath: 'docs/gallery', label: 'Gallery', position: 'left' },
        {
          to: 'docs/sample-datasets',
          activeBasePath: 'docs/sample-datasets',
          label: 'Sample Datasets',
          position: 'left',
        },
        {
          to: 'playground',
          label: 'Playground',
          position: 'left',
        },
        {
          href: 'https://github.com/hatemhosny/racing-bars',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Style Guide',
        //       to: 'docs/',
        //     },
        //     {
        //       label: 'Second Doc',
        //       to: 'docs/doc2/',
        //     },
        //   ],
        // },
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: 'docs/overview',
            },
            {
              label: 'Features',
              to: 'docs/features',
            },
            {
              label: 'Getting Started',
              to: 'docs/getting-started/installation',
            },
            {
              label: 'Playground',
              to: 'playground',
            },
          ],
        },
        {
          title: 'Info',
          items: [
            {
              label: 'Credits',
              to: 'docs/credits',
            },
            {
              label: 'License',
              to: 'docs/license',
            },
            {
              label: 'Sponsor 💚',
              href: 'https://github.com/sponsors/hatemhosny/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Gallery',
            //   to: 'gallery',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/hatemhosny/racing-bars',
            },
            {
              label: '𝕏 / Twitter',
              href: 'https://x.com/hatem_hosny_',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/racing-bars',
            },
          ],
        },
      ],
      copyright: `Released under the MIT License.<br />Copyright © ${new Date().getFullYear()} <a href="https://github.com/hatemhosny" target="_blank">Hatem Hosny</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['r', 'julia'],
    },
  } satisfies Preset.ThemeConfig,
  scripts: [
    {
      src: 'https://unpkg.com/prettier@2.4.1/standalone.js',
      async: true,
    },
    {
      src: 'https://unpkg.com/prettier@2.4.1/parser-babel.js',
      async: true,
    },
    {
      src: 'https://unpkg.com/prettier@2.4.1/parser-html.js',
      async: true,
    },
  ],
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        plugin: ['typedoc-plugin-missing-exports'],
        excludeExternals: true,
        internalModule: '_internal',
      },
    ],
  ],
};

export default config;
