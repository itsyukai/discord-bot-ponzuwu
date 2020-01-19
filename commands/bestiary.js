module.exports = {
  name: "bestiary",
  aliases: ["m", "monster"],
  description: "Information on 5e monsters",
  usage: "<monster-name> <argument>",
  args: true,
  execute(message, args) {
    var HttpClient = function() {
      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

      this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
          if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
            aCallback(anHttpRequest.responseText);
        };

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
      };
    };

    var actions = function() {
      var str = "";
      for (const action of Object.values(res.actions)) {
        str += `[${action.name}]\n"${action.desc}"\n`;
      }
      return str;
    };
    var legendary_actions = function() {
      var str = "";
      for (const action of Object.values(res.legendary_actions)) {
        str += `[${action.name}]\n"${action.desc}"\n`;
      }
      return str;
    };
    var special_abilities = function() {
      var str = "";
      for (const ability of Object.values(res.special_abilities)) {
        str += `[${ability.name}]\n"${ability.desc}"\n`;
      }
      return str;
    };

    var client = new HttpClient();
    client.get(`https://api.open5e.com/monsters/${args[0]}/`, function(
      response
    ) {
      res = JSON.parse(response);
      if (res) {
        if (args.length > 1) {
          if (args[1] === "actions" || args[1] === "a") {
            // all spells have at least one class that uses it
            message.channel.send(
              "```asciidoc\n" +
                `= ${res.name}: Actions =\n` +
                `${actions()}\n` +
                "```"
            );
          } else if (args[1] === "legendary-actions" || args[1] === "la") {
            // all spells have at least one class that uses it
            message.channel.send(
              "```asciidoc\n" +
                `= ${res.name}: Legendary Actions =\n` +
                `${
                  res.legendary_desc !== ""
                    ? `"${res.legendary_desc}"\n${legendary_actions()}`
                    : "None"
                }\n` +
                "```"
            );
          } else if (
            args[1] == "desc" ||
            args[1] === "d" ||
            args[1] === "description"
          ) {
            "```asciidoc\n" +
              `= Monster Name: ${res.name} =\n` +
              `[Size]\n${res.size}\n` +
              `[Type]\n${res.type}\n` +
              `[Subtype]\n${res.subtype}\n` +
              `[Alignment]\n${res.alignment}\n` +
              `[Armor Class]\n${res.armor_class}\n` +
              `[Armor Description]\n${res.armor_desc}\n` +
              `[Hit Points]\n${res.hit_points}\n` +
              `[Hit Dice]\n${res.hit_dice}\n` +
              `= States / Save =\n` +
              `[Strength]\n${res.strength} / ${res.strength_save}\n` +
              `[Dexterity]\n${res.dexterity} / ${res.dexterity_save}\n` +
              `[Constitution]\n${res.constitution} / ${res.constitution_save}\n` +
              `[Wisdom]\n${res.wisdom} / ${res.wisdom_save}\n` +
              `[Charisma]\n${res.dexterity} / ${res.dexterity_save}\n` +
              `[Dexterity]\n${res.dexterity} / ${res.dexterity_save}\n` +
              "```";
          }
        } else {
          message.channel.send("```asciidoc\n" + "errthing else" + "```");
        }
      } else {
        message.channel.send("Spell not found");
      }
    });
  }
};
