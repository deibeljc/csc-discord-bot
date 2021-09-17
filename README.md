# CSC Server

General CSC API server.

## What is this?

This server contains all relevant CSC information to run the league effectively. It will contain all franchises, teams, players, matches, transactions, and so forth. It will then surface that information easily through a few different avenues.

1. A Discord Bot that has commands to both create and update data as well as view relevant information for both players and admins
   - The plan here shortly is to have public commands and admin only commands.
2. A REST/Graphql API that offers the same ability to interact with the data. This can be easily consumed by a front-end.

## What exists right now

The main things that is built right now is the infrastructure for the discord bot API to easily bootstrap new commands and to interact with the DB.

### Bot Commands

If you want to play with the bot in its current (master branch) state, join this discord: https://discord.gg/g6CFf5ZQPW

#### Commands

- /create player
- /create team
- /create franchise

## Future

The plan is to abstract the different commands into a unified core lib and share the relevant methods them across the discord bot and the API.

This platform could also easily be extended to include full stats with each match to easily build rankings and calculate MMR, etc.

## Technologies

- Node.js
- Prisma for the ORM layer
- Graphql/KOA for the API layer
