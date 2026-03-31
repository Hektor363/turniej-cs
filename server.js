const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// --- TWOJE DANE ---
const API_KEY = process.env.AIRTABLE_TOKEN; // Zaczyna się od "pat..."
const BASE_ID = "appSVXZTeNlPamSyw";    // Zaczyna się od "app..."
const TABLE_NAME = "tbl7FBvydRHS8F7cg";            // Upewnij się, że w Airtable tabela nazywa się dokładnie tak!

app.get("/teams", async (req, res) => {
  try {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
    
    const response = await axios.get(url, {
      headers: { 
        'Authorization': `Bearer ${API_KEY}` 
      }
    });

    console.log("Pobrano dane pomyślnie!");
    res.json(response.data);
    
  } catch (error) {
    // To wypisze nam w terminalu dokładnie co jest nie tak (np. zły klucz)
    console.error("BŁĄD AIRTABLE:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Nie udało się pobrać danych z Airtable" });
  }
});

// Dodatkowa trasa, żebyś widział, że serwer w ogóle żyje
app.get("/", (req, res) => {
  res.send("Backend działa! Wejdź na /teams żeby zobaczyć dane.");
});

app.listen(3000, () => {
  console.log("------------------------------------------");
  console.log("SERWER URUCHOMIONY!");
  console.log("Sprawdź: http://localhost:3000/teams");
  console.log("------------------------------------------");
});