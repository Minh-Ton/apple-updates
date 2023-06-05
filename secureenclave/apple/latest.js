// Send macOS Installers

const Discord = require("discord.js");
const catalogs = require("../../bootrom/catalogs.json");
const { SlashCommandBuilder } = require('@discordjs/builders');

require('../../applesilicon/main/manager.js')();
require('../../applesilicon/embed.js')();
require('../../applesilicon/misc.js')();

function isBeta(build) {
    if (build.length > 6 && build.toUpperCase() != build) return true; // May break in the future
    return false;
}

function get_links(xml_update) {
    let beta = []; let public = [];
    for (let update in xml_update) {
        let pkgurl = xml_update[update]['xml_pkg'];
        let version = xml_update[update]['xml_version'];
        let build = xml_update[update]['xml_build'];
        let size = xml_update[update]['xml_size'];

        if (isBeta(build)) beta.push(`macOS ${version} (Build ${build} - Size ${formatBytes(size)}): [InstallAssistant.pkg](${pkgurl})`);
        else public.push(`macOS ${version} (Build ${build} - Size ${formatBytes(size)}): [InstallAssistant.pkg](${pkgurl})`);
    }
    return [beta, public];
}

module.exports = {
    name: 'latest',
    command: 'latest',
    category: 'Apple',
    cooldown: 60,
    ephemeral: false,
    description: 'Gets the latest macOS Full Installer Packages.',
    data: new SlashCommandBuilder().setName("latest").setDescription("Gets the latest macOS Full Installer Packages."),
    async execute(interaction) {
        try {
            const processing = new Discord.MessageEmbed().setColor(randomColor());
            await interaction.editReply({ embeds: [processing.setDescription("Hang on, I'm fetching data from Apple...")] });

            let pkg_catalog = await get_pkg_assets(catalogs.macos_beta, 'beta_pkg');

            let installers = get_links(pkg_catalog);

            const embed = new Discord.MessageEmbed()
                .setTitle("macOS Full Installer Packages")
                .setDescription(`**Public Release Installers:**\n${installers[1].join('\n')}\n\n**Beta Release Installers:**\n${installers[0].join('\n')}`)
                .setColor(randomColor())
                .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
            interaction.editReply({ embeds: [embed] });
        } catch (error) {
            return interaction.editReply(error_alert("Ugh, an unknown error occurred.", error));
        }
    },
};
