module.exports = {
  docsSidebar: [
    'overview',
    'features',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/installation', 'getting-started/usage'],
    },
    {
      type: 'category',
      label: 'Documentation',
      items: [
        'documentation/data',
        'documentation/options',
        'documentation/api',
        'documentation/events',
      ],
    },
    {
      type: 'category',
      label: 'Packages',
      items: ['packages/react', 'packages/vue', 'packages/typescript', 'packages/python'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/chart-size',
        'guides/colors',
        'guides/themes',
        'guides/highlight-select',
        'guides/labels',
        'guides/icons',
        'guides/groups',
        'guides/dynamic-values',
        'guides/chart-controls',
        'guides/fillDateGaps',
        'guides/multiple-charts',
      ],
    },
    'credits',
    'license',
  ],
};
