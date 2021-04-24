const { Client } = require('discord.js-selfbot');
const client = new Client();
const config = require('./config.json');
const message = config.message;
const user = config.targetid;
client.config = config;

console.log('Logging in... (This may take a few seconds)')

if (!user) return console.log('Please provide a user id in config.json');
if (!message) return console.log('Please provide a message in config.json')
    
client.on('ready', async () => {
   const type = 'channel' // 'dm' to dm someone or 'channel' to send messages in channels
   if (type === '') return console.log('Please provide a type!')
   if (type === 'dm') {
    const message = config.message
    const user = await client.users.fetch(config.targetid).catch((err) => console.log('There was an error finding the user... ' + err));
    console.log(`Successfully logged into ${client.user.tag}! Starting to spam ${user.id}. Type: DM`)
    while (true) {

   await user.send(message)
   .then(()=>{
    console.log('Sent successfully! Type: DM')
   })
   .catch((err) => {
     console.log('There was an error sending the message... ' + err);
   });
  }
}

if (type === 'channel') {
    const message = config.message
    const channel = await client.channels.fetch(config.targetid).catch((err) => console.log('There was an error finding the channel... ' + err));
    console.log(`Successfully logged into ${client.user.tag}! Starting to spam ${channel.name}. Type: CHANNEL`)
    while (true) {

   await channel.send(message)
   .then(()=>{
    console.log('Sent successfully! Type: CHANNEL')
   })
   .catch((err) => {
     console.log('There was an error sending the message... ' + err);
   });
}
}
});

client.login(client.config.token).catch((err) => console.log('There was an error logging in... ' + err));
