import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation
  The sidebars can be generated from the filesystem, or explicitly defined here.
  Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      label: 'Overview',
      id: 'index',
    },
    'features',
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'doc',
        id: 'getting-started/installation',
      },
      items: ['getting-started/installation', 'getting-started/usage'],
    },
    {
      type: 'category',
      label: 'Documentation',
      link: {
        type: 'generated-index',
      },
      items: [
        'documentation/data',
        'documentation/options',
        'documentation/api',
        'documentation/events',
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Frameworks and Languages',
    //   items: [
    //     'packages/js',
    //     'packages/typescript',
    //     'packages/react',
    //     'packages/vue',
    //     'packages/svelte',
    //     'packages/python',
    //   ],
    // },
    {
      type: 'category',
      label: 'Guides',
      link: {
        type: 'generated-index',
      },
      items: [
        'guides/data-transformation',
        'guides/chart-size',
        'guides/bar-colors',
        'guides/themes-styles',
        'guides/highlight-select',
        'guides/labels',
        'guides/icons',
        'guides/groups',
        'guides/dynamic-values',
        'guides/chart-controls',
        'guides/changing-options',
        'guides/fill-date-gaps',
        'guides/multiple-charts',
      ],
    },
    {
      type: 'category',
      label: 'Gallery',
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'gallery',
        },
      ],
    },
    'credits',
    'license',
    'sponsor',
  ],
};

export default sidebars;
