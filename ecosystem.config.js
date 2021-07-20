module.exports = {
  apps: [
    {
      name: 'FatCoupon-Cleaner',
      script: './src/server.js',
      env: {
        NODE_ENV: 'production',
      },
      cron_restart: '0 0 23 * * ?',
    },
  ],
}
