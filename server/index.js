const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// Middleware
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Bem-vindo ao sistema de registro de animais!'); // Mensagem de boas-vindas
});

const animalRoutes = require('./routes/animals');
app.use('/api/animals', animalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));