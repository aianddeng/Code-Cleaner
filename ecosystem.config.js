module.exports = {
  apps: [
    {
      name: 'FatCoupon-Cleaner',
      script: 'src/server.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      cron_restart: '0 0 1/12 * *',
    },
  ],
}
