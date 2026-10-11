# BandMatch — Match de bandas

Protótipo criado no Claude Design: um app que conecta músicos por instrumento, nível, estilo, objetivo e disponibilidade, para encontrar ou montar uma banda.

## Como abrir

Abra `index.html` no navegador. O arquivo é autocontido (React, fontes e ícones embutidos) e funciona offline.

Telas do protótipo: Cadastro, Meu perfil, Procurar bandas, Detalhe da banda, Solicitações enviadas, Minhas bandas e Criar banda.

## Estrutura

- `index.html` — o app, pronto para rodar (gerado a partir de `design/`).
- `design/template.html` — marcação das telas.
- `design/app.js` — lógica e dados do protótipo (instrumentos, gêneros, bandas de exemplo, estado das telas).
- `design/photos.js` — fotos dos usuários (retratos ilustrados DiceBear "Notionists", licença CC0), gerado por `tools/photos.mjs`.

## Editando

Edite os arquivos em `design/` e rode:

```bash
python3 tools/build.py
```

O script coloca as mudanças dentro do `index.html`, mantendo o runtime, o React e as fontes embutidos.
