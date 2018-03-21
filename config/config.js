module.exports = {
  APPNAME: process.env.APPNAME || 'Pseudo DB',
  PORT: process.env.PORT || 8080,
  DEVMODE: (process.env.NODE_ENV != 'production'),
  keys: process.env.NODE_ENV === 'production' ? require('./.prodKeys') : require('./.keys'),
}