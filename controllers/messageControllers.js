import messageHelpers from "../helpers/messageHelpers.js";
import moment from "moment";

const messageHelper = new messageHelpers();

class MessageController {
  // Add message
  async addMessage(req, res) {
    const { message, day, time } = req.body;
    if (!message || !day || !time) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    const scheduledAt = moment(`${day}T${time}`).format();
    console.log("jithuraj", scheduledAt);

    if (scheduledAt <= moment().format()) {
      return res.status(400).json({ error: "The date/time is already passed" });
    }
    const response = await messageHelper.addMessage(message, scheduledAt);
    if (response) res.status(200).json({ message: response?.message });
  }
}

export default MessageController;
