// Teste rápido dos fluxos principais do protótipo, no computador e no celular.
// Uso: NODE_PATH=$(npm root -g) node tools/smoke.js   (precisa do Playwright)
const { chromium } = require('playwright');
const path = require('path');
const FILE = 'file://' + path.resolve(__dirname, '..', 'index.html');
const fails = [];
const ok = (name, cond) => { if (!cond) fails.push(name); console.log((cond ? '  ok  ' : 'FALHOU ') + name); };

(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  for (const [width, height, tag] of [[1280, 900, 'computador'], [390, 844, 'celular']]) {
    console.log('\n== ' + tag);
    const p = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    p.on('pageerror', e => errors.push(e.message.split('\n')[0]));
    p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await p.goto(FILE); await p.waitForTimeout(1500);
    const w = (ms = 250) => p.waitForTimeout(ms);
    const text = () => p.innerText('body');
    const btn = re => p.locator('button', { hasText: re });
    const fits = async name => ok(name + ' cabe na largura da tela', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));

    // Login: validação e criação de conta com outro nome
    await btn(/^Entrar$/).click(); await w();
    ok('login avisa e-mail inválido', (await text()).includes('Digite um e-mail válido'));
    await btn(/^Criar conta$/).click(); await w();
    await p.fill('input[placeholder="Seu nome"]', 'Marina Alves');
    await p.fill('input[type=email]', 'marina@teste.com');
    await p.fill('input[type=password]', 'abcdef');
    await btn(/^Criar conta$/).first().click(); await w();
    ok('criar conta leva ao cadastro', (await text()).includes('O que você toca?'));
    await fits('cadastro');

    // Cadastro: instrumento novo já vem com Básico
    await p.getByText('Adicionar instrumento').click(); await w();
    await btn(/^Baixo$/).click(); await w();
    ok('instrumento novo vem com nível Básico', (await text()).includes('Consigo tocar músicas simples'));
    await p.locator('input[type=range]').fill('3'); await w();
    ok('barra de nível muda a frase', (await text()).includes('Já pego todas as músicas'));
    await p.getByText('Concluir', { exact: true }).click(); await w();
    await p.getByText('Continuar').click(); await w();
    await btn(/^MPB$/).click(); await w();
    await p.getByText('Continuar').click(); await w();
    ok('passo 4 tem objetivo e local', (await text()).includes('Qual o seu objetivo?') && (await text()).includes('Onde você quer tocar?'));
    await p.getByText('Ver bandas compatíveis').click(); await w();
    await fits('procurar bandas');

    // Busca e filtros
    ok('lista as 3 bandas', ((await text()).match(/Vaga:/g) || []).length === 3);
    await p.fill('input[placeholder="Buscar banda pelo nome"]', 'zzzz'); await w();
    ok('busca sem resultado mostra aviso', (await text()).includes('Nenhuma banda encontrada'));
    await p.getByLabel('Limpar busca').click(); await w();
    await btn(/Filtros/).click(); await w();
    await btn(/^Tocar fora$/).click(); await w();
    ok('filtro por objetivo', (await text()).includes('Volume 7') && !(await text()).includes('Fio Desencapado'));
    await p.getByText('Limpar filtros').click(); await w();

    // Candidato: pedir para entrar e conversar
    await p.getByText('Fio Desencapado', { exact: true }).click(); await w();
    await fits('detalhe da banda');
    await btn(/^Quero entrar$/).click(); await w();
    ok('pedido enviado', (await text()).includes('Solicitação enviada'));
    await btn(/^Solicitação enviada$/).click(); await w();
    ok('2 solicitações enviadas', (await text()).includes('Fio Desencapado') && (await text()).includes('Domingo Cedo'));
    await btn(/^chatConversa(?!r)/).click(); await w();
    ok('conversa usa o nome de quem criou a conta', (await text()).includes('Oi Marina, bem-vindo'));
    await p.fill('input[placeholder="Escreva uma mensagem"]', 'Sábado funciona!');
    await p.press('input[placeholder="Escreva uma mensagem"]', 'Enter');
    await btn(/Solicitações enviadas$/).first().click(); await w(3000);
    ok('resposta acende o balão', /Conversa\s*1/.test(await btn(/^chatConversa(?!r)/).innerText()));
    await fits('solicitações enviadas');

    // Líder: solicitações, conversa, aceitar
    await p.getByText('Minhas bandas', { exact: true }).nth(1).click(); await w();
    ok('card da banda mostra novidades', /novidades? nas solicitações/.test(await text()));
    await p.getByText('Garagem 22', { exact: true }).click(); await w();
    ok('integrante mostra o nome da conta', (await text()).includes('Marina Alves (você)') && !(await text()).includes('Lucas'));
    await fits('banda');
    await btn(/^Solicitações/).last().click(); await w();
    await btn(/^chatConversa(?!r)/).click(); await w();
    ok('conversa do líder só tem Voltar', (await text()).includes('Voltar às solicitações') && !(await text()).includes('Aceitar'));
    await fits('conversa do líder');
    await btn(/Voltar às solicitações/).click(); await w();
    await btn(/^Aceitar$/).first().click(); await w();
    await btn(/^Banda$/).click(); await w();
    ok('aceito entra na banda', (await text()).includes('Mateus Prado'));

    // Configurações da banda
    await p.locator('button[aria-label="Configurações"]').click(); await w();
    await fits('configurações');
    await p.getByText('Vagas abertas', { exact: true }).click(); await w();
    await btn(/^Guitarra$/).click(); await w();
    await p.locator('button[aria-label="Mais uma vaga de Guitarra"]').click(); await w();
    ok('2 vagas do mesmo instrumento', (await text()).includes('2× Guitarra'));
    await p.getByText('Repertório', { exact: true }).click(); await w();
    await p.fill('input[placeholder="Buscar música ou artista"]', 'legi'); await w();
    await p.keyboard.press('Enter'); await w();
    ok('busca de música adiciona', (await text()).includes('Tempo Perdido') && (await text()).includes('4 músicas'));
    await p.getByText('Integrantes', { exact: true }).last().click(); await w();
    await btn(/^Remover$/).first().click(); await w();
    await btn(/^Remover$/).last().click(); await w();
    ok('remover integrante', (await text()).includes('1 integrante'));

    // Criar banda
    await p.getByText('Criar banda', { exact: true }).first().click(); await w();
    await fits('criar banda');
    await p.fill('input[placeholder="Ex.: Garagem 22"]', 'Banda Teste');
    await btn(/^Hobby/).click(); await w();
    await btn(/^Criar e publicar vagas$/).click(); await w();
    ok('banda criada abre', (await text()).includes('Banda Teste') && (await text()).includes('Marina Alves (você)'));
    await p.locator('button[aria-label="Configurações"]').click(); await w();
    await p.getByText('Excluir banda', { exact: true }).click(); await w();
    await p.getByText('Sim, excluir banda').click(); await w();
    ok('excluir volta para os cards', (await text()).includes('Bandas que você criou ou faz parte') && !(await text()).includes('Banda Teste'));

    // Perfil
    await p.getByText('Meu perfil', { exact: true }).nth(1).click(); await w();
    ok('perfil mostra a conta', (await text()).includes('Marina Alves') && (await text()).includes('marina@teste.com'));
    await fits('perfil');
    ok('sem erros no console', errors.length === 0);
    if (errors.length) console.log(errors.slice(0, 5));
    await p.close();
  }
  await browser.close();
  console.log(fails.length ? '\n' + fails.length + ' falha(s)' : '\nTudo certo.');
  process.exit(fails.length ? 1 : 0);
})();
