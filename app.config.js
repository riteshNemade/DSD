
module.exports = {
  expo: {
    name: "Asset Management Tool",
    slug: "asset_management",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            usesCleartextTraffic: true,
          },
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "Allow $(PRODUCT_NAME) to access your photo",
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        },
      ],
    ],
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFF",
      },
      package: "com.datafortune.DSD",
      googleServicesFile: process.env.GOOGLE_SERVICES_FILE,
      permissions: ["android.permission.RECORD_AUDIO"],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "08784645-c79b-41b7-a151-be6314a6b73c",
      },
    },
  },
};
