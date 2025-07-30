import Message from "../model/messageModel.js";
import schedule from "node-schedule";

class MessageHelpers {
  // Add message
  async addMessage(message, scheduledAt) {
    try {
      const job = schedule.scheduleJob(scheduledAt, async () => {
        try {
          const response = await Message.create({ message, scheduledAt });
          if (response) {
            return { message: `Task scheduled successfully at ${scheduledAt}` };
          } else {
            return { message: `Task not scheduled at ${scheduledAt}` };
          }
        } catch (error) {
          console.error(`Error inserting message into database: ${error}`);
          return { message: `Task not scheduled at ${scheduledAt}` };
        }
      });

      if (job) {
        return { message: `Task scheduled successfully at ${scheduledAt}` };
      } else {
        return { message: `Task not scheduled at ${scheduledAt}` };
      }
    } catch (error) {
      console.error(`Error scheduling the task: ${error}`);
      return { message: `Task not scheduled at ${scheduledAt}` };
    }
  }
}

export default MessageHelpers;
