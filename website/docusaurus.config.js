const path = require('path');

module.exports = {
  title: 'Racing Bars',
  tagline: 'Bar chart race made easy 🎉',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'hatemhosny', // Usually your GitHub org/user name.
  projectName: 'racing-bars', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Racing Bars',
      logo: {
        alt: 'Racing Bars',
        src: 'img/logo.png',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'gallery', activeBasePath: 'gallery', label: 'Gallery', position: 'left' },
        {
          to: 'docs/sample-datasets',
          activeBasePath: 'docs/sample-datasets',
          label: 'Sample Datasets',
          position: 'left',
        },
        {
          href: 'https://jsbin.com/kesapad/edit?html,output',
          label: 'Playground',
          position: 'left',
        },
        {
          href: '/api/modules/_index_.html',
          label: 'API',
          position: 'right',
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
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Gallery',
              to: 'gallery',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hatemhosny/racing-bars',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hatem Hosny.`,
    },
    prism: {
      additionalLanguages: ['r', 'julia'],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'overview',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,

          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@hatemhosny/docusaurus-plugin-gallery',
      {
        routeBasePath: 'gallery',
        path: './gallery',
        showReadingTime: false,
        editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/blog/',
      },
    ],
    [path.resolve(__dirname, '../node_modules/docusaurus-lunr-search/')],
  ],
};
