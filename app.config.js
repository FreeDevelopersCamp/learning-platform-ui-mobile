import "dotenv/config";

export default {
  expo: {
    name: "learning-platform-ui-mobile",
    slug: "learning-platform-ui-mobile",
    extra: {
      REACT_APP_API_HOST: process.env.REACT_APP_API_HOST,
      REACT_APP_BASE_HOST_URL: process.env.REACT_APP_BASE_HOST_URL,
      REACT_APP_X_TENANT_ID: process.env.REACT_APP_X_TENANT_ID,
    },
    newArchEnabled: true,
  },
};
