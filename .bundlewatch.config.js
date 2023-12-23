module.exports = {
  files: [
    // {
    //   path: './build/sdk/*.js',
    //   maxSize: '3kB',
    // },
  ],
  defaultCompression: 'brotli',
  normalizeFilenames: /^.+?((\.[^.]{8,}}?)|())\.\w+$/,
  ci: {
    repoBranchBase: 'develop',
    trackBranches: ['main', 'develop'],
  },
};
