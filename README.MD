#Telegram Bot
### installation
As you usually do with npm.

### .env
edit ```.env``` and edit 
```
BOT_TOKEN = xxxx

DB_PASS = xxxx
DB_USER = xxx
DB_BASE = xxxx
DB_HOST = xxxx
```
The BOT_TOKEN is provided by Telegram's BotFather when you create a new application.

## Mariadb / MySQL
create users table as: 
```
'CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `language_code` varchar(3) NOT NULL,
  `active` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8'
```
And then create memory table as 
```
'CREATE TABLE `memory` (
  `idmemory` int(11) NOT NULL AUTO_INCREMENT,
  `idusers` int(11) DEFAULT NULL,
  `timemark` timestamp NULL DEFAULT NULL,
  `memory` tinytext DEFAULT NULL,
  PRIMARY KEY (`idmemory`),
  KEY `fk_memory_1_idx` (`idusers`),
  CONSTRAINT `fk_memory_1` FOREIGN KEY (`idusers`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8'
```

## Commands in the bot
### /start
Creates you Telegram user in the database. 

### /remember
Run /remember [data to be recorded] (obviously without braces) to insert your data in the database.

### /recover
Run this to recover all you have in the database.

### /delete
Use /delete n, when n is the memory's idmemory to delete this row.

### /help
Shows the help in telegram.

That's all. Enjoy.
