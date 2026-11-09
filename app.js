const EDS={
 redacao:{n:'Redação',d:'Estrutura, competências e repertório para escrever melhor a cada semana.',m:'a parte que mais sobe a nota'},
 materias:{n:'Matérias',d:'O que mais cai em cada área e o jeito mais curto de estudar cada uma.',m:'sem decoreba'},
 estudo:{n:'Estudo',d:'Rotina, método e revisão para quem estuda sozinho e com pouco tempo.',m:'plano > força de vontade'},
 carreiras:{n:'Carreiras',d:'Cursos, notas de corte, Sisu e profissões para escolher com segurança.',m:'escolha com dados'},
 noticias:{n:'Notícias',d:'Prazos, regras e novidades do Enem, resumidos e sempre com a fonte.',m:'só o que muda a sua vida'},
 repertorio:{n:'Repertório',d:'Filmes, livros, leis e dados prontos para usar na redação, com exemplo de parágrafo.',m:'o que faz o corretor parar e ler'}
};
const byId=id=>A.find(a=>a.id===id);
const MES={jan:1,fev:2,mar:3,abr:4,mai:5,jun:6,jul:7,ago:8,set:9,out:10,nov:11,dez:12};
const ord=a=>{const [d,m]=a.dt.split(' ');return MES[m]*100+ +d};
A.sort((x,y)=>ord(y)-ord(x));
const SITE='https://enemtododia.com.br';
const sv=d=>`<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">${d}</svg>`;
const IC={
 wa:sv('<path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3z"/>'),
 tg:sv('<path fill="currentColor" d="M21.5 3.5 2.8 10.7c-1 .4-1 1.1-.2 1.4l4.8 1.5 1.8 5.7c.2.6.4.8.9.8.4 0 .6-.2.9-.4l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.3-1.6zM9 14.2l9.4-5.9c.4-.3.8-.1.5.2l-7.8 7-.3 3.3z"/>'),
 x:sv('<path fill="currentColor" d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.9 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/>'),
 fb:sv('<path fill="currentColor" d="M14 8.5V6.6c0-.8.2-1.3 1.4-1.3H17V2.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.2H7.7v3.4h2.7V22H14V11.9h2.7l.4-3.4z"/>'),
 ln:sv('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
 sh:sv('<path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>')
};
async function copiar(txt){
 try{await navigator.clipboard.writeText(txt);return true}catch(e){
  const t=document.createElement('textarea');t.value=txt;document.body.appendChild(t);t.select();let ok=false;try{ok=document.execCommand('copy')}catch(_){}t.remove();return ok}
}
document.addEventListener('click',async e=>{
 const c=e.target.closest('[data-copiar]');
 if(c){if(await copiar(c.dataset.copiar)){c.classList.add('ok');c.querySelector('span').textContent='Link copiado!';const r=c.getBoundingClientRect();confete(r.left+r.width/2,r.top,28);setTimeout(()=>{c.classList.remove('ok');c.querySelector('span').textContent='Copiar link'},2200)}return}
 const s=e.target.closest('[data-share]');
 if(s){if(navigator.share){try{await navigator.share({title:s.dataset.share,url:s.dataset.url})}catch(_){}}else{await copiar(s.dataset.url)}}
});
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const md=s=>esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
const ex=a=>a.ex?'<span class="exemplo">exemplo</span>':'';

function capa(a){
 const rotulo=esc(EDS[a.ed]?EDS[a.ed].n.toLowerCase():'quem passou');
 if(typeof FOTO[a.id]==='string'&&FOTO[a.id].startsWith('cartaz'))return `<div class="capa cartaz c-${a.ed}" style="background:${a.cor||'var(--amar)'}"><span class="tag mao">${rotulo}</span><span class="big">${esc(a.art)}</span><img src="img/${FOTO[a.id]}" alt="Cartaz do filme" loading="lazy"></div>`;
 if(FOTO[a.id]){const f=FOTO[a.id],nat=typeof f==="string";return `<div class="capa foto${nat?" natural":""} c-${a.ed}"><img src="img/${nat?f:"f"+f+".jpg"}" alt="" loading="lazy"><span class="circ"></span><span class="tag mao">${esc(EDS[a.ed]?EDS[a.ed].n.toLowerCase():'quem passou')}</span>${nat?'':`<span class="big">${esc(a.art)}</span>`}</div>`}
 const rosto=a.ed==='historias'?`<svg class="rosto" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="34" r="20" fill="#1D2FE0"/><path d="M14 100c2-26 18-40 36-40s34 14 36 40z" fill="#1D2FE0"/><path d="M30 30c4-16 34-18 40 0" fill="none" stroke="#101636" stroke-width="5"/></svg>`:'';
 return `<div class="capa c-${a.ed}" role="img" aria-label="Ilustração: ${esc(EDS[a.ed]?EDS[a.ed].n:'História')}"><span class="circ"></span><span class="tag mao">${esc(EDS[a.ed]?EDS[a.ed].n.toLowerCase():'quem passou')}</span>${rosto}<span class="big">${esc(a.art)}</span></div>`;
}
function card(a){
 return `<a class="card" href="#/artigo/${a.id}">${capa(a)}<span class="ed">${EDS[a.ed]?EDS[a.ed].n:'História'}${ex(a)}</span><h3>${esc(a.t)}</h3><p>${esc(a.d)}</p><span class="meta">${a.dt}, ${a.min} min de leitura</span></a>`;
}
const MA='https://www.modoaprovado.com.br';
const ACOES={
 redacao:{c:'',k:'correção de redação',h:'Descubra onde a sua redação perde pontos',p:'Escreva aqui no Enem Todo Dia e receba a correção da sua primeira redação completa, de presente: nota de treino, as cinco competências e o que ajustar.',b:'Corrigir minha redação',u:'#/corretor'},
 questoes:{c:'am',k:'questões oficiais',h:'Treine com as questões que já caíram no Enem',p:'As trilhas inteligentes do Modo Aprovado reúnem questões oficiais das últimas edições, com explicação a cada erro. Você sabe na hora o que revisar.',b:'Começar uma trilha inteligente',u:MA},
 tri:{c:'tn',k:'nota por TRI',h:'Quanto você tiraria se a prova fosse hoje?',p:'Nas trilhas do Modo Aprovado, o seu desempenho é calculado por TRI, o mesmo método do Enem. É uma estimativa de treino para acompanhar a sua evolução semana a semana.',b:'Ver minha estimativa por TRI',u:MA},
 personaliza:{c:'papel',k:'trilha inteligente',h:'Estude o que você mais precisa',p:'O Modo Aprovado percebe onde você tem mais dificuldade e ajusta a sua trilha. Menos tempo no que você já domina, mais tempo no que vai subir a sua nota.',b:'Montar minha trilha',u:MA},
 erro:{c:'',k:'explicação a cada erro',h:'Errou? Entenda o porquê na hora',p:'Cada questão errada nas trilhas do Modo Aprovado vem com explicação. É como ter um tutor particular que nunca dorme.',b:'Experimentar grátis',u:MA},
 preco:{c:'am',k:'1 ano de acesso',h:'Trilhas inteligentes e corretor de redação por um ano',p:'Questões oficiais com explicação a cada erro, estimativa de nota por TRI e correção de redação, tudo em uma plataforma.',$:1,b:'Quero o Modo Aprovado',u:MA}
};
const EDCTA={redacao:'redacao',materias:'questoes',estudo:'personaliza',carreiras:'tri',noticias:'tri',repertorio:'redacao',historias:'personaliza'};
const cta=k=>{const a=ACOES[k]||ACOES.redacao;return `<div class="box ${a.c}"><span class="mao kick">Modo Aprovado · ${a.k}</span><h3>${a.h}</h3><p>${a.p}</p>${a.$?'<div class="preco"><small>12x de</small> <b>R$ 9,90</b></div>':''}<a class="btn ${a.c==='am'?'':'am'}" href="${a.u}"${a.u.startsWith('http')?' target="_blank" rel="noopener"':''}>${a.b}</a></div>`};

function navs(rota){
 const items=Object.keys(EDS).map(k=>`<a href="#/${k}" class="${rota===k?'on':''}">${EDS[k].n}</a>`).join('');
 menu.innerHTML=items;mnav.innerHTML=items;
 fnav.innerHTML=items+'<a href="#/sobre">Sobre</a><a href="#/sobre">Contato</a><a href="#/sobre">Privacidade</a>';
}

function home(){
 const n=A.filter(a=>a.ed==='noticias').slice(0,3);
 const lidas=['competencias','zera','dia-da-prova','tri','intervencao','sisu-cotas'].map(byId);
 const margem=Array.from({length:14},(_,i)=>`<i>${i+1}</i>`).join('');
 const d=byId('tema-2026');
 return `
<div class="folha hero"><div class="margem">${margem}</div>
 <div class="wrap"><div class="in grid">
  <div>
   <h1 class="syne">${['O','Enem','inteiro,','sem'].map((w,i)=>`<span class="w" style="animation-delay:${i*.09}s">${w}</span>`).join(' ')} <em class="w" style="animation-delay:.36s">enrolação</em><span class="w" style="animation-delay:.45s">.</span></h1>
   <p class="lead">Do edital à redação nota mil: o Enem explicado em linguagem simples, todo dia.</p>
   <div class="acoes"><a class="btn lg" href="#/corretor">Corrigir minha redação</a><a class="lnk" href="#/estudo">Ver guias de estudo</a></div>
   <span class="nota mao">escreva aqui a primeira linha da sua aprovação</span>
  </div>
  <a class="destaque" href="#/artigo/${d.id}">${capa(d)}<h3 class="syne">${esc(d.t)}</h3><span class="meta">${EDS[d.ed].n}, ${d.min} min de leitura</span><span class="selo mao">destaque do dia</span></a>
 </div></div>
</div>
<div class="tick"><div class="tk">${(()=>{const t=A.filter(a=>a.ed!=='historias').map(a=>`<a href="#/artigo/${a.id}">${esc(a.t)}</a>`).join('');return t+t})()}</div></div>
<section><div class="wrap">
 <div class="sh"><h2 class="syne">Hoje na pauta</h2><span class="mao">resumido, com a fonte</span></div>
 <div class="cards">${n.map(card).join('')}</div>
</div></section>
<div class="faixa"><div class="wrap">
 ${Object.keys(EDS).map(k=>`<a href="#/${k}"><span class="syne">${EDS[k].n}</span><p>${EDS[k].d}</p></a>`).join('')}
</div></div>
<section><div class="wrap">
 <div class="sh"><h2 class="syne">Mais lidas da semana</h2></div>
 <div class="lidas">${lidas.map((a,i)=>`<a href="#/artigo/${a.id}"><b>${i+1}</b><span>${esc(a.t)}</span></a>`).join('')}</div>
</div></section>
<section style="background:#eef0f7"><div class="wrap cta-corr">
 <div><h2 class="syne">Descubra seu ponto de partida.</h2><p>Escreva uma redação e receba a correção completa, de presente. No Modo Aprovado, ela vira um plano de estudo que se ajusta ao seu nível.</p><a class="btn lg" href="#/corretor">Corrigir minha redação</a></div>
 <div class="mini mao">
  <div class="l"><i>1</i><span>Em um país de dimensões continentais,</span></div>
  <div class="l"><i>2</i><span>o acesso à educação ainda é desigual.</span></div>
  <div class="l"><i>3</i><span><span class="circulo">Nesse sentido</span>, a falta de investimento</span></div>
  <div class="l"><i>4</i><span>e de políticas contínuas agrava o</span></div>
  <div class="l"><i>5</i><span>problema. Logo, é urgente que o Estado</span></div>
  <div class="obs">bom conectivo, mantenha na versão final</div>
  <div class="carimbo">trecho<br>comentado</div>
 </div>
</div></section>
<section><div class="wrap">
 <div class="sh"><h2 class="syne">Quem passou conta como fez</h2><span class="mao">história real</span></div>
 <a class="hist" href="#/artigo/historia-mateus">${capa(byId('historia-mateus'))}<div><blockquote class="mao">"Não tinha noção da minha capacidade."</blockquote><div class="quem">Mateus, 17 anos, aprovado em Medicina na UFC</div><div class="onde">Escola pública, quatro horas de estudo por dia</div><p class="lnk">Ler a história completa</p></div></a>
</div></section>`;
}

function editoria(k){
 const e=EDS[k];const lista=A.filter(a=>a.ed===k);
 return `<div class="wrap"><div class="edtopo"><span class="mao">${e.m}</span><h1 class="syne">${e.n}</h1><p>${e.d}</p></div></div>
<section><div class="wrap"><div class="cards">${lista.map(card).join('')}</div></div></section>
<div class="wrap">${cta(EDCTA[k])}</div>`;
}

function artigo(id){
 const a=byId(id);if(!a)return home();
 const ed=EDS[a.ed]||{n:'Quem passou'};
 const corpo=a.b.map(p=>{
  if(p.startsWith('CTA'))return cta(p.split(':')[1]||EDCTA[a.ed]);
  if(p.startsWith('## '))return `<h2>${md(p.slice(3))}</h2>`;
  if(p.startsWith('- '))return '<ul>'+p.split('\n').map(l=>`<li>${md(l.slice(2))}</li>`).join('')+'</ul>';
  if(p.startsWith('!')){const [src,cap]=p.slice(1).split('|');return `<figure class="fig"><img src="${src}" alt="${esc(cap)}" loading="lazy"><figcaption>${esc(cap)}</figcaption></figure>`}
  if(p.startsWith('> '))return `<div class="dica"><span class="mao">anota aí</span>${md(p.slice(2))}</div>`;
  return `<p>${md(p)}</p>`;
 }).join('');
 const url=`${SITE}/#/artigo/${a.id}`,txt=`${a.t} | Enem Todo Dia`,u=encodeURIComponent(url),t=encodeURIComponent(txt);
 const fontes=a.fonte?`<div class="fontes"><b>Fontes</b><ul>${a.fonte.map(f=>`<li><a href="${f.u}" target="_blank" rel="noopener">${esc(f.n)}</a></li>`).join('')}</ul></div>`:'';
 const share=`<div class="share"><span class="mao">manda pra quem vai fazer a prova</span><h3>Compartilhe este artigo</h3><div class="sbtns">
  <a class="sb wa" href="https://wa.me/?text=${t}%20${u}" target="_blank" rel="noopener">${IC.wa}WhatsApp</a>
  <a class="sb" href="https://t.me/share/url?url=${u}&text=${t}" target="_blank" rel="noopener">${IC.tg}Telegram</a>
  <a class="sb" href="https://twitter.com/intent/tweet?text=${t}&url=${u}" target="_blank" rel="noopener">${IC.x}X</a>
  <a class="sb" href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener">${IC.fb}Facebook</a>
  <button class="sb" type="button" data-copiar="${url}">${IC.ln}<span>Copiar link</span></button>
  <button class="sb mais" type="button" data-share="${esc(a.t)}" data-url="${url}">${IC.sh}Mais opções</button>
 </div><p class="obs">Para o Instagram, copie o link e cole no seu story.</p></div>`;
 const rel=A.filter(x=>x.ed===a.ed&&x.id!==a.id).concat(A.filter(x=>x.ed==='redacao'&&x.id!==a.id)).filter((x,i,arr)=>arr.indexOf(x)===i).slice(0,3);
 return `<div class="wrap"><article class="art">
 <a class="ed" href="#/${EDS[a.ed]?a.ed:''}">${ed.n}</a>${ex(a)}
 <h1 class="syne">${esc(a.t)}</h1>
 <p class="dek">${esc(a.d)}</p>
 <div class="by"><span class="av">${a.por?'LG':'A'}</span><span>Por ${esc(a.por||'Admin')} · atualizado em ${a.dt} · ${a.min} min de leitura</span></div>
 ${capa(a)}${a.leg?`<p class="leg">${a.leg}</p>`:``}
 <div class="corpo">${corpo}</div>
 ${fontes}${share}
 </article>
 <section class="fim" style="padding-top:28px"><div class="sh"><h2 class="syne">Leia também</h2></div><div class="cards">${rel.map(card).join('')}</div></section>
</div>`;
}

/* Corretor: o Enem Todo Dia só recebe o texto. A correção roda no servidor do Modo Aprovado.
   Enquanto a função do Modo Aprovado não estiver no ar, ENDPOINT_REDACAO fica vazio e a folha mostra a tela de demonstração. */
const ENDPOINT_REDACAO='';
const UTM='utm_source=enemtododia&utm_medium=corretor&utm_campaign=folha';

function corretor(){
 const nums=Array.from({length:30},(_,i)=>`<span>${i+1}</span>`).join('');
 return `<div class="wrap corr">
 <div>
  <span class="mao" style="color:var(--verm);font-size:26px">primeira correção gratuita</span>
  <h1 class="syne">Corretor de redação do Enem gratuito</h1>
  <p class="lead">Escreva ou cole o seu texto na folha de 30 linhas, como a da prova. A primeira correção é gratuita e vem completa: nota de treino, as cinco competências e o que ajustar.</p>
  <div class="campo"><label class="r" for="tema">Tema da redação (opcional)</label><input class="c" id="tema" maxlength="200" placeholder="Ex.: Perspectivas acerca do envelhecimento na sociedade brasileira"></div>
  <label class="r" for="txt">Sua redação</label>
  <div class="linhas"><div class="nums">${nums}</div><textarea id="txt" spellcheck="false" maxlength="4500" placeholder="Comece a escrever na linha 1"></textarea></div>
  <div class="cont"><span id="cnt">0 de 30 linhas</span></div>
  <div class="duas"><div class="campo"><label class="r" for="em">Seu e-mail</label><input class="c" id="em" type="email" autocomplete="email" placeholder="voce@email.com"></div>
  <div class="campo"><label class="r" for="wa">Seu WhatsApp</label><input class="c" id="wa" type="tel" autocomplete="tel" placeholder="(31) 9 9999-9999"></div></div>
  <input class="pote" id="site" tabindex="-1" autocomplete="off" aria-hidden="true">
  <label class="chk"><input type="checkbox" id="ok"><span>Aceito receber a correção e novidades do Enem Todo Dia e do Modo Aprovado por e-mail e WhatsApp. Posso cancelar quando quiser.</span></label>
  <p class="erro" id="erro"></p>
  <button class="btn lg" id="enviar">Corrigir minha redação</button>
 </div>
 <aside class="recebe">
  <h2 class="syne">Como funciona</h2>
  <div><b>1. Você escreve aqui</b><span>Na folha de 30 linhas, com o tema que quiser.</span></div>
  <div><b>2. Entra no Modo Aprovado</b><span>Com a sua conta do Google ou criando uma senha. A sua redação já vai estar lá.</span></div>
  <div><b>3. Recebe a correção completa</b><span>Nota de treino, as cinco competências, os desvios marcados no texto e o que ajustar na próxima versão.</span></div>
  <div><b>4. Continua evoluindo</b><span>Corretor de redação sem limite e trilhas inteligentes até a prova, por 12x de R$ 9,90.</span></div>
 </aside>
</div>`;
}
function ligarCorretor(){
 const t=document.getElementById('txt'),c=document.getElementById('cnt');
 const spans=document.querySelectorAll('.linhas .nums span');let ant=0;
 // conta como na folha oficial (cerca de 72 caracteres por linha), igual em qualquer tela
 const linhas=()=>t.value.split(/\n/).map(p=>p.trim()).filter(Boolean).reduce((n,p)=>n+Math.ceil(p.length/72),0);
 const conta=()=>{const lin=Math.min(30,linhas());
  const dica=!lin?'':lin<8?' · passe da linha 7':lin<20?' · bom ritmo':' · ótimo tamanho';
  c.textContent=`${lin} de 30 linhas${dica}`;spans.forEach((s,i)=>s.classList.toggle('on',i<lin));
  if(lin!==ant){c.classList.remove('pop');void c.offsetWidth;c.classList.add('pop');if(lin>=20&&ant<20){const b=c.getBoundingClientRect();confete(b.left+40,b.top)}ant=lin}};
 t.addEventListener('input',conta);
 const bt=document.getElementById('enviar'),er=document.getElementById('erro');
 bt.onclick=async()=>{
  const em=document.getElementById('em').value.trim(),wa=document.getElementById('wa').value.replace(/\D/g,'');
  let msg='';
  if(linhas()<8)msg='Escreva pelo menos 8 linhas. No Enem, texto com até 7 linhas recebe nota zero.';
  else if(linhas()>30)msg='A sua redação passou de 30 linhas. Corte um pouco para caber na folha.';
  else if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))msg='Confira o seu e-mail.';
  else if(wa.length<10||wa.length>11)msg='Confira o seu WhatsApp com DDD.';
  else if(!document.getElementById('ok').checked)msg='Marque a caixa de consentimento para continuar.';
  if(msg){er.textContent=msg;er.style.display='block';return}
  er.style.display='none';
  if(document.getElementById('site').value){location.hash='#/enviada';return}
  if(!ENDPOINT_REDACAO){location.hash='#/enviada';return}
  bt.disabled=true;bt.textContent='Enviando a sua redação...';
  try{
   const r=await fetch(ENDPOINT_REDACAO,{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({tema:document.getElementById('tema').value.trim(),texto:t.value,email:em,whatsapp:wa,consentimento:true,origem:'enemtododia'})});
   const j=await r.json().catch(()=>({}));
   if(!r.ok||!j.token)throw new Error(j.erro||'');
   location.hash='#/enviada';
   location.href=`${MA}/redacao/?r=${encodeURIComponent(j.token)}&${UTM}`;
  }catch(e){
   er.textContent=e.message||'Não conseguimos enviar agora. Confira a sua internet e tente de novo em instantes.';er.style.display='block';
   bt.disabled=false;bt.textContent='Corrigir minha redação';
  }
 };
}
function enviada(){
 return `<div class="wrap env">
 <span class="mao" style="color:var(--verm);font-size:26px">redação recebida</span>
 <h1 class="syne">Sua redação está a caminho da correção.</h1>
 <p class="lead">${ENDPOINT_REDACAO?'Estamos levando você para o Modo Aprovado. Entre com o Google ou crie a sua senha e a correção aparece na tela.':'Em breve a correção completa vai abrir aqui, no Modo Aprovado.'}</p>
 <a class="btn lg" href="${MA}/redacao/?${UTM}" target="_blank" rel="noopener">Ver a correção no Modo Aprovado</a>
</div>`;
}

function sobre(){
 return `<div class="wrap"><article class="art"><h1 class="syne">Sobre o Enem Todo Dia</h1><div class="corpo"><p>O Enem Todo Dia explica o Enem sem enrolação: o que cai, como estudar, como escrever a redação e como escolher o curso.</p><p>Todo conteúdo é escrito e revisado por professor e cita fontes oficiais, como o Inep, o MEC e o gov.br.</p><p>O Enem Todo Dia é um projeto do Modo Aprovado, plataforma de estudo com trilhas que se ajustam ao nível de cada aluno.</p></div></article></div>`;
}

function render(){
 const p=(location.hash.replace(/^#\/?/,'')||'').split('/');
 const r=p[0];let html;
 if(!r)html=home();
 else if(EDS[r])html=editoria(r);
 else if(r==='artigo')html=artigo(p[1]);
 else if(r==='corretor')html=corretor();
 else if(r==='enviada')html=enviada();
 else if(r==='sobre')html=sobre();
 else html=home();
 app.innerHTML=html;navs(EDS[r]?r:'');
 const a=r==='artigo'&&byId(p[1]);
 document.title=a?a.t+' · Enem Todo Dia':EDS[r]?EDS[r].n+' · Enem Todo Dia':r==='corretor'?'Corretor de Redação Enem Gratuito com IA · Enem Todo Dia':'Enem Todo Dia · O Enem inteiro, sem enrolação';
 if(r==='corretor')ligarCorretor();
 window.scrollTo(0,0);
 rota=r;lido=false;leit.classList.remove('on','ok');fx(r);onScroll();
}

/* ===== efeitos ===== */
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
let io,rota='',lido=false;
function confete(x,y,n=36){
 if(RM)return;const cores=['#1D2FE0','#FFE94A','#E4281F','#101636'];
 for(let i=0;i<n;i++){const d=document.createElement('i');d.className='cf';
  d.style.cssText=`left:${x}px;top:${y}px;background:${cores[i%4]};width:${6+Math.random()*6}px;height:${4+Math.random()*8}px`;
  document.body.appendChild(d);const a=Math.random()*Math.PI*2,v=80+Math.random()*160,dx=Math.cos(a)*v,dy=Math.sin(a)*v-120;
  d.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${dx}px,${dy}px) rotate(${Math.random()*540}deg)`,opacity:1,offset:.5},{transform:`translate(${dx*1.3}px,${dy+260}px) rotate(${Math.random()*900}deg)`,opacity:0}],{duration:1300+Math.random()*700,easing:'cubic-bezier(.2,.6,.4,1)'}).onfinish=()=>d.remove()}
}
function mag(b){
 if(!FINE||RM||b.dataset.m)return;b.dataset.m=1;
 b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});
 b.addEventListener('mouseleave',()=>b.style.transform='');
}
function fx(r){
 io&&io.disconnect();
 io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
 document.querySelectorAll('#app .sh,#app .card,#app .faixa a,#app .lidas a,#app .cta-corr>div,#app .hist,#app .corpo>*,#app .edtopo,#app .recebe>div').forEach(el=>{
  const i=[...el.parentNode.children].indexOf(el);el.classList.add('rv');el.style.transitionDelay=Math.min(i,6)*70+'ms';io.observe(el)});
 document.querySelectorAll('.btn').forEach(mag);
 if(!navigator.share)document.querySelectorAll('.sb.mais').forEach(b=>b.remove());
 if(FINE&&!RM)document.querySelectorAll('#app .card,#app .destaque,#app .hist').forEach(c=>{
  const cp=c.querySelector('.capa');if(!cp)return;cp.insertAdjacentHTML('beforeend','<span class="shine"></span>');
  c.addEventListener('mousemove',e=>{const b=cp.getBoundingClientRect(),x=(e.clientX-b.left)/b.width,y=(e.clientY-b.top)/b.height;
   cp.style.transform=`perspective(700px) rotateY(${(x-.5)*10}deg) rotateX(${(.5-y)*10}deg)`;cp.style.setProperty('--mx',x*100+'%');cp.style.setProperty('--my',y*100+'%')});
  c.addEventListener('mouseleave',()=>cp.style.transform='')});

}
function onScroll(){
 const h=document.documentElement;pbar.style.transform=`scaleX(${h.scrollTop/((h.scrollHeight-innerHeight)||1)})`;
 if(rota!=='artigo')return;const c=document.querySelector('.corpo');if(!c)return;
 const b=c.getBoundingClientRect(),pr=Math.min(1,Math.max(0,(innerHeight*.7-b.top)/b.height));
 leit.classList.toggle('on',pr>0);leitI.style.setProperty('--p',pr*100+'%');
 leitT.textContent=pr>=1?'Leitura concluída':`Linha ${Math.max(1,Math.ceil(pr*30))} de 30`;
 if(pr>=1&&!lido){lido=true;leit.classList.add('ok');const r=leit.getBoundingClientRect();confete(r.left+24,r.top,40)}
}
addEventListener('scroll',onScroll,{passive:true});
document.addEventListener('pointerdown',e=>{const b=e.target.closest('.btn');if(!b||RM)return;const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),sp=document.createElement('span');
 sp.className='rp';sp.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;b.appendChild(sp);setTimeout(()=>sp.remove(),650)});
document.querySelector('.gig').innerHTML='EnemTodoDia'.split('').map((ch,i)=>`<span class="l${i>7?' v':''}">${ch}</span>`).join('');
window.addEventListener('hashchange',render);render();
