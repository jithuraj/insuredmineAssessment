import dotenv from "dotenv";
dotenv.config();

const startServer = (app) => {
  try {
    app.listen(process.env.PORT, process.env.HOST, () => {
      console.log(
        `Server started on http://${process.env.HOST}:${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log("Error starting server", error);
  }
};

export default startServer;
