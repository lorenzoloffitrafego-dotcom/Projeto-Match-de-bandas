# BandMatch — Match de bandas

Protótipo criado no Claude Design: um app que conecta músicos por instrumento, nível, estilo, objetivo e disponibilidade, para encontrar ou montar uma banda.

## Como abrir

Abra `index.html` no navegador. O arquivo é autocontido (React, fontes e ícones embutidos) e funciona offline.

Telas do protótipo: Cadastro, Meu perfil, Procurar bandas, Detalhe da banda, Solicitações enviadas, Minhas bandas e Criar banda.

## Estrutura

- `index.html` — export completo do Claude Design (`BandMatch Web v2`), pronto para rodar.
- `design/app.js` — lógica e dados do protótipo (instrumentos, gêneros, bandas de exemplo, estado das telas), extraídos do export para consulta.
- `design/template.html` — marcação das telas, extraída do export para consulta.

Os arquivos em `design/` são só para leitura e referência: o app que roda é o `index.html`.
