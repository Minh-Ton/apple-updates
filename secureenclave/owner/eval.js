// Run arbitrary JS code

const Discord = require('discord.js');

require('../../applesilicon/embed.js')();

const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

module.exports = {
    name: 'eval',
    command: 'eval <code>',
    category: 'Owner',
    usage: '`apple!eval <code>`',
    description: '**[Owner Only]** Evaluates JavaScript code.',
    async execute(message, args) {
        let isBotOwner = message.author.id == '589324103463338007';
        if (!isBotOwner) return message.channel.send(error_alert('Want to take control of me? NO!'));

        try {
            const code = args.join(" ");
            
            if (!code) return message.channel.send(error_alert('How could I execute your code if you didn\'t provide any?'));

            let evaled = eval(code);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

            const success = new Discord.MessageEmbed()
                .setDescription(`\`SUCCESS\` \`\`\`xl\n${clean(evaled)}\n\`\`\``)
                .setColor("#00d768")
                .setTimestamp();
            message.channel.send({ embeds: [success] });

        } catch (err) {
            const error = new Discord.MessageEmbed()
                .setDescription(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
                .setColor("#c2002a")
                .setTimestamp();
            message.channel.send({ embeds: [error] });
        }

    },
};
