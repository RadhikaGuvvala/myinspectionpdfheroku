const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const webpack = require("webpack");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const path = require("path");
const { FormatColorResetRounded } = require("@material-ui/icons");

module.exports = withPlugins(
  [
    [withSass],
    [withCSS],
    [
      withImages,
      {
        images: {
          // loader: 'imgix',
          domains: [
            "smwstorageaccountimages.blob.core.windows.net",
            "rhgpwastorageaccount.blob.core.windows.net",
            "",
          ],
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        },
      },
    ],
  ],
  {
    webpack5: false,
    env: {
      MONGODB_URI:
        "mongodb+srv://help-center:test1234@cluster0.ctggx.mongodb.net/help",
      SECOND_MG_URL:"mongodb+srv://smw-admin:smw-admin@cluster0.ckkic.mongodb.net/smw-digitalAssets",
      AZURE_CONNECTION_STRING:
        "DefaultEndpointsProtocol=https;AccountName=smwstorageaccountimages;AccountKey=BnKy2W+WmDioXI1TJ8FLp7qb2j9APCiE1vTvEgd3gN35l9Lq2kMAZV05gVojIrr7+V67rD7z76JbX7MIzAKJZA==;EndpointSuffix=core.windows.net",
      AZURE_ACCOUNT_NAME: "smwstorageaccountimages",
      AZURE_KEY:
        "BnKy2W+WmDioXI1TJ8FLp7qb2j9APCiE1vTvEgd3gN35l9Lq2kMAZV05gVojIrr7+V67rD7z76JbX7MIzAKJZA==",
      AZURE_CONTAINER: "smw-images",
      azureAccountName: "smwstorageaccountimages",

      MAIL_ID: "regi772799@gmail.com",

      PASSWORD: "Test#1234",

      MAIL_HOST: "smtp.gmail.com",
      MAIL_PORT: 465,
    },
    webpack(config, { isServer }) {
      config.resolve.modules.push(path.resolve("./"));
      if (!isServer) {
        config.node = {
          fs: "empty",
        };
      }
      return config;
    },
  }
);
