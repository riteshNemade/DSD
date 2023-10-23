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
      ["dotenv-import", {
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": false
      }]  
    ],
  };
};
