export const logNotificationEvent = (
  eventName: string,
  data: {
    message: string;
    platform: string;
    description?: string;
  },
) => {
  console.group(`Event: ${eventName}`);
  if (data.description) {
    console.log(`Description: ${data.description}`);
  }
  console.log(`Platform: ${data.platform}`);
  console.log(`Message: ${data.message}`);
  console.groupEnd();
};
