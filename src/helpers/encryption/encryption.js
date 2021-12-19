const bcrypt = require('bcrypt');

module.exports = {
  encrypt: async (data) => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }
}
