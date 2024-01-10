/*
 * This is the /ping command.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2024
 * Code is licensed under MIT
 */

// Import the required modules
const { SlashCommandBuilder } = require("discord.js");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /ping
   * Description  : Pong!
   * Cooldown     : 0
   *
   * What it does : A basic test command, it
   *                only responds with "Pong!"
   *                when it is executed.
   */

  // Define data for loader
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  usage: "{cmdName}",
  cooldown: 0,

  // Execute the command asynchronously
  async execute(interaction) {
    // Reply to the user with "Pong!"
    await interaction.reply("Pong!");
  },
};
