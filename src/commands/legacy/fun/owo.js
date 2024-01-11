/*
 * This is the /owo command.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2024
 * Code is licensed under MIT
 */

// Import the required modules
const owoify = require("owoify-js").default;
const { WebhookClient } = require("discord.js");
const print = require("../../../helpers/print");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /owo
   * Aliases      : /uwu
   * Description  : OwO-fies your message.
   * Usage        : /owo [message]
   * Cooldown     : 0
   *
   * What it does : This turns your message
   *                into the horrid nightmare
   *                of baby-speak
   */

  // Define data for loader
  name: "owo",
  alias: ["uwu"],
  description: "OwO-fies your message.",
  usage: "{cmdName} [message]",
  cooldown: 0,

  // Execute the command asynchronously
  async execute(client, message, args) {
    // Create a temporary webhook
    const tempWebhook = await message.channel
      .createWebhook({
        name: message.member.displayName,
        avatar: message.member.displayAvatarURL(),
      })
      .catch((e) => print.error(e));

    // Initialise webhook client
    const webhook = new WebhookClient({
      id: tempWebhook.id,
      token: tempWebhook.token,
    });

    // Delete the authors message
    message.delete().catch((e) => print.error(e));

    // Send the owofied message
    webhook.send(owoify(message.content.slice(5), "uwu"));

    // Webhook delete
    tempWebhook.delete("Temporary webhook no longer needed.");
  },
};
