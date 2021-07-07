// Create update embeds

const Discord = require('discord.js');

require('../circuits/misc.js')();
require('./send.js')();

module.exports = function () {
    // Send macOS public InstallAssistant.pkg link
    this.send_macos_pkg_public = function (pkgurl, version, build) {
        const embed = new Discord.MessageEmbed()
            .setDescription(`macOS **${version} (${build})** Full Installer Package:\n> ${pkgurl}`)
            .setAuthor(`Unsupported Macs`, `https://i.imgur.com/5JatAyq.png`)
            .setThumbnail(getthumbnail("macOS"))
            .setColor(randomColor())
            .setTimestamp();
        send_to_servers('pkg', embed, `${version} (${build})`);
    };

    // Send macOS beta InstallAssistant.pkg link
    this.send_macos_pkg_beta = function (pkgurl, version, build) {
        const embed = new Discord.MessageEmbed()
            .setDescription(`macOS **${version} Beta (${build})** Full Installer Package:\n> ${pkgurl}`)
            .setAuthor(`Unsupported Macs`, `https://i.imgur.com/5JatAyq.png`)
            .setThumbnail(getthumbnail("macOS"))
            .setColor(randomColor())
            .setTimestamp();
        send_to_servers('pkg', embed, `${version} (${build})`);
    };

    // Send macOS delta updates
    this.send_macos_delta = function (pkgurl, version, build, beta) {
        (beta) ? isBeta = "Beta" : isBeta = "";
        const embed = new Discord.MessageEmbed()
            .setDescription(`macOS **${version} ${isBeta} (${build})** Delta Installer Package:\n> ${pkgurl}`)
            .setAuthor(`Unsupported Macs`, `https://i.imgur.com/5JatAyq.png`)
            .setThumbnail(getthumbnail("macOS"))
            .setColor(randomColor())
            .setTimestamp();
        send_to_servers('delta', embed, `${version} ${isBeta} (${build})`);
    };

    // Send new macOS beta releases
    this.send_macos_beta = function (version, build, size, updateid, changelog) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`New macOS Beta Release!`)
            .setAuthor(`Unsupported Macs`, `https://i.imgur.com/5JatAyq.png`)
            .addField(`Version`, `macOS ${version} (${updateid})`, true)
            .addField(`Build`, build, true)
            .addField(`Size`, formatBytes(size), true)
            .setThumbnail(getthumbnail("macOS"))
            .setColor(randomColor())
            .setTimestamp();
        send_to_servers('macos', embed, `${version} (${updateid} - Build ${build})`);
    };

    // Send new macOS public releases
    this.send_macos_public = function (version, build, size, changelog) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`New macOS Public Release!`)
            .setAuthor(`Unsupported Macs`, `https://i.imgur.com/5JatAyq.png`)
            .addField(`Version`, `macOS ${version}`, true)
            .addField(`Build`, build, true)
            .addField(`Size`, formatBytes(size), true)
            .setThumbnail(getthumbnail("macOS"))
            .setDescription(changelog)
            .setColor(randomColor())
            .setTimestamp();
        send_to_servers('macos', embed, `${version} (${build})`);
    };

    // Send other OS updates
    this.send_other_updates = function (os, version, build, size, changelog) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`New ${os} Public Release!`)
            .setAuthor(`Unsupported Macs`, `https://i.imgur.com/5JatAyq.png`)
            .addField(`Version`, `${version}`, true)
            .addField(`Build`, build, true)
            .addField(`Size`, formatBytes(size), true)
            .setThumbnail(getthumbnail(os))
            .setDescription(changelog)
            .setColor(randomColor())
            .setTimestamp();
        send_to_servers(os, embed, `${version} (${build})`);
    };

    // Send other OS beta updates
    this.send_other_beta_updates = function (os, version, build, size, updateid) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`New ${os} Beta Release!`)
            .setAuthor(`Unsupported Macs`, `https://i.imgur.com/5JatAyq.png`)
            .addField(`Version`, `${version} (${updateid})`, true)
            .addField(`Build`, build, true)
            .addField(`Size`, formatBytes(size), true)
            .setThumbnail(getthumbnail(os))
            .setColor(randomColor())
            .setTimestamp();
        send_to_servers(os, embed, `${version} (${updateid} - Build ${build})`);
    };

    // Send announcements
    this.send_announcements = function (title, message) {
        const embed = new Discord.MessageEmbed()
            .setTitle(title)
            .setAuthor(`Unsupported Macs`, `https://i.imgur.com/5JatAyq.png`)
            .setColor(randomColor())
            .setDescription(message)
            .setThumbnail(`https://i.imgur.com/d1lcrpg.png`)
            .setTimestamp();
        send_to_servers("bot", embed);
    }
}