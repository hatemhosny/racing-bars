import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'RacingBars',
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
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/hatemhosny/racing-bars/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/hatemhosny/racing-bars/tree/main/website/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/racing-bars-social-card.jpg',
    metadata: [
      { name: 'og:type', content: 'website' },
      { name: 'og:description', content: 'Bar Chart Race Made Easy 🎉' },
      { name: 'og:image', content: 'img/racing-bars-social-card.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:domain', content: 'racing-bars.hatemhosny.dev' },
      { name: 'twitter:description', content: 'Bar Chart Race Made Easy 🎉' },
      { name: 'twitter:image', content: 'img/racing-bars-social-card.png' },
    ],
    navbar: {
      title: 'RacingBars',
      logo: {
        alt: 'RacingBars',
        src: 'img/logo.png',
      },
      items: [
        { label: 'Docs', to: 'category/documentation', position: 'left' },
        { label: 'Gallery', to: 'category/gallery', position: 'left' },
        {
          to: 'sample-datasets',
          activeBasePath: 'sample-datasets',
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
        {
          title: 'Docs',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Features',
              to: 'features',
            },
            {
              label: 'Getting Started',
              to: 'getting-started/installation',
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
              to: 'credits',
            },
            {
              label: 'License',
              to: 'license',
            },
            {
              label: 'Sponsor 💚',
              href: 'sponsor',
            },
          ],
        },
        {
          title: 'More',
          items: [
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
      additionalLanguages: ['json'],
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
