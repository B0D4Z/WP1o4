const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("announce")
        .setDescription("Announce Message in All Bot Servers!")

        .addStringOption((option) => option
            .setName("message")
            .setDescription("Message to be sent!")
            .setRequired(true)
        ),

    async execute(interaction) {
        const { client } = require('../bot');
        console.log(interaction)
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        var message = interaction.options.getString('message');
        const levelUpChannelIds = await sql.Execute(`SELECT level_up_channel_id FROM settings WHERE level_up_channel_id = '1000526899124117535'`)
        console.log(levelUpChannelIds[0])
        console.log(client)
        //Loop through announcement channels
        // for (let i = 0; i < levelUpChannelIds.length; i++) {
        //     let levelUpChannelId = levelUpChannelIds[i];
            
        //     try {
        //         let sendChannel = client.channels.cache.get(levelUpChannelId)                
        //         console.log(levelUpChannelId);
        //         sendChannel.send({ content: `${message}` })

        //     }
        //     catch (e) {
        //         console.log(e);
        //         console.log(levelUpChannelId);
        //     }
// }

        
        const announceEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Announcement Sent`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**Announcement Sent!**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')
            .addFields(
                { name: `Message`, value: `${message}` },
            )
            .setImage(`${guildIcon}`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Reaction Roles.`, iconURL: `${guildIcon}` });
            await interaction.reply({
            ephemeral: true,
            embeds: [announceEmbed],
        });

    },
};
