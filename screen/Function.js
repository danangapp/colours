/* eslint-disable prettier/prettier */
module.exports = {
  fetchData: function (method, url) {
    fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
  },
  cab: function () {
    return 'haloo';
  },
};
