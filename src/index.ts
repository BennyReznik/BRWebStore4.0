import config, { KnownConfigKey } from "./utils/config";

config.init();
import { app } from "./app";

const port = +config.get(KnownConfigKey.ServerPort, "3000");
app.set("port", port);

// tslint:disable:no-console
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
