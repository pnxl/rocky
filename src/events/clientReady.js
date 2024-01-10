/*
 * This is the `ClientReady` event.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2024
 * Code is licensed under MIT
 */

// Import the required modules
const { Events } = require("discord.js");
const gradient = require("gradient-string");
const chalk = require("chalk");

// Export the command data for loader
module.exports = {
  /*
   * Event        : ClientReady
   * Usage        : Once
   *
   * What it does : Once the ready event is
   *                emitted, log to console.
   */

  // Define data for loader
  name: Events.ClientReady,
  once: true,

  // Execute the event
  execute(client) {
    console.log(
      chalk.bold(
        gradient.pastel(
          "\nThe bot is ready! Logged in as " + client.user.tag + ".\n"
        )
      )
    );
  },
};
