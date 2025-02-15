import express from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
import cors from 'cors';

/**
 * Dies ist der Servercode der App.
 * <ul>
 *  <li>Es liest die Daten aus der Datei „recipes.json“ ein und übergibt sie an die App-Seiten, die sie anfordern.</li>
 * </ul>
 */

const app = express();
const PORT = 3000;
const __dirname = path.resolve();
const DATA_FILE = path.join(__dirname, 'data', 'recipes.json');

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Route to fetch all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const data = await readFile(DATA_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: 'Error reading recipes data', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
