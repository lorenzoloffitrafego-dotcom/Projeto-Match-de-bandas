const INK='#1d1b18', LINE='#ddd8ce', ACC='#b4502e', OK='#2f6b45';
// Instrumentos agrupados por família; INSTR segue a mesma ordem em todas as listas.
const INST_GROUPS=[['Cordas',['Guitarra','Violão','Baixo','Cavaquinho','Ukulele','Violino','Violoncelo']],['Teclas',['Teclado','Piano','Acordeão']],['Percussão',['Bateria','Percussão']],['Sopros',['Saxofone','Trompete','Trombone','Flauta','Gaita']],['Voz',['Voz']],['Outros',['DJ / Produção']]];
const INSTR=INST_GROUPS.flatMap(g=>g[1]);
// Gêneros em famílias, cada uma com uma cor; GENRES segue essa ordem.
const GENRE_GROUPS=[
 ['#2f6fd6',['Rock','Rock alternativo','Rock nacional','Indie','Hard rock','Metal','Punk']],
 ['#e8892f',['Pop','Pop rock','Eletrônica']],
 ['#e0604a',['MPB','Samba','Pagode','Bossa nova']],
 ['#c9922a',['Sertanejo','Forró','Folk / Country']],
 ['#7b4fc9',['Rap / Hip hop','Funk','R&B / Soul','Reggae']],
 ['#1f9a8a',['Jazz','Blues','Gospel']]];
const GENRES=GENRE_GROUPS.flatMap(g=>g[1]);
const GCOL=Object.fromEntries(GENRE_GROUPS.flatMap(([c,gs])=>gs.map(g=>[g,c])));
const DAYS=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'], PER=['Manhã','Tarde','Noite'];
const LEVELS=[{label:'Acabei de começar',short:'Começando'},{label:'Consigo tocar músicas simples',short:'Básico'},{label:'Consigo tocar qualquer música desde que eu tenha tempo',short:'Intermediário'},{label:'Já pego todas as músicas',short:'Avançado'}];
const LVI=s=>LEVELS.findIndex(l=>l.short===s);
const LCOL=['#2f9e5a','#e8892f','#d64545','#7b4fc9']; // Começando, Básico, Intermediário, Avançado
const SG='Apresentação de vez em quando';
const GOALS=[{label:'Hobby',desc:'Tocar por diversão, sem compromisso de show'},{label:SG,desc:'Ex.: um show por semestre, cerca de 4 músicas'},{label:'Tocar fora',desc:'Repertório longo, ensaios extras, shows'}];
const BANDS=[
 {id:'fio',name:'Fio Desencapado',goal:SG,when:'Qui · 19h–21h',slot:'Qui-Noite',where:'Sala 3 · Escola',vaga:'Guitarra',genres:'Indie rock · Rock nacional',rep:[{t:'Do I Wanna Know?',a:'Arctic Monkeys'},{t:'Equalize',a:'Pitty'},{t:'Last Nite',a:'The Strokes'},{t:'Vou Deixar',a:'Skank'}],members:[{i:'AC',n:'Ana Costa',r:'Voz',lvl:'Intermediário',lead:true},{i:'RS',n:'Rafael Souza',r:'Bateria',lvl:'Avançado'},{i:'BL',n:'Bia Lopes',r:'Baixo',lvl:'Intermediário'}],rp:80,req:'Intermediário'},
 {id:'dom',name:'Domingo Cedo',goal:SG,when:'Sáb · 10h–12h',slot:'Sáb-Manhã',where:'Sala 1 · Escola',vaga:'Guitarra',genres:'MPB · Indie folk',rep:[{t:'Trem-Bala',a:'Ana Vilela'},{t:'Velha Infância',a:'Tribalistas'},{t:'Ho Hey',a:'The Lumineers'}],members:[{i:'CM',n:'Carol Melo',r:'Voz',lvl:'Intermediário',lead:true},{i:'TH',n:'Thiago Reis',r:'Teclado',lvl:'Avançado'}],rp:60,req:'Básico'},
 {id:'vol',name:'Volume 7',goal:'Tocar fora',when:'Sex · 20h–23h',slot:'Sex-Noite',where:'Estúdio externo',vaga:'Guitarra',genres:'Hard rock · Metal',rep:[{t:'Enter Sandman',a:'Metallica'},{t:'Roots Bloody Roots',a:'Sepultura'},{t:'Back in Black',a:'AC/DC'}],members:[{i:'GF',n:'Gui Faria',r:'Voz',lvl:'Avançado',lead:true},{i:'DN',n:'Duda Nunes',r:'Baixo',lvl:'Avançado'},{i:'PK',n:'Pedro Kim',r:'Bateria',lvl:'Avançado'}],rp:60,req:'Avançado'}
];
const NAV=[['login','Login'],['onb','Cadastro'],['profile','Meu perfil'],['search','Procurar bandas'],['detail','Detalhe da banda'],['sent','Solicitações enviadas'],['bands','Minhas bandas'],['create','Criar banda']];
const STATUS={pending:{l:'Pendente',bg:'#f6ecd2',fg:'#7a5a12'},chatting:{l:'Em conversa',bg:'#e4e0ea',fg:'#4b3f72'},accepted:{l:'Aceita',bg:'#e3efe6',fg:'#2f6b45'},declined:{l:'Recusada',bg:'#efebe4',fg:'#6b665e'}};
const TEST={fio:{w:'Qui, 15 out · 19h–21h',m:'Oi Lucas! Curtimos seu perfil. Bora fazer um ensaio teste na quinta? Pensamos em Do I Wanna Know, Equalize e Last Nite.'},dom:{w:'Sáb, 17 out · 10h–12h',m:'Oi Lucas, bem-vindo! Sábado de manhã funciona pra um ensaio teste?'},vol:{w:'Sex, 16 out · 20h–23h',m:'Fala Lucas! Sexta tem ensaio no estúdio, cola lá pra testar.'}};
const G22={id:'g22',slots:['Ter-Noite'],name:'Garagem 22',role:'owner',genres:'Rock alternativo · Indie',goal:'Apresentação de vez em quando',when:'Ter · 19h–21h',where:'Sala 2 · Escola',vagas:['Bateria','Voz'],
  members:[{i:'LM',n:'Lucas Martins (você)',r:'Guitarra',lvl:'Intermediário',tag:'Líder'}],
  reqs:[{id:'mt',chat:[],i:'MP',n:'Mateus Prado',r:'Bateria',lvl:'Intermediário',insts:[['Bateria','Intermediário'],['Percussão','Básico']],goal:SG,genres:['Rock alternativo','Indie','Punk'],avail:['Ter-Noite','Qui-Noite','Sáb-Tarde'],city:'Joinville, SC',first:'Valeu por aceitar! Terça às 19h funciona pra mim.',status:'pending'},{id:'ju',status:'chatting',chat:[{sys:true,t:'Conversa privada com Júlia. Só vocês dois veem.'},{mine:true,t:'Oi Júlia! Curtimos seu perfil. Bora conversar?'},{t:'Oi! Que bom, adorei a banda 😊',unread:true},{t:'Posso ir no ensaio de terça pra gente se conhecer?',unread:true}],i:'JR',n:'Júlia Reis',r:'Voz',lvl:'Básico',insts:[['Voz','Básico']],goal:'Hobby',genres:['Pop','Rock nacional','MPB'],avail:['Ter-Noite','Sex-Noite'],city:'Jaraguá do Sul, SC',first:'Oba! Posso levar a letra de Admirável Chip Novo?',status:'chatting'}],
  rep:[{t:'Everlong',a:'Foo Fighters'},{t:'Reptilia',a:'The Strokes'},{t:'Admirável Chip Novo',a:'Pitty'}],
  reh:{label:'PRÓXIMO ENSAIO',when:'Ter, 13 out · 19h–21h',where:'Sala 2 · Escola',confirmed:true},
  msgs:[{sys:true,t:'Banda criada. Quando alguém entrar, a conversa aparece aqui.'}]};
// Joinville e região (norte de SC), mais as cidades vizinhas do Paraná.
const CITIES=[['Joinville','SC'],['Jaraguá do Sul','SC'],['Araquari','SC'],['Guaramirim','SC'],['São Francisco do Sul','SC'],['Garuva','SC'],['Itapoá','SC'],['Barra Velha','SC'],['Balneário Barra do Sul','SC'],['Balneário Piçarras','SC'],['Penha','SC'],['Schroeder','SC'],['Massaranduba','SC'],['Corupá','SC'],['São Bento do Sul','SC'],['Campo Alegre','SC'],['Rio Negrinho','SC'],['Pomerode','SC'],['Blumenau','SC'],['Navegantes','SC'],['Itajaí','SC'],['Balneário Camboriú','SC'],['Guaratuba','PR'],['Curitiba','PR']];
const GENRE_EXTRA=['Reggae','Samba','Samba rock','Pagode','Sertanejo','Forró','Axé','Bossa nova','Choro','Rap','Hip hop','Trap','R&B','Soul','Jazz','Gospel','Punk','Hardcore','Grunge','Emo','Hard rock','Rock progressivo','Heavy metal','Thrash metal','Country','Folk','Eletrônica','Lo-fi','Música clássica','Indie folk','Pop rock','Ska','Disco','Funk carioca','Psicodelia','Shoegaze','Post-rock','Brega','Piseiro','Frevo','Baião','MPB alternativa'];
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const lev=(a,b)=>{const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length];};
const gScore=(g,q)=>{g=norm(g);if(g.startsWith(q))return 0;if(g.split(/[\s-]/).some(w=>w.startsWith(q)))return 1;if(g.includes(q))return 2;if(q.length>=2&&g[0]===q[0]){const tol=q.length<=3?1:2;const p=Math.min(lev(q,g.slice(0,q.length)),lev(q,g.slice(0,q.length+1)),lev(q,g));if(p<=tol)return 3+p;}return 99;};
const ICO_P={
 'Voz':'<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5V21M8.5 21h7"/>',
 'Guitarra':'<path d="M13.5 10.5 20 4"/><path d="m18.5 2.5 3 3"/><path d="M10.6 9.4c-1.5-1.5-3.9-1.4-5 .4-.5.8-.4 1.8-1.5 2.4-1.7 1-1.8 3.4-.3 4.9l2.7 2.7c1.5 1.5 3.9 1.4 4.9-.3.6-1.1 1.6-1 2.4-1.5 1.8-1.1 1.9-3.5.4-5z"/><circle cx="8.8" cy="15.2" r="1.3"/>',
 'Baixo':'<path d="M12.8 11.2 21 3"/><path d="M19.2 2.2l.9.9M21.8 4.8l-.9-.9M18 3.4l.9.9M20.6 6l-.9-.9"/><path d="M9.8 10.2c-1.4-1.2-3.4-1-4.3.6-.4.7-.4 1.6-1.4 2.1-1.6.9-1.7 3.1-.3 4.5l2.4 2.4c1.4 1.4 3.6 1.3 4.5-.3.5-1 1.4-1 2.1-1.4 1.6-.9 1.8-2.9.6-4.3z"/><path d="M7 14.5l2.5 2.5"/>',
 'Bateria':'<ellipse cx="12" cy="9" rx="8" ry="3"/><path d="M4 9v7c0 1.7 3.6 3 8 3s8-1.3 8-3V9"/><path d="M4 12.5c0 1.7 3.6 3 8 3s8-1.3 8-3" opacity=".45"/><path d="m7.5 2.5 3.5 5M16.5 2.5 13 7.5"/>',
 'Teclado':'<rect x="2.5" y="5.5" width="19" height="13" rx="2.5"/><path d="M7.25 12.5v6M12 12.5v6M16.75 12.5v6"/><path d="M6 5.5v7h2.5v-7M10.75 5.5v7h2.5v-7M15.5 5.5v7H18v-7" class="k"/>',
 'Outro':'<path d="M9 18V5.5l11-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>'};
const ICO_A={'Violão':'Guitarra','Ukulele':'Guitarra','Cavaquinho':'Guitarra','Percussão':'Bateria','Piano':'Teclado','Acordeão':'Teclado'};
const ico=(n,c)=>'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+(ICO_P[n]||ICO_P[ICO_A[n]]||ICO_P.Outro).replace(' class="k"',' fill="'+c+'"')+'</svg>');
const dropOne=(a,v)=>{const i=a.lastIndexOf(v);return i<0?a:a.filter((_,j)=>j!==i);};
// Resumo das vagas: "2× Guitarra, Voz".
const vagaSummary=a=>{if(!a.length)return 'Nenhuma vaga aberta';const c={};a.forEach(v=>c[v]=(c[v]||0)+1);const n=a.length;return n+(n>1?' vagas: ':' vaga: ')+Object.entries(c).map(([v,k])=>(k>1?k+'× ':'')+v).join(', ');};
// Chips de vaga com contador: toque adiciona; − e + ajustam quantas vagas daquele instrumento.
const vagaChipsFor=(list,update)=>INSTR.map(n=>{const k=list.filter(x=>x===n).length;return {label:n,ico:ico(n,k?'#f7f5f0':INK),off:!k,on:!!k,n:k,add:()=>update(a=>[...a,n]),sub:()=>update(a=>dropOne(a,n))};});
// Mensagens não lidas das conversas privadas.
const unreadN=chat=>(chat||[]).filter(m=>m.unread).length;
const markRead=chat=>(chat||[]).map(m=>m.unread?{...m,unread:false}:m);
const REPLIES=['Fechado! 👍','Combinado, até lá!','Show, pode ser sim.','Boa! Levo meu equipamento.','Perfeito, obrigado!'];
const mc=v=>v>=85?OK:v>=65?'#8a6a1f':ACC;
const chip=(label,on,onClick)=>({label,onClick,bg:on?INK:'#fff',fg:on?'#f7f5f0':INK,bd:on?INK:LINE});

class Component extends DCLogic {
  state={screen:'login',emailNotif:true,authMode:'login',lName:'',lEmail:'',lPass:'',showPass:false,authErr:'',userName:'Lucas Martins',userEmail:'lucas.martins@email.com',step:0,tab:'search',searchView:'list',searchSub:'match',bandsView:'band',myBandId:'g22',
    insts:[{id:1,name:'Guitarra',custom:'',level:'Intermediário'}],openInst:null,otherGenre:'',customGenres:[],genreFocus:false,genreIdx:0,city:'Joinville, SC',cityQuery:'Joinville, SC',cityFocus:false,cityIdx:0,
    dismissed:[],genres:['Rock alternativo','Indie','Rock nacional'],goal:SG,avail:{'Ter-Noite':1,'Qui-Noite':1,'Sáb-Manhã':1},fTime:false,fLvl:false,fGoals:[],fGenres:[],filtersOpen:false,bandQuery:'',bandId:'fio',
    sent:[{bandId:'dom',status:'chatting',date:'5 out',chat:[{sys:true,t:'Conversa privada com Domingo Cedo. Só você e o líder veem.'},{t:TEST.dom.m,unread:true}]}],myBands:[G22],
    cName:'',cVagas:['Bateria'],cGoal:null,cGoalText:'',cAvail:{},cRep:[],cInst:'Guitarra',cAdd:null,draft:''};
  scrollRef=React.createRef();
  key(s){ if(s.screen==='login') return 'login'; if(s.screen==='onb') return 'onb'; if(s.tab==='profile') return 'profile'; if(s.tab==='search') return s.searchView==='detail'?'detail':s.searchSub==='sent'?'sent':'search'; return s.bandsView==='create'?'create':'bands'; }
  componentDidUpdate(){ const s=this.state,k=[this.key(s),s.step,s.myBandId,s.bandId].join('|'); if(this.lastKey!==undefined&&this.lastKey!==k&&this.scrollRef.current) this.scrollRef.current.scrollTop=0; this.lastKey=k; }
  go=k=>this.setState({login:{screen:'login',authMode:'login',lPass:'',authErr:''},onb:{screen:'onb',step:0,editing:false},profile:{screen:'app',tab:'profile'},search:{screen:'app',tab:'search',searchView:'list',searchSub:'match',cChatId:null},detail:{screen:'app',tab:'search',searchView:'detail'},sent:{screen:'app',tab:'search',searchView:'list',searchSub:'sent',cChatId:null},bands:{screen:'app',tab:'bands',bandsView:'list',lChatId:null},create:{screen:'app',tab:'bands',bandsView:'create'}}[k]);
  lvlFor(n){const I=this.state.insts,x=I.find(i=>i.name===n&&i.level)||I.find(i=>i.level);return x?x.level:'Básico';}
  submitAuth=()=>{ const s=this.state,up=s.authMode==='signup',email=s.lEmail.trim();
    if(up&&!s.lName.trim()) return this.setState({authErr:'Informe seu nome.'});
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return this.setState({authErr:'Digite um e-mail válido.'});
    if(s.lPass.length<6) return this.setState({authErr:'A senha precisa ter pelo menos 6 caracteres.'});
    const base={authErr:'',lPass:'',showPass:false,userEmail:email};
    // Protótipo: sem servidor, qualquer e-mail e senha válidos entram.
    if(up) this.setState({...base,userName:s.lName.trim(),screen:'onb',step:1,editing:false});
    else this.setState({...base,screen:'app',tab:'search',searchView:'list',searchSub:'match'}); };
  instName(x){return x.name==='Outro'?(x.custom||'Outro'):x.name;}
  bandCalc(b){
    const st=this.state, h=st.avail[b.slot]?100:20, o=b.goal===st.goal?100:40;
    const lv=Math.max(10,100-35*Math.abs(LVI(this.lvlFor(b.vaga))-LVI(b.req)));
    const match=Math.round(h*.4+o*.25+b.rp*.2+lv*.15);
    const breakdown=[['Horário',h],['Objetivo',o],['Repertório',b.rp],['Nível',lv]].map(([label,v])=>({label,v,w:v+'%',color:v>=80?'#7fc493':v>=50?'#e2b65a':'#e8774f'}));
    const sr=st.sent.find(x=>x.bandId===b.id), S=sr&&STATUS[sr.status];
    const myLv=this.lvlFor(b.vaga), dl=LVI(myLv)-LVI(b.req), G=GOALS.find(g=>g.label===b.goal);
    const okF=(t)=>({bg:'#e3efe6',fg:OK,icon:'check_circle',text:t}), warnF=(t)=>({bg:'#f6ecd2',fg:'#7a5a12',icon:'info',text:t});
    const wp=(b.when||'').split(' · ');
    return {...b,h,o,match,matchColor:mc(match),breakdown,
      whenMain:b.when?wp[0]:'A definir',whenSub:b.when?(wp[1]||'')+(b.where?' · '+b.where:''):'A banda ainda vai combinar o horário',
      reqDesc:(LEVELS.find(l=>l.short===b.req)||{}).label||'',goalDesc:G?G.desc:'',
      fitTime:!b.when?warnF('Horário a combinar'):h===100?okF('Bate com sua disponibilidade'):warnF('Fora dos horários que você marcou'),
      fitLevel:dl===0?okF('Igual ao seu nível em '+b.vaga):dl>0?okF('Seu nível em '+b.vaga+' é acima'):warnF('Seu nível em '+b.vaga+': '+myLv),
      fitGoal:o===100?okF('Mesmo objetivo que o seu'):warnF('Seu objetivo: '+st.goal),
      hasRep:!!(b.rep&&b.rep.length),noRep:!(b.rep&&b.rep.length),repCount:(b.rep||[]).length+' músicas',repV:(b.rep||[]).map((r,k)=>({...r,n:String(k+1).padStart(2,'0')})),
      memberCount:b.members.length+' de '+(b.members.length+1),
      cal:PER.flatMap(p=>[{isLabel:true,isCell:false,label:p[0]},...DAYS.map(dd=>{const k=dd+'-'+p,bs=b.slot===k,me=!!st.avail[k];return {isLabel:false,isCell:true,bg:bs?INK:me?'#e3efe6':'#f3efe8',bd:bs?(me?'#7fc493':INK):me?'#9cc8a8':'#efebe4'};})]),icoAcc:ico(b.vaga,ACC),vagaUpper:b.vaga.toUpperCase(),ico:ico(b.vaga,'#8e3b1f'),
      membersV:b.members.map(m=>({...m,ico:ico(m.r,INK),pic:pic(m.i)})),
      hasReq:!!sr,reqLabel:S?S.l:'',reqBg:S?S.bg:'',reqFg:S?S.fg:'',
      timeNote:h===100?'O horário de ensaio bate com a sua disponibilidade.':'O ensaio cai num horário em que você não marcou disponibilidade.',
      open:()=>this.setState({bandId:b.id,searchView:'detail'})};
  }
  // Protótipo: a outra pessoa responde sozinha alguns segundos depois.
  replyLater(kind,id){ setTimeout(()=>{ const st=this.state,t=REPLIES[(this.ri=(this.ri||0)+1)%REPLIES.length];
    if(kind==='lead'){ const open=st.screen==='app'&&st.tab==='bands'&&st.lChatId===id; this.setState(s=>({myBands:s.myBands.map(b=>({...b,reqs:b.reqs.map(r=>r.id===id?{...r,chat:[...r.chat,{t,unread:!open}]}:r)}))})); }
    else { const open=st.screen==='app'&&st.tab==='search'&&st.searchSub==='sent'&&st.cChatId===id; this.setState(s=>({sent:s.sent.map(y=>y.bandId===id?{...y,chat:[...y.chat,{t,unread:!open}]}:y)})); } },2500); }
  acceptSent(id){ this.setState(s=>{const b=BANDS.find(x=>x.id===id),T=TEST[id],lead=b.members.find(m=>m.lead);
    const nb={id,name:b.name,role:'member',slots:[b.slot],genres:b.genres,goal:b.goal,when:b.when,where:b.where,vagas:[],reqs:[],rep:b.rep,
      members:[...b.members.map(m=>({...m,tag:m.lead?'Líder':''})),{i:'LM',n:'Lucas Martins (você)',r:b.vaga,lvl:this.lvlFor(b.vaga),tag:''}],
      reh:{label:'ENSAIO TESTE PROPOSTO',when:T.w,where:b.where,confirmed:false},
      msgs:[{sys:true,t:'Você entrou na banda. Combinem por aqui o primeiro ensaio.'},{a:lead.n.split(' ')[0],i:lead.i,t:T.m}]};
    return {sent:s.sent.map(x=>x.bandId===id?{...x,status:'accepted'}:x),myBands:s.myBands.some(x=>x.id===id)?s.myBands:[...s.myBands,nb]};}); }
  renderVals(){
    const st=this.state, S=st.screen, K=this.key(st);
    const done=st.insts.filter(x=>x.name&&x.level), instruments=done.map(x=>this.instName(x));
    const insts=st.insts, open=st.openInst, openItem=insts.find(x=>x.id===open);
    const upd=(id,p)=>this.setState(s=>({insts:s.insts.map(x=>x.id===id?{...x,...p}:x)}));
    const instCards=insts.map((it,i)=>{const exp=open===it.id,dn=it.name?this.instName(it):'',lv=LEVELS.find(l=>l.short===it.level),ready=!!(it.name&&it.level);
      return {num:i+1,ico:ico(it.name||'Outro',INK),collapsed:!exp,expanded:exp,displayName:dn||'Novo instrumento',levelText:lv?lv.label:'Nível não informado',canRemove:insts.length>1,
        remove:()=>this.setState(s=>({insts:s.insts.filter(x=>x.id!==it.id),openInst:s.openInst===it.id?null:s.openInst})),
        edit:()=>this.setState(s=>({openInst:it.id,insts:s.insts.filter(x=>x.id===it.id||(x.name&&x.level))})),
        groups:INST_GROUPS.map(([label,names])=>({label:label.toUpperCase(),chips:names.map(n=>{const on=it.name===n,dis=!on&&insts.some(x=>x.name===n);return {label:n,ico:ico(n,on?'#f7f5f0':INK),onClick:()=>{if(dis)return;upd(it.id,{name:n,level:it.name===n?it.level:null});this.setState({instPicking:null});},bg:on?INK:'#fff',fg:on?'#f7f5f0':INK,bd:on?INK:LINE,op:dis?.35:1};})})),
        picking:!it.name||st.instPicking===it.id,showLevel:!!it.name&&st.instPicking!==it.id,changeInst:()=>this.setState({instPicking:it.id}),
        isOther:it.name==='Outro',custom:it.custom,onCustom:e=>upd(it.id,{custom:e.target.value}),hasName:!!it.name,
        lvColor:lv?LCOL[LVI(it.level)]:'#8f897f',lvShort:lv?lv.short:'Sem nível',
        slider:(()=>{const k=LVI(it.level),has=k>=0,pct=has?k/3*100:0,color=has?LCOL[k]:'#b9b2a6';return {pct,color,val:has?k:0,
          balloon:has?LEVELS[k].label:'Arraste o pino ou toque no seu nível',name:has?LEVELS[k].short:'Escolha seu nível',
          onRange:e=>upd(it.id,{level:LEVELS[+e.target.value].short}),
          ticks:LEVELS.map((l,j)=>({label:l.short,left:j/3*100+'%',tx:j===0?'0':j===3?'-100%':'-50%',dot:has&&j<=k?color:'#ddd8ce',color:j===k?LCOL[j]:'#8f897f',fw:j===k?700:500,onClick:()=>upd(it.id,{level:l.short})}))};})(),
        done:()=>{if(ready)this.setState({openInst:null});},doneBg:ready?INK:'#d9d3c8'};});
    const gq=norm(st.otherGenre);
    const taken=new Set([...GENRES,...st.customGenres].map(norm));
    const addGenre=v=>{const t=v.trim();if(!t||taken.has(norm(t)))return this.setState({otherGenre:''});this.setState(s=>({customGenres:[...s.customGenres,t],otherGenre:'',genreIdx:0}));};
    let gm=gq?GENRE_EXTRA.filter(g=>!taken.has(norm(g))).map(g=>[g,gScore(g,gq)]).filter(x=>x[1]<99).sort((a,b)=>a[1]-b[1]).map(x=>x[0]).slice(0,5):[];
    const exact=gm.some(g=>norm(g)===gq)||taken.has(gq);
    const raw=st.otherGenre.trim();
    const genreList=[...gm.map(g=>({value:g,label:g,icon:'library_music'})),...(gq&&!exact?[{value:raw.charAt(0).toUpperCase()+raw.slice(1),label:'Adicionar “'+raw+'”',icon:'add'}]:[])];
    const genreSugs=genreList.map((g,i)=>({...g,bg:i===st.genreIdx?'#f3efe8':'transparent',pick:e=>{e.preventDefault();addGenre(g.value);}}));
    const toggleArr=(k,v)=>this.setState(s=>({[k]:s[k].includes(v)?s[k].filter(x=>x!==v):[...s[k],v]}));
    const all=BANDS.map(b=>this.bandCalc(b)).sort((a,b)=>b.match-a.match);
    const bq=norm(st.bandQuery||'');
    const passF=b=>(!st.fTime||b.h===100)&&(!st.fLvl||b.req===this.lvlFor(b.vaga))&&(!st.fGoals.length||st.fGoals.includes(b.goal))&&(!st.fGenres.length||b.genres.split(' · ').some(g=>st.fGenres.includes(g)));
    const shown=all.filter(b=>!st.dismissed.includes(b.id)&&passF(b)&&(!bq||norm(b.name+' '+b.genres).includes(bq)));
    const nFilters=(st.fTime?1:0)+(st.fLvl?1:0)+st.fGoals.length+st.fGenres.length;
    const band=all.find(b=>b.id===st.bandId);
    const slots=Object.keys(st.avail).filter(k=>st.avail[k]);
    const q=norm(st.cityQuery===st.city?'':st.cityQuery);
    const citySugs=CITIES.filter(([n])=>!q||norm(n).includes(q)).sort((a,b)=>(norm(a[0]).startsWith(q)?0:1)-(norm(b[0]).startsWith(q)?0:1)).slice(0,6).map(([name,uf],i)=>({name,uf,bg:i===st.cityIdx?'#f3efe8':'transparent',pick:e=>{e.preventDefault();const v=name+', '+uf;this.setState({city:v,cityQuery:v,cityFocus:false});}}));
    const myReq=st.sent.find(x=>x.bandId===band.id);
    const mbRaw=st.myBands.find(b=>b.id===st.myBandId)||st.myBands[0];
    const patchBand=(id,fn)=>this.setState(s=>({myBands:s.myBands.map(b=>b.id===id?fn(b):b)}));
    const ROLE={owner:['Líder','#e3efe6','#2f6b45'],member:['Membro','#efe9df','#4a463f']};
    const TAG={'Líder':['#efe9df','#4a463f'],'Em teste':['#f6ecd2','#7a5a12']};
    const reqAlerts=b=>b.reqs.filter(r=>r.status==='pending').length+b.reqs.filter(r=>r.status==='chatting').reduce((n,r)=>n+unreadN(r.chat),0);
    const pendOwner=st.myBands.filter(b=>b.role==='owner').reduce((n,b)=>n+reqAlerts(b),0);
    const sentUnread=st.sent.filter(x=>x.status==='chatting').reduce((n,x)=>n+unreadN(x.chat),0);
    let mb={};
    if(mbRaw){ const pr=mbRaw.reqs.filter(r=>r.status==='pending'||r.status==='chatting');
      mb={...mbRaw,roleUpper:(mbRaw.role==='owner'?'VOCÊ CRIOU ESTA BANDA':mbRaw.role==='trial'?'VOCÊ ESTÁ EM ENSAIO TESTE':'VOCÊ É MEMBRO'),
        memberCount:mbRaw.members.length,memberNames:mbRaw.members.map(m=>m.n.replace(' (você)','').split(' ')[0]).join(', '),
        membersV:mbRaw.members.map(m=>{const self=m.n.includes('(você)');return {...m,ico:ico(m.r,INK),pic:pic(m.i),hasTag:!!m.tag,
          remove:()=>patchBand(mbRaw.id,b=>({...b,members:b.members.filter(x=>x.n!==m.n),vagas:[...b.vagas,m.r],msgs:[...b.msgs,{sys:true,t:m.n.split(' ')[0]+' saiu da banda. Vaga de '+m.r+' reaberta.'}]}))};}),
        vagasV:mbRaw.vagas.map(v=>({label:v,ico:ico(v,ACC)})),
        isOwner:mbRaw.role==='owner',canLeave:mbRaw.role!=='owner',noReqs:pr.length===0,
        hasReqs:mbRaw.role==='owner'&&pr.length>0,pendN:pr.length,
        reqsV:pr.map(r=>{const op=st.reqOpen===r.id,bs=mbRaw.slots||[],ov=(r.avail||[]).filter(k=>bs.includes(k)).length,bg=mbRaw.genres.split(' · ');return {...r,ico:ico(r.r,INK),pic:pic(r.i),isOpen:op,rot:op?'180deg':'0deg',toggleLabel:op?'Fechar perfil':'Ver perfil',
          toggle:()=>this.setState(s=>({reqOpen:s.reqOpen===r.id?null:r.id})),
          instsV:(r.insts||[]).map(([n,l])=>({name:n,level:l,ico:ico(n,INK)})),
          genresV:(r.genres||[]).map(g=>{const m=bg.includes(g);return {label:g,bg:m?'#e3efe6':'#efe9df',fg:m?OK:'#4a463f'};}),
          goalFit:r.goal===mbRaw.goal?'Mesmo objetivo da banda':'Banda: '+mbRaw.goal,goalFg:r.goal===mbRaw.goal?OK:'#7a5a12',
          timeFit:!bs.length?'A banda ainda não definiu horário':ov?'Livre no horário de ensaio da banda':'Não está livre no horário da banda',timeFg:!bs.length?'#6b665e':ov?OK:'#7a5a12',
          cal:PER.flatMap(p=>[{isLabel:true,isCell:false,label:p[0]},...DAYS.map(dd=>{const k=dd+'-'+p,b1=bs.includes(k),me=(r.avail||[]).includes(k);return {isLabel:false,isCell:true,bg:b1?INK:me?'#e3efe6':'#f3efe8',bd:b1?(me?'#7fc493':INK):me?'#9cc8a8':'#efebe4'};})]),
          vagaOpen:mbRaw.vagas.includes(r.r),vagaFull:!mbRaw.vagas.includes(r.r),fullText:'A vaga de '+r.r+' já foi preenchida.',
          acceptBg:mbRaw.vagas.includes(r.r)?'#e8774f':'#e6e2da',acceptFg:mbRaw.vagas.includes(r.r)?'#1d1b18':'#8f897f',
          isChatting:r.status==='chatting',talkLabel:r.status==='chatting'?'Conversa':'Conversar',
          unreadN:unreadN(r.chat),hasUnread:unreadN(r.chat)>0,
          talk:()=>{patchBand(mbRaw.id,b=>({...b,reqs:b.reqs.map(x=>x.id!==r.id?x:x.status==='chatting'?{...x,chat:markRead(x.chat)}:{...x,status:'chatting',chat:[{sys:true,t:'Conversa privada com '+r.n.split(' ')[0]+'. Só vocês dois veem.'}]})}));this.setState({lChatId:r.id});},
          decline:()=>patchBand(mbRaw.id,b=>({...b,reqs:b.reqs.map(x=>x.id===r.id?{...x,status:'declined'}:x)})),
          accept:()=>mbRaw.vagas.includes(r.r)&&patchBand(mbRaw.id,b=>({...b,reqs:b.reqs.map(x=>x.id===r.id?{...x,status:'accepted'}:x),vagas:dropOne(b.vagas,r.r),members:[...b.members,{i:r.i,n:r.n,r:r.r,lvl:r.lvl,tag:''}],msgs:[...b.msgs,{sys:true,t:r.n.split(' ')[0]+' entrou na banda.'},{a:r.n.split(' ')[0],i:r.i,t:r.first}]}))};}),
        cal:PER.flatMap(p=>[{isLabel:true,isCell:false,label:p[0]},...DAYS.map(dd=>{const k=dd+'-'+p,on=(mbRaw.slots||[]).includes(k);return {isLabel:false,isCell:true,bg:on?INK:'#f3efe8',bd:on?INK:'#efebe4'};})]),
        hasRep:!!(mbRaw.rep&&mbRaw.rep.length),noRep:!(mbRaw.rep&&mbRaw.rep.length),repCount:(mbRaw.rep||[]).length+' músicas',repV:(mbRaw.rep||[]).map((r,k)=>({...r,n:String(k+1).padStart(2,'0')})),
        rehPending:!mbRaw.reh.confirmed,rehConfirmed:mbRaw.reh.confirmed,rehBd:mbRaw.reh.confirmed?'#e6e2da':ACC}; }
    const isOwner=!!mbRaw&&mbRaw.role==='owner';
    const sub=!mbRaw?'band':st.bandSub==='reqs'&&!isOwner?'band':(st.bandSub||'band');
    // Configurações da banda: cada tópico abre como um dropdown e as mudanças valem na hora.
    const live=fn=>mbRaw&&patchBand(mbRaw.id,fn);
    const openCfg=()=>{if(!mbRaw)return;this.setState({bandSub:'cfg',cfgOpen:null,cfgConfirm:false,memberConfirm:null});};
    const bGenres=mbRaw?mbRaw.genres.split(' · ').filter(g=>g&&g!=='—'):[];
    const bSlots=mbRaw?(mbRaw.slots||[]):[];
    const slotText=k=>{const [d,per]=k.split('-');return d+' '+per.toLowerCase();};
    const setSlots=a=>{const ck=DAYS.flatMap(d=>PER.map(p=>d+'-'+p)).filter(k=>a.includes(k));live(b=>({...b,slots:ck,when:ck.length?ck.map(slotText).join(', '):'A definir'}));};
    const cfgRow=(k,icon,label,value,danger)=>{const on=st.cfgOpen===k;return {icon,label,value,isOpen:on,rot:on?'180deg':'0deg',ic:danger?ACC:'#6b665e',lc:danger?ACC:'#6b665e',
      toggle:()=>this.setState(s=>({cfgOpen:s.cfgOpen===k?null:k,cfgConfirm:false,memberConfirm:null,nameDraft:k==='name'&&mbRaw?mbRaw.name:s.nameDraft}))};};
    const removeBand=()=>{if(!mbRaw)return;this.setState(s=>{const rest=s.myBands.filter(b=>b.id!==mbRaw.id);return {myBands:rest,myBandId:rest[0]?rest[0].id:null,bandsView:'list',bandSub:'band',cfgConfirm:false,sent:s.sent.filter(x=>x.bandId!==mbRaw.id)};});};
    // Busca de músicas para o repertório: sugere do catálogo enquanto digita; um toque adiciona.
    const songBox=(k,rep,add)=>{const q=st[k+'Q']||'',idx=st[k+'Idx']||0,nq=norm(q),have=new Set(rep.map(r=>norm(r.t)));
      const list=nq?SONGS.filter(([t])=>!have.has(norm(t))).map(([t,a])=>{const nt=norm(t),na=norm(a);return [t,a,nt.startsWith(nq)?0:na.startsWith(nq)?1:nt.split(' ').some(w=>w.startsWith(nq))?2:nt.includes(nq)||na.includes(nq)?3:9];})
        .filter(x=>x[2]<9).sort((x,y)=>x[2]-y[2]).slice(0,5).map(([t,a])=>({t,a,isCustom:false})):[];
      if(nq&&!have.has(nq)&&!list.some(x=>norm(x.t)===nq)) list.push({t:q.trim(),a:'',isCustom:true});
      const pickItem=x=>{add({t:x.t,a:x.a});this.setState({[k+'Q']:'',[k+'Idx']:0});};
      const sugs=list.map((x,i)=>({...x,hasArtist:!!x.a,label:x.isCustom?'Adicionar “'+x.t+'”':x.t,icon:x.isCustom?'add':'music_note',bg:i===idx?'#f3efe8':'transparent',pick:e=>{e.preventDefault();pickItem(x);}}));
      return {q,sugs,open:!!st[k+'F']&&sugs.length>0,
        onInput:e=>this.setState({[k+'Q']:e.target.value,[k+'F']:true,[k+'Idx']:0}),onFocus:()=>this.setState({[k+'F']:true}),onBlur:()=>this.setState({[k+'F']:false}),
        onKey:e=>{const n=list.length;if(e.key==='ArrowDown'){e.preventDefault();this.setState({[k+'Idx']:Math.min(n-1,idx+1)});}else if(e.key==='ArrowUp'){e.preventDefault();this.setState({[k+'Idx']:Math.max(0,idx-1)});}else if(e.key==='Enter'&&list[idx]){e.preventDefault();pickItem(list[idx]);}}};};
    // Conversas privadas (líder <-> candidato) antes de aceitar alguém na banda.
    const msgsV=(chat,other)=>chat.map(m=>({t:m.t,isSys:!!m.sys,isMine:!!m.mine,isOther:!m.sys&&!m.mine,a:other.first,pic:other.pic}));
    const lastMsg=chat=>{const m=[...chat].reverse().find(x=>!x.sys);return m?(m.mine?'Você: ':'')+m.t:'Comece a conversa';};
    const chatting=isOwner?mbRaw.reqs.filter(r=>r.status==='chatting'):[];
    const lSel=chatting.find(r=>r.id===st.lChatId);
    const patchReq=(id,fn)=>patchBand(mbRaw.id,b=>({...b,reqs:b.reqs.map(x=>x.id===id?fn(x):x)}));
    const lSend=()=>{const t=(st.lDraft||'').trim();if(!t||!lSel)return;patchReq(lSel.id,x=>({...x,chat:[...x.chat,{mine:true,t}]}));this.setState({lDraft:''});this.replyLater('lead',lSel.id);};
    const lVagaOpen=!!lSel&&mbRaw.vagas.includes(lSel.r);
    const lChat=!lSel?{}:{title:lSel.n,sub:lSel.r+' · '+lSel.lvl+' · '+lSel.city,pic:pic(lSel.i),
      msgs:msgsV(lSel.chat,{first:lSel.n.split(' ')[0],pic:pic(lSel.i)}),
      draft:st.lDraft||'',onDraft:e=>this.setState({lDraft:e.target.value}),onKey:e=>{if(e.key==='Enter')lSend();},send:lSend,
      vagaFull:!lVagaOpen,fullText:'A vaga de '+lSel.r+' já foi preenchida.',acceptBg:lVagaOpen?'#e8774f':'#e6e2da',acceptFg:lVagaOpen?'#1d1b18':'#8f897f',
      decline:()=>{patchReq(lSel.id,x=>({...x,status:'declined'}));this.setState({lChatId:null});},
      accept:()=>{if(!lVagaOpen)return;const r=lSel,first=r.n.split(' ')[0];patchBand(mbRaw.id,b=>({...b,reqs:b.reqs.map(x=>x.id===r.id?{...x,status:'accepted'}:x),vagas:dropOne(b.vagas,r.r),members:[...b.members,{i:r.i,n:r.n,r:r.r,lvl:r.lvl,tag:''}],msgs:[...b.msgs,{sys:true,t:first+' entrou na banda.'}]}));this.setState({lChatId:null});}};
    const sentChats=st.sent.filter(x=>x.status==='chatting');
    const cSelX=sentChats.find(x=>x.bandId===st.cChatId);
    const cBand=cSelX&&BANDS.find(b=>b.id===cSelX.bandId),cLead=cBand&&cBand.members.find(m=>m.lead);
    const cSend=()=>{const t=(st.cDraft||'').trim();if(!t||!cSelX)return;this.setState(s=>({cDraft:'',sent:s.sent.map(y=>y.bandId===cSelX.bandId?{...y,chat:[...y.chat,{mine:true,t}]}:y)}));this.replyLater('cand',cSelX.bandId);};
    const cChat=!cSelX?{}:{title:cBand.name,sub:'Conversa com '+cLead.n+' (líder) · vaga de '+cBand.vaga,pic:pic(cLead.i),
      msgs:msgsV(cSelX.chat,{first:cLead.n.split(' ')[0],pic:pic(cLead.i)}),
      draft:st.cDraft||'',onDraft:e=>this.setState({cDraft:e.target.value}),onKey:e=>{if(e.key==='Enter')cSend();},send:cSend,
      viewBand:()=>this.setState({bandId:cBand.id,searchView:'detail'})};
    const send=()=>{const t=st.draft.trim();if(!t||!mbRaw)return;this.setState({draft:''});patchBand(mbRaw.id,b=>({...b,msgs:[...b.msgs,{mine:true,t}]}));};
    const seg=(on)=>({bg:on?'#fff':'transparent',fg:on?INK:'#6b665e',sh:on?'0 1px 3px rgba(29,27,24,.14)':'none'});
    return {
      scrollRef:this.scrollRef,myPic:PHOTO.LM,
      navItems:NAV.map(([k,l])=>({label:l,onClick:()=>this.go(k),devBg:K===k?'#f7f5f0':'transparent',devFg:K===k?INK:'#c9c2b5'})),
      isLogin:S==='login',isOnb:S==='onb',isApp:S==='app',
      isSignup:st.authMode==='signup',authTitle:st.authMode==='signup'?'Criar conta':'Entrar',
      authSub:st.authMode==='signup'?'Leva cerca de 2 minutos para montar seu perfil.':'Bom te ver de novo. Entre para ver suas bandas.',
      authCta:st.authMode==='signup'?'Criar conta':'Entrar',
      authSwitchText:st.authMode==='signup'?'Já tem conta?':'Ainda não tem conta?',authSwitchCta:st.authMode==='signup'?'Entrar':'Criar conta',
      switchAuth:()=>this.setState(s=>({authMode:s.authMode==='signup'?'login':'signup',authErr:''})),
      lName:st.lName,lEmail:st.lEmail,lPass:st.lPass,
      onLName:e=>this.setState({lName:e.target.value,authErr:''}),onLEmail:e=>this.setState({lEmail:e.target.value,authErr:''}),onLPass:e=>this.setState({lPass:e.target.value,authErr:''}),
      onAuthKey:e=>{if(e.key==='Enter')this.submitAuth();},submitAuth:this.submitAuth,
      passType:st.showPass?'text':'password',passIcon:st.showPass?'visibility_off':'visibility',togglePass:()=>this.setState(s=>({showPass:!s.showPass})),
      passHint:st.authMode==='signup'?'Mínimo de 6 caracteres':'Sua senha',passAuto:st.authMode==='signup'?'new-password':'current-password',
      hasAuthErr:!!st.authErr,authErr:st.authErr,userName:st.userName,userEmail:st.userEmail,
      logout:()=>this.go('login'),
      notifBg:st.emailNotif?OK:'#d9d3c8',notifJc:st.emailNotif?'flex-end':'flex-start',toggleEmailNotif:()=>this.setState(s=>({emailNotif:!s.emailNotif})),
      onbSteps:['Boas-vindas','Instrumento e nível','Estilos','Horários, objetivo e local'].map((label,i)=>({n:i+1,label,bg:i<st.step?OK:i===st.step?INK:'transparent',fg:i<=st.step?'#fff':'#6b665e',bd:i<st.step?OK:i===st.step?INK:'#c9c2b5',fw:i===st.step?700:500,tc:i<=st.step?INK:'#6b665e'})),
      isStep0:st.step===0,isStep1:st.step===1,isStep2:st.step===2,isStep3:st.step===3,
      showBack:st.step>0||st.editing,nextLabel:st.editing?'Salvar':st.step===0?'Criar meu perfil':st.step===3?'Ver bandas compatíveis':'Continuar',
      prevStep:()=>st.editing?this.setState({screen:'app',tab:'profile',editing:false}):this.setState(s=>({step:Math.max(0,s.step-1)})),
      nextStep:()=>st.editing?this.setState({screen:'app',tab:'profile',editing:false}):st.step<3?this.setState({step:st.step+1}):this.go('search'),
      instCards,canAddInst:!openItem||!!(openItem.name&&openItem.level),
      addInst:()=>{const id=Date.now();this.setState(s=>({insts:[...s.insts.filter(x=>x.name&&x.level),{id,name:null,custom:'',level:null}],openInst:id}));},
      genreChips:GENRES.map(g=>{const on=st.genres.includes(g),c=GCOL[g];return {label:g,onClick:()=>toggleArr('genres',g),bg:on?c:'#fff',fg:on?'#fff':INK,bd:on?c:c+'55',dot:on?'#fff':c};}),
      showOtherGenre:st.genres.includes('Outro'),otherGenre:st.otherGenre,
      onOtherGenre:e=>this.setState({otherGenre:e.target.value,genreFocus:true,genreIdx:0}),
      onGenreFocus:()=>this.setState({genreFocus:true}),onGenreBlur:()=>this.setState({genreFocus:false}),
      onGenreKey:e=>{const n=genreSugs.length;if(e.key==='ArrowDown'){e.preventDefault();this.setState(s=>({genreIdx:Math.min(n-1,s.genreIdx+1)}));}else if(e.key==='ArrowUp'){e.preventDefault();this.setState(s=>({genreIdx:Math.max(0,s.genreIdx-1)}));}else if(e.key==='Enter'){e.preventDefault();if(genreSugs[st.genreIdx])addGenre(genreSugs[st.genreIdx].value);}else if(e.key==='Backspace'&&!st.otherGenre&&st.customGenres.length){this.setState(s=>({customGenres:s.customGenres.slice(0,-1)}));}},
      genreOpen:st.genreFocus&&!!gq&&genreSugs.length>0,genreSugs,
      hasCustomGenres:st.customGenres.length>0,
      customGenreTags:st.customGenres.map(g=>({label:g,remove:()=>this.setState(s=>({customGenres:s.customGenres.filter(x=>x!==g)}))})),
      goalOpts:GOALS.map(l=>({...l,bd:st.goal===l.label?INK:'#e6e2da',onClick:()=>this.setState({goal:l.label})})),
      availHead:['',...DAYS],
      availCellsWeb:PER.flatMap(p=>[{isLabel:true,isCell:false,label:p},...DAYS.map(d=>{const k=d+'-'+p,on=!!st.avail[k];return {isLabel:false,isCell:true,bg:on?INK:'#fff',bd:on?INK:LINE,onClick:()=>this.setState(s=>({avail:{...s.avail,[k]:!s.avail[k]}}))};})]),
      availSummary:slots.length?slots.map(k=>k.replace('-',' ').toLowerCase()).join(' · '):'Nenhum horário marcado',
      city:st.city,cityQuery:st.cityQuery,cityBd:st.cityFocus?INK:LINE,
      onCityInput:e=>this.setState({cityQuery:e.target.value,cityFocus:true,cityIdx:0}),
      onCityFocus:e=>{e.target.select();this.setState({cityFocus:true,cityIdx:0});},
      onCityBlur:()=>this.setState(s=>({cityFocus:false,cityQuery:s.city})),
      onCityKey:e=>{const n=citySugs.length;if(e.key==='ArrowDown'){e.preventDefault();this.setState(s=>({cityIdx:Math.min(n-1,s.cityIdx+1)}));}else if(e.key==='ArrowUp'){e.preventDefault();this.setState(s=>({cityIdx:Math.max(0,s.cityIdx-1)}));}else if(e.key==='Enter'&&n){citySugs[st.cityIdx]&&citySugs[st.cityIdx].pick(e);e.target.blur();}},
      cityOpen:st.cityFocus,citySugs,cityNone:st.cityFocus&&!citySugs.length,

      tabs:[['profile','Meu perfil','person'],['search','Procurar bandas','search'],['bands','Minhas bandas','groups']].map(([k,label,icon])=>{const on=st.tab===k;return {label,icon,...seg(on),fill:on?1:0,onClick:()=>this.go(k),badge:(k==='bands'&&pendOwner>0)||(k==='search'&&sentUnread>0),badgeN:k==='bands'?pendOwner:sentUnread};}),
      isProfile:st.tab==='profile',isSearch:st.tab==='search',isBands:st.tab==='bands',
      instrumentsText:instruments.join(' + ')||'Sem instrumento',
      profInsts:done.map(x=>{const n=this.instName(x);return {name:n,level:x.level,ico:ico(n,INK)};}),instEdit:()=>this.setState({screen:'onb',step:1,editing:true}),
      availOpen:!!st.availOpen,availRot:st.availOpen?'180deg':'0deg',toggleAvail:()=>this.setState(s=>({availOpen:!s.availOpen})),availCount:slots.length?slots.length+' horários por semana':'Nenhum horário marcado',
      profileRows:[['flag','Objetivo',st.goal,3],['library_music','Gêneros',[...st.genres.filter(x=>x!=='Outro'),...st.customGenres].join(', ')||'—',2],['location_on','Cidade',st.city||'—',3]].map(([icon,label,value,step])=>({icon,label,value,edit:()=>this.setState({screen:'onb',step,editing:true})})),

      calHead:['',...DAYS],isSearchList:st.searchView==='list',isDetail:st.searchView==='detail',isMatchSub:st.searchSub==='match',isSentSub:st.searchSub==='sent',
      searchSubs:[['match','Compatíveis',shown.length],['sent','Solicitações enviadas',st.sent.length]].map(([k,label,n])=>({badge:k==='sent'&&sentUnread>0,badgeN:sentUnread,...({label,n,...seg(st.searchSub===k),onClick:()=>this.setState({searchSub:k,cChatId:null})})})),
      bandQuery:st.bandQuery||'',onBandQuery:e=>this.setState({bandQuery:e.target.value}),clearBandQuery:()=>this.setState({bandQuery:''}),hasBandQuery:!!st.bandQuery,
      filtersOpen:!!st.filtersOpen,toggleFilters:()=>this.setState(s=>({filtersOpen:!s.filtersOpen})),
      filterLabel:nFilters?'Filtros · '+nFilters:'Filtros',filterBtnBg:nFilters||st.filtersOpen?INK:'#fff',filterBtnFg:nFilters||st.filtersOpen?'#f7f5f0':INK,
      fGoalChips:GOALS.map(g=>chip(g.label,st.fGoals.includes(g.label),()=>toggleArr('fGoals',g.label))),
      fGenreChips:[...new Set(BANDS.flatMap(b=>b.genres.split(' · ')))].map(g=>chip(g,st.fGenres.includes(g),()=>toggleArr('fGenres',g))),
      fToggleChips:[chip('Bate com meu horário',st.fTime,()=>this.setState({fTime:!st.fTime})),chip('No meu nível',st.fLvl,()=>this.setState({fLvl:!st.fLvl}))],
      hasFilters:nFilters>0,clearFilters:()=>this.setState({fTime:false,fLvl:false,fGoals:[],fGenres:[]}),
      noBands:shown.length===0,
      bandsShown:shown,hiddenCountShow:all.length>shown.length,hiddenText:(all.length-shown.length)+(all.length-shown.length>1?' bandas ocultas pela busca ou filtros':' banda oculta pela busca ou filtros'),
      sentList:st.sent.map(x=>{const b=BANDS.find(y=>y.id===x.bandId),T=STATUS[x.status],ld=b.members.find(m=>m.lead);return {name:b.name,ico:ico(b.vaga,INK),
        meta:x.status==='chatting'?'Vaga: '+b.vaga+' · '+ld.n.split(' ')[0]+' chamou você pra conversar':'Vaga: '+b.vaga+' · '+b.genres+' · enviada em '+x.date,
        statusLabel:T.l,sBg:T.bg,sFg:T.fg,isPending:x.status==='pending',isChatting:x.status==='chatting',isAccepted:x.status==='accepted',
        simLabel:x.status==='pending'?'Simular: banda chamou pra conversar':'Simular aceite',
        openChat:()=>this.setState(s=>({searchSub:'sent',cChatId:b.id,sent:s.sent.map(y=>y.bandId===b.id?{...y,chat:markRead(y.chat)}:y)})),unreadN:unreadN(x.chat),hasUnread:unreadN(x.chat)>0,
        view:()=>this.setState({bandId:b.id,searchView:'detail'}),cancel:()=>this.setState(s=>({sent:s.sent.filter(y=>y.bandId!==b.id)})),
        simulate:()=>x.status==='pending'?this.setState(s=>({sent:s.sent.map(y=>y.bandId===b.id?{...y,status:'chatting',chat:[{sys:true,t:'Conversa privada com '+b.name+'. Só você e o líder veem.'},{t:TEST[b.id].m,unread:true}]}:y)})):this.acceptSent(b.id),
        goBand:()=>this.setState({tab:'bands',bandsView:'band',myBandId:b.id})};}),
      noSent:!st.sent.length,
      band,backToSearch:()=>this.setState({searchView:'list'}),
      showDismiss:!myReq,
      dismiss:()=>this.setState(s=>({dismissed:[...s.dismissed,s.bandId],searchView:'list'})),
      ctaLabel:!myReq?'Quero entrar':myReq.status==='accepted'?'Abrir em Minhas bandas':myReq.status==='chatting'?'Abrir conversa':'Solicitação enviada',
      ctaBg:!myReq?'#e8774f':myReq.status==='pending'?'#efe9df':INK,ctaFg:!myReq?'#1d1b18':myReq.status==='pending'?INK:'#f7f5f0',
      ctaNote:!myReq?'O líder pode aceitar direto ou chamar você pra conversar antes.':myReq.status==='accepted'?'Você entrou nesta banda.':myReq.status==='chatting'?'O líder chamou você pra conversar.':'Acompanhe em Procurar bandas › Solicitações enviadas.',
      requestJoin:()=>{ if(!myReq) return this.setState(s=>({sent:[{bandId:band.id,status:'pending',date:'8 out',chat:[]},...s.sent]})); if(myReq.status==='accepted') return this.setState({tab:'bands',bandsView:'band',myBandId:band.id}); if(myReq.status==='chatting') return this.setState(s=>({searchView:'list',searchSub:'sent',cChatId:band.id,sent:s.sent.map(y=>y.bandId===band.id?{...y,chat:markRead(y.chat)}:y)})); this.setState({searchView:'list',searchSub:'sent'}); },

      isBandView:st.bandsView==='band'&&!!mbRaw,
      isReqList:!lSel,isReqChat:!!lSel,closeChat:()=>this.setState({lChatId:null}),lChat,
      cHasChat:!!cSelX,cListOpen:!cSelX,cChat,closeCChat:()=>this.setState({cChatId:null}),
      isBandMain:sub==='band',isBandReqs:sub==='reqs',isBandCfg:sub==='cfg',isBandEmpty:st.bandsView==='list'&&!st.myBands.length,isBandList:st.bandsView==='list',hasBands:st.myBands.length>0,notBandList:st.bandsView!=='list',backToBands:()=>this.go('bands'),goSearch:()=>this.go('search'),
      bandSubs:[['band','Banda'],...(isOwner?[['reqs','Solicitações']]:[]),['cfg','Configurações']].map(([k,label])=>{const on=sub===k,n=mbRaw?reqAlerts(mbRaw):0;return {label,isText:k!=='cfg',isIcon:k==='cfg',px:k==='cfg'?'9px':'16px',bg:on?'#f7f5f0':'transparent',fg:on?INK:'#c9c2b5',badge:k==='reqs'&&n>0,n,onClick:()=>k==='cfg'?openCfg():this.setState({bandSub:k,lChatId:null})};}),
      cName2:st.nameDraft||'',onNameDraft:e=>{const v=e.target.value;this.setState({nameDraft:v});if(v.trim())live(b=>({...b,name:v.trim()}));},
      cfgName:cfgRow('name','badge','Nome',mbRaw?mbRaw.name:''),
      cfgGenres:cfgRow('genres','library_music','Gêneros',bGenres.join(', ')||'Nenhum gênero'),
      cfgGoal:cfgRow('goal','flag','Objetivo',mbRaw?mbRaw.goal:''),
      cfgVagas:cfgRow('vagas','person_add','Vagas abertas',vagaSummary(mbRaw?mbRaw.vagas:[])),
      cfgSlots:cfgRow('slots','calendar_month','Horários de ensaio',bSlots.length?bSlots.map(slotText).join(' · '):'A definir'),
      cfgRep:cfgRow('rep','queue_music','Repertório',mbRaw&&mbRaw.rep&&mbRaw.rep.length?mbRaw.rep.length+(mbRaw.rep.length>1?' músicas':' música'):'Nenhuma música'),
      cfgMembers:cfgRow('members','group','Integrantes',mbRaw?mbRaw.members.length+(mbRaw.members.length>1?' integrantes':' integrante'):''),
      cfgDanger:cfgRow('danger',isOwner?'delete':'logout',isOwner?'Excluir banda':'Sair da banda',isOwner?'Remove a banda para todos':'Sua vaga volta a ficar aberta',true),
      eGenreChips:[...new Set([...GENRES,...bGenres])].map(g=>chip(g,bGenres.includes(g),()=>live(b=>{const a=b.genres.split(' · ').filter(x=>x&&x!=='—'),n=a.includes(g)?a.filter(x=>x!==g):[...a,g];return {...b,genres:n.join(' · ')||'—'};}))),
      eGoalOpts:GOALS.map(l=>({...l,bd:mbRaw&&mbRaw.goal===l.label?INK:'#e6e2da',onClick:()=>live(b=>({...b,goal:l.label}))})),
      eVagaChips:vagaChipsFor(mbRaw?mbRaw.vagas:[],f=>live(b=>({...b,vagas:f(b.vagas)}))),
      eAvailCells:PER.flatMap(p=>[{isLabel:true,isCell:false,label:p},...DAYS.map(d=>{const k=d+'-'+p,on=bSlots.includes(k);return {isLabel:false,isCell:true,bg:on?INK:'#fff',bd:on?INK:LINE,onClick:()=>setSlots(on?bSlots.filter(x=>x!==k):[...bSlots,k])};})]),
      eHasRep:!!(mbRaw&&mbRaw.rep&&mbRaw.rep.length),eRepV:(mbRaw&&mbRaw.rep||[]).map((r,k)=>({...r,n:String(k+1).padStart(2,'0'),remove:()=>live(b=>({...b,rep:b.rep.filter((_,j)=>j!==k)}))})),
      eSongBox:songBox('es',mbRaw&&mbRaw.rep||[],r=>live(b=>({...b,rep:[...(b.rep||[]),r]}))),
      cfgMembersV:mbRaw?mbRaw.members.map(m=>{const self=m.n.includes('(você)'),first=m.n.split(' ')[0],ask=st.memberConfirm===m.n;return {...m,pic:pic(m.i),hasTag:!!m.tag,
        canRemove:isOwner&&!self&&!ask,asking:ask,confirmText:'Remover '+first+' da banda? A vaga de '+m.r+' volta a ficar aberta.',
        ask:()=>this.setState({memberConfirm:m.n}),cancel:()=>this.setState({memberConfirm:null}),
        remove:()=>{live(b=>({...b,members:b.members.filter(x=>x.n!==m.n),vagas:[...b.vagas,m.r],msgs:[...b.msgs,{sys:true,t:first+' saiu da banda. Vaga de '+m.r+' reaberta.'}]}));this.setState({memberConfirm:null});}};}):[],
      isOwnerCfg:isOwner,
      confirmText:isOwner?'Tem certeza? A banda some para todos os integrantes e não dá para desfazer.':'Tem certeza que quer sair de '+(mbRaw?mbRaw.name:'')+'?',
      confirmCta:isOwner?'Sim, excluir banda':'Sim, sair da banda',doDanger:removeBand,
isCreate:st.bandsView==='create',createBg:st.bandsView==='create'?'#fff':'transparent',
      myBandCards:st.myBands.map(b=>{const R=ROLE[b.role],pend=b.role==='owner'?reqAlerts(b):0;return {name:b.name,genres:b.genres,role:R[0],tagBg:R[1],tagFg:R[2],
        membersV:b.members.map(m=>({pic:pic(m.i)})),memberText:b.members.length+(b.members.length>1?' integrantes':' integrante'),
        vagaText:b.vagas.length?vagaSummary(b.vagas).replace(/^\d+ vagas?: /,'Vagas: '):'Banda completa',hasVaga:b.vagas.length>0,
        hasPend:pend>0,pendText:pend+(pend>1?' novidades nas solicitações':' novidade nas solicitações'),
        open:()=>this.setState({myBandId:b.id,bandsView:'band',bandSub:'band',lChatId:null})};}),
      goCreate:()=>this.go('create'),mb,
      bandMsgs:mbRaw?mbRaw.msgs.map(m=>({t:m.t,a:m.a,i:m.i,pic:pic(m.i),isSys:!!m.sys,isMine:!!m.mine,isOther:!m.sys&&!m.mine})):[],
      confirmReh:()=>patchBand(mbRaw.id,b=>({...b,reh:{...b.reh,label:'PRÓXIMO ENSAIO · TESTE',confirmed:true},msgs:[...b.msgs,{mine:true,t:'Confirmado! Nos vemos no ensaio.'}]})),
      suggestOther:()=>this.setState({draft:'Pode ser em outro horário? Tenho '+(slots[0]||'').replace('-',' ').toLowerCase()+' livre.'}),
      draft:st.draft,onDraft:e=>this.setState({draft:e.target.value}),onKey:e=>{if(e.key==='Enter')send();},send,

      cName:st.cName,onCName:e=>this.setState({cName:e.target.value}),
      cMyInsts:done.map(x=>{const n=this.instName(x),on=st.cInst===n;return {name:n,level:(LEVELS.find(l=>l.short===x.level)||{}).label||x.level,ico:ico(n,INK),bd:on?INK:'#e6e2da',bg:on?'#f3efe8':'#fff',checkC:on?INK:'transparent',onClick:()=>this.setState(s=>({cInst:n}))};}),
      cAddOpen:!!st.cAdd,cAddClosed:!st.cAdd,cOpenAdd:()=>this.setState({cAdd:{name:null,level:null}}),cCancelAdd:()=>this.setState({cAdd:null}),
      cNewChips:INSTR.filter(n=>!done.some(x=>x.name===n)).map(n=>{const on=st.cAdd&&st.cAdd.name===n;return {label:n,ico:ico(n,on?'#f7f5f0':INK),bg:on?INK:'#fff',fg:on?'#f7f5f0':INK,bd:on?INK:LINE,onClick:()=>this.setState(s=>({cAdd:{...s.cAdd,name:n}}))};}),
      cNewHasName:!!(st.cAdd&&st.cAdd.name),cNewName:st.cAdd&&st.cAdd.name||'',
      cNewLevels:LEVELS.map(l=>({label:l.label,shortUpper:l.short.toUpperCase(),bd:st.cAdd&&st.cAdd.level===l.short?INK:'#e6e2da',onClick:()=>this.setState(s=>({cAdd:{...s.cAdd,level:l.short}}))})),
      cAddBg:st.cAdd&&st.cAdd.name&&st.cAdd.level?INK:'#d9d3c8',
      cConfirmAdd:()=>{const a=st.cAdd;if(!a||!a.name||!a.level)return;this.setState(s=>({insts:[...s.insts.filter(x=>x.name&&x.level),{id:Date.now(),name:a.name,custom:'',level:a.level}],cInst:a.name,cAdd:null}));},
      vagaChips:vagaChipsFor(st.cVagas,f=>this.setState(s=>({cVagas:f(s.cVagas)}))),cVagaSummary:vagaSummary(st.cVagas),
      cGoalOpts:GOALS.map(l=>({...l,bd:st.cGoal===l.label?INK:'#e6e2da',onClick:()=>this.setState({cGoal:l.label})})),
      cHasGoal:!!st.cGoal,cGoalText:st.cGoalText,onCGoalText:e=>this.setState({cGoalText:e.target.value}),
      cAvailCells:PER.flatMap(p=>[{isLabel:true,isCell:false,label:p},...DAYS.map(d=>{const k=d+'-'+p,on=!!st.cAvail[k];return {isLabel:false,isCell:true,bg:on?INK:'#fff',bd:on?INK:LINE,onClick:()=>this.setState(s=>({cAvail:{...s.cAvail,[k]:!s.cAvail[k]}}))};})]),
      cAvailSummary:(()=>{const k=Object.keys(st.cAvail).filter(x=>st.cAvail[x]);return k.length?k.map(x=>x.replace('-',' ').toLowerCase()).join(' · '):'Nenhum horário marcado. Pode definir depois.';})(),
      cHasRep:st.cRep.length>0,cRepV:st.cRep.map((r,k)=>({...r,n:String(k+1).padStart(2,'0'),remove:()=>this.setState(s=>({cRep:s.cRep.filter((_,j)=>j!==k)}))})),
      cSongBox:songBox('cs',st.cRep,r=>this.setState(s=>({cRep:[...s.cRep,r]}))),
      publishBg:st.cName.trim()&&st.cInst&&st.cGoal?'#e8774f':'#d9d3c8',publishFg:st.cName.trim()&&st.cInst&&st.cGoal?INK:'#f7f5f0',
      cancelCreate:()=>this.go('bands'),
      publishBand:()=>{ const name=st.cName.trim(); if(!name||!st.cInst||!st.cGoal) return; const id='b'+Date.now(); const ck=Object.keys(st.cAvail).filter(x=>st.cAvail[x]); const when=ck.length?ck.map(x=>x.replace('-',' ').toLowerCase()).join(', '):'A definir';
        const nb={id,name,role:'owner',slots:ck,genres:st.genres.filter(g=>g!=='Outro').slice(0,2).join(' · ')||'—',goal:st.cGoal,when,where:'A definir',vagas:st.cVagas,reqs:[],
          rep:st.cRep,goalText:st.cGoalText,
          members:[{i:'LM',n:'Lucas Martins (você)',r:st.cInst,lvl:this.lvlFor(st.cInst),tag:'Líder'}],
          reh:{label:'PRÓXIMO ENSAIO',when,where:'A definir',confirmed:true},
          msgs:[{sys:true,t:'Banda criada. '+vagaSummary(st.cVagas)+'.'}]};
        this.setState(s=>({myBands:[...s.myBands,nb],myBandId:id,bandsView:'band',cName:'',cRep:[],cGoal:null,cGoalText:'',cAvail:{}})); }
    };
  }
}
