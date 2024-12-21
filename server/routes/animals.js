const express = require('express'); // Importa o módulo Express
const router = express.Router(); // Cria um roteador que define as rotas modularmente
const db = require('../db');

// 1. Listar todos os animais
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM animals');
        res.json(result.rows); // Retorna todos os animais
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar animais' });
    }
});

// 2. Obter um animal específico por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Obtém o ID da URL
    try {
        const result = await db.query('SELECT * FROM animals WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Animal não encontrado' }); // Retorna 404 se o animal não existir
        }
        res.json(result.rows[0]); // Retorna o animal encontrado
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter animal' });
    }
});

// Rota para adicionar um novo animal
router.post('/', async (req, res) => {
    const { numero, sexo, idade, filiacao } = req.body;
    try {
      const result = await db.query(
        'INSERT INTO animals (numero, sexo, idade, filiacao) VALUES ($1, $2, $3, $4) RETURNING *',
        [numero, sexo, idade, filiacao]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro ao adicionar animal' });
    }
  });
  

// Rota para atualizar um animal específico pelo ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { numero, sexo, idade, filiacao } = req.body;
    try {
      const result = await db.query(
        'UPDATE animals SET numero = $1, sexo = $2, idade = $3, filiacao = $4 WHERE id = $5 RETURNING *',
        [numero, sexo, idade, filiacao, id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Animal não encontrado' });
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro ao atualizar animal' });
    }
  });
  

// Rota para excluir um animal específico pelo ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query('DELETE FROM animals WHERE id = $1 RETURNING *', [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Animal não encontrado' });
      }
  
      res.status(200).json({ message: 'Animal excluído com sucesso' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Erro ao excluir animal' });
    }
  });  

module.exports = router; // Exporta o roteador para ser usado em outros arquivos
