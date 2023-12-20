const controller = {
  renderHomePage: (_, res) => {
    // Render html file who is located in the working directory of the file server.js
    res.sendFile('index.html', { root: process.cwd() });
  }
};

module.exports = controller;