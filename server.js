const express = require("express")
const { LocalStorage } = require("node-localstorage")
const app = express();
const PORT = 3000;

const localStorage = new LocalStorage('./scratch')

localStorage.setItem("key", "thing you are trying to save")


app.use(express.json())

// GET ROUTE
app.get("/item/:key", (req, res) => {
    let key = req.params.key
    let storedItem = localStorage.getItem(key);

    if (storedItem) {
        res.json({ key: storedItem });
    } else {
        res.status(404).json({ error: `Item with key '${key}'not found` });
    }
});

// POST ROUTE
app.post("/item", (req, res) => {
    const { key, value } = req.body;

    if (key && value) {
        localStorage.setItem(key, value);
        res.json({ message: "Item stored successfully", key: key, value: value });
    } else {
        res.status(400).json({ message: "Invalid request. Please provide both key and value." });
    }
});

app.delete('/item/:key', (req, res) => {
    const key = req.params.key;
    const storedItem = localStorage.getItem(key);

    if (storedItem) {
        localStorage.removeItem(key);
        res.json({ message: `Item with key '${key}' deleted successfully` });
    } else {
        res.status(404).json({ error: `Item with key '${key}' not found` });
    }
});

app.listen(PORT, () => {
    console.log(`running express api at localhost:${PORT}`)
})