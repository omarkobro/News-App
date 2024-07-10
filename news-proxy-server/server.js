import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;
const apiKey = '06de1c55e8094e77a1ec6eb8dbe9e6d7';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/news', async (req, res) => {
    const { country, category } = req.query;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
