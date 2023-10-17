module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            assets:'./assets',
            hooks:'./src/hooks',
            utils:'./src/utils',
            constants: './src/constants'
          },
        },
      ],
    ],
  };
};
