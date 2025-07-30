import userHelpers from "../helpers/userHelpers.js";
import { Worker, isMainThread } from "worker_threads";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

class UserController {
  // Upload data
  async uploadData(req, res) {
    const fileName = fileURLToPath(import.meta.url);
    const dirName = dirname(fileName);
    const workerPath = path.join(dirName, "../workerThreads/workerThreads.js");

    if (isMainThread) {
      const worker = new Worker(workerPath);
      worker.on("message", async (data) => {
        const policyPromiseArray = [];
        try {
          for (let item of data) {
            const promiseArray = [
              userHelpers.addUser(item),
              userHelpers.addAgent(item.agent),
              userHelpers.addCarrier(item.company_name),
              userHelpers.addCategory(item.category_name),
              userHelpers.addAccountName(item.account_name),
            ];
            const promises = await Promise.allSettled(promiseArray);
            const response = promises.every(
              (promise) => promise.status === "fulfilled"
            );

            if (response) {
              const ids = promises.map((promise) => promise.value);
              policyPromiseArray.push(userHelpers.addPolicy(item, ids));
            }
          }
          const resultPromise = await Promise.all(policyPromiseArray);
          if (resultPromise)
            res.status(200).json({
              message: `Number of policies added/already existing: ${resultPromise.length}`,
            });
        } catch (error) {
          res
            .status(404)
            .send(
              `Error occured while adding policies, please check the file content and try again: ${error}`
            );
        }
      });
      worker.on("error", (msg) => {
        res.status(404).send(`Error occured while adding policies: ${msg}`);
      });

      worker.on("exit", (code) => {
        if (code !== 0) console.log(`Worker stopped with exit code ${code}`);
      });

      worker.postMessage(req.file.path);
    }
  }

  // Get user
  async getUser(req, res) {
    const { username } = req.query;
    const response = await userHelpers.getUserName(username);
    if (response) res.status(200).json(response);
  }

  // Get policy info
  async getPolicyInfo(req, res) {
    const { username } = req.query;
    const response = await userHelpers.getUserPolicy(username);
    if (response) res.status(200).json(response);
  }

  // Get all policies info
    async getAllPoliciesInfo(req, res) {
    const response = await userHelpers.getUserPolicies();
    if (response) res.status(200).json(response);
  }
}

export default UserController;
