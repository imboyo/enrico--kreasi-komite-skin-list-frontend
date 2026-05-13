// PM2 ecosystem files are loaded as CommonJS by default.
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "enrico__kreasi-komite__skin-list-frontend",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      env: {
        PORT: process.env.PORT,
      },
      watch: false,
      autorestart: true,
      max_restarts: 5,
    },
  ],
};
