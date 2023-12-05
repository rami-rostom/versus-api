const controller = {
  renderHomePage: (_, res) => {
    res.sendFile('index.html', { root: process.cwd() });
  }
};

module.exports = controller;