const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

['estilo', 'imagens', 'new_romantics', 'hando'].forEach((pasta) => {
  app.use('/' + pasta, express.static(path.join(__dirname, pasta)));
});

['index.html', 'minhacolecao.html', 'script.js'].forEach((arquivo) => {
  app.get('/' + arquivo, (req, res) => res.sendFile(path.join(__dirname, arquivo)));
});
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log(`Servidor na porta ${port}`));
