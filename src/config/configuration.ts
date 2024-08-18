export default () => ({
  host: process.env.HOST,
  env: process.env.ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
  },

  secret: process.env.SECRET,

  minio: {
    host: process.env.MINIO_HOST,
    port: parseInt(process.env.MINIO_PORT, 10),
    useSSL: process.env.USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    bucket: process.env.MINIO_BUKET,
  },

  mail: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
    secure: process.env.MAIL_SECURE === 'true',
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
