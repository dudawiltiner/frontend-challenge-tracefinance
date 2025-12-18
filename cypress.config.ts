import { defineConfig } from 'cypress';
import { configDotenv } from 'dotenv';
import path from 'path';

configDotenv();

export default defineConfig({
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
      webpackConfig: {
        resolve: {
          alias: {
            '@public': path.resolve(__dirname, './public'),
            '@dictionaries': path.resolve(__dirname, './src/dictionaries'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@context': path.resolve(__dirname, './src/context'),
            '@atoms': path.resolve(__dirname, './src/components/atoms'),
            '@molecules': path.resolve(__dirname, './src/components/molecules'),
            '@organisms': path.resolve(__dirname, './src/components/organisms'),
            '@screens': path.resolve(__dirname, './src/components/screens'),
            '@templates': path.resolve(__dirname, './src/components/templates'),
            '@services': path.resolve(__dirname, './src/services'),
            '@types': path.resolve(__dirname, './src/types'),
            '@transaction-types': path.resolve(__dirname, './src/types'),
            'next/navigation': path.resolve(
              __dirname,
              './cypress/support/mocks/next-navigation.ts'
            ),
          },
        },
      },
    },
    indexHtmlFile: path.resolve(
      __dirname,
      './cypress/support/component-index.html'
    ),
  },
  video: false,
  screenshotOnRunFailure: true,
  chromeWebSecurity: false,
  viewportHeight: 820,
  viewportWidth: 600,
  screenshotsFolder: 'cypress/results/mochawesome-report/assets',
});
