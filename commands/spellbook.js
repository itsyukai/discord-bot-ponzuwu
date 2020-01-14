module.exports = {
  name: "spellbook",
  aliases: ["s"],
  description: "Information on 5e spell",
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
      console.log(response);
      message.channel.send(response);
    });
  }
};
