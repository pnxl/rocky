/*
 * This is the /stats command.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2024
 * Code is licensed under MIT
 */

// Import the required modules
const si = require("systeminformation");
const { execSync } = require("child_process");
const { ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const print = require("../../../helpers/print");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /update
   * Aliases      : /pull
   * Description  : Pulls the latest commit from git
   * Usage        : /update
   * Cooldown     : 0
   *
   * What it does : Pulls the latest commit from git
   */

  // Define data for loader
  name: "update",
  alias: ["pull"],
  description: "Pulls the latest commit from git.",
  usage: "{cmdName}",
  cooldown: 0,

  // Execute the command asynchronously
  async execute(client, message, args) {
    await message.channel.sendTyping();

    // Get software versions
    const ver = await si.versions();

    if (ver.git === "") {
      return message.reply(
        "I couldn't update because one or more dependencies are missing. Do you have `git` and `pm2` installed?"
      );
    }

    if (ver.pm2 === "") {
      return message.reply(
        "I couldn't update because one or more dependencies are missing. Do you have `git` and `pm2` installed?"
      );
    }

    if (!process.env.PM2_HOME) {
      return message.reply(
        "I couldn't update because my process wasn't ran with `pm2`. Try terminating and then starting me with `npm run start`."
      );
    }

    // Fetch latest commits from Git
    const response = await message.reply("Checking for any new updates...");
    execSync("git fetch", (error, stderr) => {
      if (error) {
        print.error(
          `An error occured when trying to fetch the latest commit: ${error.message}`
        );
        return response
          .edit(
            `An error occured when trying to fetch the latest commit: ${error.message}`
          )
          .catch(print.error);
      }
      if (stderr) {
        print.error(
          `An error occured when trying to fetch the latest commit: ${stderr}`
        );
        return response
          .edit(
            `An error occured when trying to fetch the latest commit: ${error.message}`
          )
          .catch(print.error);
      }
      return;
    });

    const commitLocal = execSync("git rev-parse --short HEAD")
      .slice(0, 7)
      .toString();

    const commitRemote = execSync("git ls-remote").toString();

    // If it's the same, reply
    if (commitLocal == commitRemote) {
      return response
        .edit(
          `There are no updates! Rocky is running on the latest version. (\`${commitLocal}\`)`
        )
        .catch(print.error);
    }

    response.delete();

    // Define buttons for confirmation
    const confirm = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("Yes, update now.")
      .setStyle(ButtonStyle.Primary);

    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("Nevermind!")
      .setStyle(ButtonStyle.Secondary);

    const link = new ButtonBuilder()
      .setLabel("View commit details")
      .setURL(
        "https://github.com/pnxl/d.js/commit/" + commitRemote.slice(0, 40)
      )
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder().addComponents(link, cancel, confirm);

    // Ask for confirmation to update
    const confirmation = await message.channel.send({
      content: `There's a new update available! I am currently running on commit \`${commitLocal}\`\, but the newest commit is \`${commitRemote.slice(
        0,
        7
      )}\`. Would you like to update?`,
      components: [row],
    });

    // Filter who presses the buttons
    const collectorFilter = (i) => i.user.id === message.author.id;

    try {
      const answer = await confirmation.awaitMessageComponent({
        filter: collectorFilter,
        time: 300 * 1000,
      });

      if (answer.customId === "confirm") {
        confirmation.delete();
        const reply = await message.channel.send(
          "Alrighty! Fetching the latest update..."
        );
        const pull = execSync("git pull").toString();
        reply.delete();
        await message.channel.send(
          `${pull.slice(0, 24)}\n\`\`\`diff\n${pull.slice(25)}\n\`\`\``
        );
        message.channel.send("Restarting bot...");
        setTimeout(() => process.exit(), 5000);
      } else if (answer.customId === "cancel") {
        confirmation.delete();
        message.channel.send("Update cancelled.");
      }
    } catch (e) {
      confirmation.delete();
      message.channel.send(
        "A confirmation wasn't received in five minutes, cancelling."
      );
    }
  },
};
