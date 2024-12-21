// Base URL da API (conectando com o servidor)
const apiBaseUrl = 'http://localhost:5000/api/animals';

// Adicionar um novo animal
document.getElementById('animalForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita o comportamento padrão do formulário

  // Obter dados do formulário
  const numero = document.getElementById('numero').value;
  const sexo = document.getElementById('sexo').value;
  const idade = document.getElementById('idade').value;
  const filiacao = document.getElementById('filiacao').value;

  try {
    // Fazer uma requisição POST para o servidor
    const response = await fetch(apiBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero, sexo, idade, filiacao }),
    });

    if (!response.ok) throw new Error('Erro ao adicionar animal');

    alert('Animal adicionado com sucesso!');
    document.getElementById('animalForm').reset(); // Limpar o formulário
  } catch (error) {
    console.error(error.message);
    alert('Erro ao adicionar animal.');
  }
});

// Listar todos os animais
document.getElementById('getAnimals').addEventListener('click', async () => {
  try {
    // Fazer uma requisição GET para o servidor
    const response = await fetch(apiBaseUrl);
    if (!response.ok) throw new Error('Erro ao listar animais');

    const animals = await response.json();

    // Atualizar a lista de animais na página
    const animalList = document.getElementById('animalList');
    animalList.innerHTML = ''; // Limpar a lista atual

    animals.forEach((animal) => {
      const div = document.createElement('div');
      div.classList.add('animal-item');
      div.textContent = `Número: ${animal.numero}, Sexo: ${animal.sexo}, Idade: ${animal.idade}, Filiação: ${animal.filiacao}`;
      animalList.appendChild(div);
    });
  } catch (error) {
    console.error(error.message);
    alert('Erro ao listar animais.');
  }
});
