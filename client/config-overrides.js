// config-overrides.js
module.exports = function override(config, env) {
    // Tee tarvittavat muutokset webpack-konfiguraatioon
    // Esimerkiksi lisää uusi loader tai plugin
    config.module.rules.push({
      test: /\.txt$/,
      use: 'raw-loader',
    });
  
    return config;
  };