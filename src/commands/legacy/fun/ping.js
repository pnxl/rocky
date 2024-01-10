/*
 * This is the /ping command.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2024
 * Code is licensed under MIT
 */

// Export the command data for loader
module.exports = {
  /*
   * Command      : /ping
   * Aliases      : /pong
   * Description  : Pong!
   * Usage        : /ping
   * Cooldown     : 0
   *
   * What it does : A basic test command, it
   *                only responds with "Pong!"
   *                when it is executed.
   */

  // Define data for loader
  name: "ping",
  alias: ["pong"],
  description: "Pong!",
  usage: "{cmdName}",
  cooldown: 0,

  // Execute the command asynchronously
  async execute(client, message, args) {
    // Reply to the user with "Pong!"
    await message.reply("Pong!");
  },
};
