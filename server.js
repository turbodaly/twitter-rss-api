const express = require('express');
const Parser = require('rss-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const parser = new Parser();

const FEED_URL = 'https://nitter.poast.org/DeItaone/rss';

app.use(cors());

app.get('/api/latest-tweet', async (req, res) => {
  try {
    const feed = await parser.parseURL(FEED_URL);
    const latest = feed.items[0];

    if (!latest) return res.json({ text: null, id: null });

    res.json({ text: latest.title, id: latest.link });
  } catch (err) {
    console.error('Error fetching RSS feed:', err);
    res.status(500).json({ error: 'Failed to fetch tweet.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});