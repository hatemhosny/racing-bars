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
      items: ['documentation/data', 'documentation/options', 'documentation/events'],
    },
    {
      type: 'category',
      label: 'Frameworks and Languages',
      items: [
        'frameworks/js',
        'frameworks/angular',
        'frameworks/react',
        'frameworks/vue',
        'frameworks/typescript',
        'frameworks/python',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/chart-size',
        'guides/bar-colors',
        'guides/styles-themes',
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
