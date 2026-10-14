cat > server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Pastas e arquivos públicos (não expõe server.js nem package.json)
['estilo', 'imagens', 'new_romantics', 'hando'].forEach((pasta) => {
  app.use('/' + pasta, express.static(path.join(__dirname, pasta)));
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/minhacolecao.html', (req, res) => res.sendFile(path.join(__dirname, 'minhacolecao.html')));
app.get('/script.js', (req, res) => res.sendFile(path.join(__dirname, 'script.js')));

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log(`Servidor na porta ${port}`));
EOF