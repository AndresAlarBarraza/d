const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const path = require('path');
const CmdName = path.parse(__filename).name;
const {joinVoiceChannel, createAudioPlayer, createAudioResource} = require('@discordjs/voice');
module.exports = {
	name: `${CmdName}`,
	description: `Plays the ${CmdName} Soundboard Sound`,
	category: "🔊 Soundboard",
	cooldown: 5,
	usage: `${CmdName}`,
	run: async (client, message, args, cmduser, text, prefix) => {
		const es = client.settings.get(message.guild.id, "embed");
		const ls = client.settings.get(message.guild.id, "language")
		if (!client.settings.get(message.guild.id, "SOUNDBOARD")) {return message.reply({embeds: [new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle(client.la[ls].common.disabled.title).setDescription(require(`${process.cwd()}/handlers/functions`).handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))]});}
		const { channel } = message.member.voice;
		const botchannel = message.guild.me.voice.channel;
		if (!channel) {return message.reply({embeds: [new MessageEmbed().setTitle(eval(client.la[ls]["cmds"]["soundboard"][`${CmdName}`]["variable1"])).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)]});}
		if (botchannel) {return message.reply({embeds: [new MessageEmbed().setTitle(eval(client.la[ls]["cmds"]["soundboard"][`${CmdName}`]["variable2"])).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)]});}
		const e = await message.react('🎙️').catch(e => console.log(String(e).grey))
		let VoiceConnection = joinVoiceChannel({channelId: channel.id,guildId: channel.guild.id,adapterCreator: channel.guild.voiceAdapterCreator}); 
		const resource = createAudioResource(path.join(__dirname + `/audio/${CmdName}.mp3`), {inlineVolume: true});
		resource.volume.setVolume(0.2);
		const player = createAudioPlayer();
		VoiceConnection.subscribe(player);
		player.play(resource);
		player.on("idle", () => {
			try {player.stop();} catch (e) {console.log(String(e).grey)}
			try {VoiceConnection.destroy();} catch (e) {console.log(String(e).grey)}
			e.remove().catch(e => console.log(String(e).grey))
		});
	}
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */

