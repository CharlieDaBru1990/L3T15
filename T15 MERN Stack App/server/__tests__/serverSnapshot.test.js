const { app, serverInstance } = require("../server");
const getPort = require("get-port");
const mongoose = require("mongoose");

let port;

beforeAll(async () => {
  port = await getPort();

  // Check if the server is already listening
  if (!serverInstance.listening) {
    serverInstance.listen(port);
    return new Promise((resolve) => {
      serverInstance.on("listening", () => {
        resolve();
      });
    });
  }
});

afterEach(async () => {
  await serverInstance.close();
  await mongoose.connection.close();
});

test("should match snapshot", () => {
  // Use snapshot matchers on the relevant part of the app object
  const appSnapshot = {
    routes: app._router.stack
      .filter((layer) => layer.route)
      .map((layer) => layer.route.path),
  };

  // If there are no routes, exclude the "routes" property from the snapshot
  if (appSnapshot.routes.length === 0) {
    delete appSnapshot.routes;
  }

  expect(appSnapshot).toMatchSnapshot();
});
