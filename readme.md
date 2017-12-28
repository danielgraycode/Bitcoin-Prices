# Bitcoin-Prices
Have you ever wanted to selfhost a program which tells you bitcoin prices? Of course you have!
This is a simple to run web app which displays bitcoin prices in USD, GBP and YNG

## How do I work machine?
Its easy. Simply download me, run `npm install`, then make sure you have changed the config.json.example to config.json and entered all the details in there. After that, type in `npm start`
and it is up and running!
### Recommendations
I recommend using a process manager like [pm2](http://pm2.keymetrics.io/) to keep your Bitcoin-Prices process up and running.

## Arguments
When running the program, you can add the following to change the behaivour of the program.
(If you always want the options on, configure the package.json accordingly.)
* `--ssl` - Tells the program to start the configured SSL port.

