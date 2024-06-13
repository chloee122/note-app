// const logger = require("./utils/logger");
// const config = require("./utils/config");
// const app = require("./app");
import app from "./app";
import logger from "./utils/logger";
import config from "./utils/config";

app.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});
