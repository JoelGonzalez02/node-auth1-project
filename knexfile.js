// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/users.sqlite3'
    }
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAMA foreign_keys = ON', done)
    }
  }
};
