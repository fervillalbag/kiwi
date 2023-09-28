export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGO_DB,
  port: process.env.PORT || 3002,
  default_limit: +process.env.DEFAULT_LIMIT,
});
