# chudbot

A Slack bot built for the **Stardance Hack Club** workspace. Handles fun utility commands — countdowns to events, random pairings, dice rolls, quotes, and more.

Built with [Slack Bolt for Node.js](https://slack.dev/bolt-js/) using Socket Mode, so no public URL or reverse proxy is needed.

> **Note:** This README was polished with AI assistance. A few of the slash command handlers also had syntax issues on the first try — AI helped debug and fix those.

---

## Commands

| Command | Description |
|---|---|
| `/chudbot-ping` | Latency check — replies with `Pong!` and response time in ms |
| `/chudbot-countdown` | Shows time remaining until the next Stardance event |
| `/chudbot-quote` | Drops a random programming quote |
| `/chudbot-pair Alice, Bob, Charlie` | Randomly pairs names from a comma-separated list |
| `/chudbot-roll 2d6` | Rolls dice in `NdN` format (defaults to `1d6`) |
| `/chudbot-flip` | Flips a coin |
| `/chudbot-choose option1, option2, option3` | Picks one option at random |

---

## Setup

**Prerequisites:** Node.js 18+

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your Slack tokens:

```
SLACK_BOT_TOKEN=xoxb-...
SLACK_APP_TOKEN=xapp-...
```

Get these from [api.slack.com/apps](https://api.slack.com/apps) under your app's **OAuth & Permissions** and **Basic Information** pages. Socket Mode must be enabled, and the app token needs the `connections:write` scope.

### 3. Run

```bash
node index.js
```

You should see `bot is running!` in the console.

---

## Project Structure

```
slack-chudbot/
├── index.js        # All bot logic and command handlers
├── .env.example    # Template for required environment variables
└── package.json
```

---

## License

ISC
