module.exports = {
  name: "roll",
  aliases: ["r"],
  description: "Rolls dice",
  args: true,
  usage: "<number of dice>d<number of sides>",
  execute(message, args) {
    // written 'xdy' vs 'x d y'
    if (args.length === 1) {
      const tempArgs = args[0].split("d");

      if (
        tempArgs[0] === "" ||
        tempArgs[1] === "" ||
        tempArgs[0] < 1 ||
        isNaN(tempArgs[0])
      ) {
        message.channel.send("Don't fuck with me..");
        return;
      }

      var msg = "`";
      for (i = 0; i < tempArgs[0]; i++) {
        var roll = Math.floor(Math.random() * tempArgs[1] + 1);

        msg += roll;

        if (i < tempArgs[0] - 1) {
          msg += " ";
        }
      }
      msg += "`";

      message.channel.send(msg);
      // message.channel.send("dev: " + msg);
    }
  }
};
