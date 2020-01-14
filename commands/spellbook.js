module.exports = {
  name: "spellbook",
  aliases: ["s", "spell"],
  description: "Information on 5e spell",
  usage: "<spell-name> [verbose]",
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

    var client = new HttpClient();
    client.get(`http://www.dnd5eapi.co/api/spells/${args[0]}/`, function(
      response
    ) {
      res = JSON.parse(response);
      if (res) {
        if (args.length > 1) {
          if (args[1] === "verbose" || args[1] === "v") {
            // all spells have at least one class that uses it
            var users = "";
            for (var user in res.classes) {
              users += res.classes[user].name + ", ";
            }
            users = users.slice(0, -2); // remove last 2 charactres for ", "

            message.channel.send(
              "```asciidoc\n" +
                `= Spell Name: ${res.name} =\n` +
                `[Description]\n${res.desc}\n` +
                `[Higher Level]\n${res.higher_level}\n` +
                `[Range]\n${res.range}\n` +
                `[Components]\n${res.components}\n` +
                `[Material]\n${res.material}\n` +
                `[Casting Time]\n${res.casting_time}\n` +
                `[Duration]\n${res.duration}\n` +
                `[Concentration]\n${res.concentration}\n` +
                `[Ritual]\n${res.ritual}\n` +
                `[Classes]\n${users}\n` +
                `[Page]\n${res.page}\n` +
                "```"
            );
          }
        } else {
          message.channel.send(
            "```asciidoc\n" +
              `= Spell Name: ${res.name} =\n` +
              `[Description]\n${res.desc}\n` +
              `[Higher Level]\n${res.higher_level}\n` +
              `[Range, Casting Time, Duration]\n${res.range}, ${res.casting_time}, ${res.duration}\n` +
              `[Components]\n${res.components}\n` +
              `[Concentration]\n${res.concentration}\n` +
              `[Ritual]\n${res.ritual}\n` +
              "```"
          );
        }
      } else {
        message.channel.send("Spell not found");
      }
    });
  }
};
