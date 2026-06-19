require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/chudbot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

const QUOTES = [
  { text: "Talk is cheap, show me the code.", author: "Linus Torvalds" },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    text: "Programs must be written for people to read.",
    author: "Harold Abelson",
  },
  {
    text: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
  },
  {
    text: "Premature optimization is the root of all evil.",
    author: "Donald Knuth",
  },
  {
    text: "Any fool can write code a computer understands.",
    author: "Martin Fowler",
  },
  {
    text: "Debugging is twice as hard as writing the code.",
    author: "Brian Kernighan",
  },
];

app.command("/chudbot-quote", async ({ command, ack, respond }) => {
  await ack();
  const pick = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  await respond({ text: `"${pick.text}"\n— ${pick.author}` });
});

const NEXT_MEETING = new Date("2026-07-01T18:00:00-07:00");

app.command("/chudbot-countdown", async ({ command, ack, respond }) => {
  await ack();
  const now = new Date();
  const diff = NEXT_MEETING - now;

  if (diff <= 0) {
    await respond({
      text: "The event is happening right now (or already happened)!",
    });
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  await respond({
    text: `${days}d ${hours}h ${minutes}m until the next Stardance event.`,
  });
});

app.command("/chudbot-pair", async ({ command, ack, respond }) => {
  await ack();
  const names = command.text
    .split(",")
    .map((n) => n.trim())
    .filter((n) => n.length > 0);

  if (names.length < 2) {
    await respond({
      text: "Give me at least 2 names, comma separated. Example: /chudbot-pair Alice, Bob, Charlie, Dana",
    });
    return;
  }

  for (let i = names.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [names[i], names[j]] = [names[j], names[i]];
  }

  const groups = [];
  for (let i = 0; i < names.length; i += 2) {
    if (i === names.length - 1) {
      groups[groups.length - 1].push(names[i]);
    } else {
      groups.push([names[i], names[i + 1]]);
    }
  }

  const text = groups.map((g) => g.join(" + ")).join("\n");
  await respond({ text: `Pairings:\n${text}` });
});

app.command("/chudbot-roll", async ({ command, ack, respond }) => {
  await ack();
  const input = command.text.trim().toLowerCase();
  const match = input.match(/^(\d*)d(\d+)$/);

  let count = 1;
  let sides = 6;

  if (match) {
    count = match[1] ? parseInt(match[1]) : 1;
    sides = parseInt(match[2]);
  }

  if (count > 20) count = 20;
  if (sides > 1000) sides = 1000;

  const rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }

  const total = rolls.reduce((a, b) => a + b, 0);
  await respond({
    text: `Rolled ${count}d${sides}: [${rolls.join(", ")}] → Total: ${total}`,
  });
});

app.command("/chudbot-flip", async ({ command, ack, respond }) => {
  await ack();
  const result = Math.random() < 0.5 ? "Heads" : "Tails";
  await respond({ text: `🪙 ${result}` });
});

app.command("/chudbot-choose", async ({ command, ack, respond }) => {
  await ack();
  const options = command.text
    .split(",")
    .map((o) => o.trim())
    .filter((o) => o.length > 0);

  if (options.length < 2) {
    await response({
      text: "Give me at least 2 options, comma seperated. For example: /chudbot-choose ChatGPT, Claude, Gemini",
    });
    return;
  }

  const choice = options[Math.floor(Math.random() * options.length)];
  await respond({ text: " I choose: *$[choice]8" });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
