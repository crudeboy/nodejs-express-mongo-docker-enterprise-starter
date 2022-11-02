import mongoose, { ConnectOptions } from "mongoose";
import environment from "../../config/environment";

let CONNECTION_URL;
if (environment.nodeEnv == "development") {
	console.log(CONNECTION_URL, "")
  CONNECTION_URL = `mongodb://localhost:27017/${environment.devDatabase}`;
} else {
  CONNECTION_URL = environment.prodDatabaseUrl;
}

(function mongoConnection() {
  mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  mongoose.connection.on("connected", () => {
    console.log("Mongo has connected succesfully");
  });
  mongoose.connection.on("reconnected", () => {
    console.log("Mongo has reconnected");
  });
  mongoose.connection.on("error", (error) => {
    console.log("Mongo connection has an error", error);
    mongoose.disconnect();
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Mongo connection is disconnected");
  });
})();
