const app = require("./app");

const { PORT } = require("./config");

app.listen(PORT, function () {
  console.log(`🚀 Server running on http://localhost:3001/`);
});

