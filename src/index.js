import Telegraf from 'telegraf';
import env from 'dotenv';
import { getConnection } from './database';
import { User } from './classes/User.class';

env.config();

console.log('listening to telegram bot PsiNapsis');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.help( ctx => {
  const response = `/start\n/remember [data to record]\n/recover\n/delete [number]\n\n(no hablo con bots)`;
  ctx.reply(response)
});




bot.start(ctx => {
  const { is_bot } = ctx.message.from.is_bot
  
  if(! is_bot) {
    const user = new User(ctx.from);
    user.idExists()
      .then(data => {
        if (!data) {
          user.newUser()
            .then(newUser => {
            ctx.reply(newUser);
            })
        }
      })
      .catch(err => {
        console.log('*** error ***', err)
      });

    ctx.reply(`PsiNapsis welcomes ${ctx.from.first_name} ${ctx.from.last_name}`);
  } else {
    ctx.reply('I do not speak with bots');
  }
});

bot.command(['remember'], (ctx) => {
  const user = new User(ctx.from);

  const { text } = ctx.message;
  const data = text.split('/remember ')[1];
  
  user.memory(data)
    .then( res => {
      ctx.reply('remembered!');
    })
    .catch( err => ctx.reply(`err: ${err}`) )
});

bot.command(['recover'], ctx => {
  const user = new User(ctx.from);

  user.recover()
    .then( response => {
      
      let res = '';
      response.map( item => {
        res += `${item.idmemory} - __${item.timemark}__ -> *${item.memory}* \n---\n`;
      });
      ctx.replyWithHTML(res,{parse_mode: 'Markdown'});
    })
    .catch( err => {
      ctx.reply(err);
    })
    
});

bot.command(['delete'], ctx => {
  const user = new User(ctx.from);
  const { text } = ctx.message;
  const data = text.split('/delete ')[1];

  user.delete(data)
    .then( () => {
      ctx.reply(`Deleted ${data}`);
    })
    .catch( err => {
      ctx.reply(`Error: ${err}`)
    })

});



bot.launch();

module.exports = false;