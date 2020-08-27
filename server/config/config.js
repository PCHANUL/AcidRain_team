let rainPassword = process.env.RAIN_PASSWORD
module.exports = {
  development: {
    username: 'root',
    password: 'qkr95162',
    database: 'acidrain',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  service: {
    username: 'master',
    password: rainPassword,
    database: 'acidrain',
    host: 'codestates.cp4moavvfqze.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:13306
  },
}
