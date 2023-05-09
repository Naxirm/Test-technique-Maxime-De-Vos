/* au vu de la petite taille du projet, j'ai souhaité utiliser la librairie lowdb,
qui permet d'utiliser mon fichier db.json comme une base de données.
A chaque requête, ce fichier db.json va être solicité, et on peut constater qu'il se remplit bien
avec les nouvelles excuses lorsque l'on en ajoute à partir de l'application */

/* imports */
import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { join, dirname } from "node:path";
import { JSONFile } from "lowdb/node";
import bodyParser from "body-parser";

/* setup de la bdd avec lowdb */
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const defaultData = {};
const db = new Low(adapter, defaultData);
await db.read();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* requêtes */
app.get("/", (req, res) => {
  return res.json(db.data);
});

app.get("/:id", (req, res) => {
  return res.json(db.data);
});

app.post(`/:id`, (req, res) => {
  const totalLength = db.data.length - 1;
  const nextId = db.data[totalLength].http_code + 1;
  const tag = "user excuse";
  const { message } = req.body;
  db.data.push({
    http_code: nextId,
    tag: tag,
    message: message,
  });
  db.write();
  res.redirect(`${nextId}`);
});

app.listen(3000, function () {
  console.log("app listening on port 3000");
});
