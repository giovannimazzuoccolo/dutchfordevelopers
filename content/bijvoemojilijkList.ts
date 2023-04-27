export const adijlist = [
    {
      "dutch": "groot",
      "english": "big",
      "emoji": "🐘"
    },
    {
      "dutch": "klein",
      "english": "small",
      "emoji": "🐭"
    },
    {
      "dutch": "mooi",
      "english": "beautiful, pretty",
      "emoji": "💄"
    },
    {
      "dutch": "lelijk",
      "english": "ugly",
      "emoji": "🤢"
    },
    {
      "dutch": "snel",
      "english": "fast, quick",
      "emoji": "🏎️"
    },
    {
      "dutch": "langzaam",
      "english": "slow",
      "emoji": "🐌"
    },
    {
      "dutch": "goed",
      "english": "good",
      "emoji": "👍"
    },
    {
      "dutch": "slecht",
      "english": "bad",
      "emoji": "👎"
    },
    {
      "dutch": "duur",
      "english": "expensive",
      "emoji": "💰"
    },
    {
      "dutch": "goedkoop",
      "english": "cheap",
      "emoji": "💸"
    },
    {
      "dutch": "druk",
      "english": "busy",
      "emoji": "🕰️"
    },
    {
      "dutch": "rustig",
      "english": "quiet",
      "emoji": "🤫"
    },
    {
      "dutch": "zwaar",
      "english": "heavy",
      "emoji": "🏋️"
    },
    {
      "dutch": "licht",
      "english": "light",
      "emoji": "💡"
    },
    {
      "dutch": "oud",
      "english": "old",
      "emoji": "👴"
    },
    {
      "dutch": "nieuw",
      "english": "new",
      "emoji": "🆕"
    },
    {
      "dutch": "hard",
      "english": "hard",
      "emoji": "🥊"
    },
    {
      "dutch": "zacht",
      "english": "soft",
      "emoji": "🧸"
    },
    {
      "dutch": "interessant",
      "english": "interesting",
      "emoji": "🤔"
    },
    {
      "dutch": "saai",
      "english": "boring",
      "emoji": "😴"
    },
    {
      "dutch": "makkelijk",
      "english": "easy",
      "emoji": "👌"
    },
    {
      "dutch": "moeilijk",
      "english": "difficult",
      "emoji": "🤯"
    },
    {
      "dutch": "lekker",
      "english": "tasty, delicious",
      "emoji": "🍔"
    },
    {
      "dutch": "vies",
      "english": "dirty, gross",
      "emoji": "🤮"
    },
    {
      "dutch": "warm",
      "english": "warm, hot",
      "emoji": "🔥"
    }];

//const otherEmojis = [ '👋', '🥶', '😈', '🤑', '🤥', '👮‍♀️', '👨‍🌾', '👕', '🍒', '🏂' ];

export interface ResultEmojiList { english:string, emoji: string, dutch? : string}

export const otherEmojisWithNames = [  { english: 'waving hand', emoji: '👋' },  { english: 'cold face', emoji: '🥶' },  { english: 'smiling imp', emoji: '😈' },  { english: 'money', emoji: '🤑' },  { english: 'lying', emoji: '🤥' },  { english: 'officer', emoji: '👮‍♀️' },  { english: 'farmer', emoji: '👨‍🌾' },  { english: 'tshirt', emoji: '👕' },  { english: 'cherries', emoji: '🍒' },  { english: 'snowboarder', emoji: '🏂' }];

export function getEmojis(): ResultEmojiList[] {
  const list = otherEmojisWithNames;
  const result: ResultEmojiList[] = [];

  while (result.length < 3) {
    const randomIndex: number = Math.floor(Math.random() * list.length);
    const randomElement = list[randomIndex];

    if (!result.includes(randomElement)) {
      result.push(randomElement);
    }
  }

  return result;
}
