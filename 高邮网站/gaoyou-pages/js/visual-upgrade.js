/* ============================================
   视觉升级 · 交互增强层
   遗产融绘 · 魅力高邮
   ============================================ */
(function(){
  /* ---- Hero 粒子系统 ---- */
  function initParticles(){
    var banner=document.querySelector('.hero-banner');
    if(!banner)return;
    var container=document.createElement('div');
    container.className='hero-particles';
    container.setAttribute('aria-hidden','true');
    banner.appendChild(container);
    /* 生成 18 个随机浮动粒子 */
    for(var i=0;i<18;i++){
      var p=document.createElement('div');
      p.className='hero-particle';
      var size=Math.random()*4+2;
      var x=Math.random()*100;
      var y=Math.random()*100;
      var dur=Math.random()*12+10;
      var delay=Math.random()*8;
      var opacity=Math.random()*.35+.1;
      p.style.cssText='width:'+size+'px;height:'+size+'px;left:'+x+'%;top:'+y+'%;opacity:'+opacity+';animation:particleFloat '+dur+'s '+delay+'s ease-in-out infinite alternate';
      container.appendChild(p);
    }
    /* 注入粒子动画样式 */
    if(!document.getElementById('vu-particle-style')){
      var st=document.createElement('style');
      st.id='vu-particle-style';
      st.textContent='@keyframes particleFloat{0%{transform:translateY(0) translateX(0)}25%{transform:translateY(-18px) translateX(8px)}50%{transform:translateY(-6px) translateX(-6px)}75%{transform:translateY(-22px) translateX(4px)}100%{transform:translateY(-10px) translateX(-10px)}}';
      document.head.appendChild(st);
    }
  }

  /* ---- 滚动渐现系统 ---- */
  function initScrollReveal(){
    /* 为门户卡片添加渐现类 */
    var selectors=[
      {sel:'.pc-card',cls:'v-up',delays:[0,1,2]},
      {sel:'.pm-card',cls:'v-up',delays:[0,1,2,3]},
      {sel:'.tc',cls:'v-up',delays:[0,1,2]},
      {sel:'.tl-node',cls:'v-up',delays:[0,1,2]},
      {sel:'.s-card',cls:'v-up',delays:[0,1,2,3]},
      {sel:'.flow-lane',cls:'v-up',delays:[0,1,2]},
      {sel:'.gc',cls:'v-up',delays:[0,1,2]},
      {sel:'.dg',cls:'v-up',delays:[0,1,2]},
      {sel:'.gal a',cls:'v-scale',delays:null},
      {sel:'.m-stat',cls:'v-up',delays:[0,1,2,3]},
      {sel:'.as',cls:'v-up',delays:[0,1,2,3]},
    ];
    selectors.forEach(function(cfg){
      var els=document.querySelectorAll(cfg.sel);
      els.forEach(function(el,i){
        el.classList.add(cfg.cls);
        if(cfg.delays){
          var d=cfg.delays[i%cfg.delays.length];
          el.classList.add('v-d'+(d+1));
        }
      });
    });

    /* 区块标题动画 */
    document.querySelectorAll('.lbl,.tt,.sub').forEach(function(el){
      el.classList.add('v-up');
    });

    /* 通用 IntersectionObserver */
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('vis');
          obs.unobserve(entry.target);
        }
      });
    },{threshold:.06,rootMargin:'0px 0px -40px 0px'});

    document.querySelectorAll('.v-up,.v-left,.v-right,.v-scale').forEach(function(el){
      obs.observe(el);
    });
  }

  /* ---- Hero 视差滚动 ---- */
  function initParallax(){
    var heroImg=document.querySelector('.hero-img');
    var heroInner=document.querySelector('.hero-inner');
    var vtext=document.querySelector('.vtext');
    if(!heroImg)return;
    var ticking=false;
    window.addEventListener('scroll',function(){
      if(!ticking){
        requestAnimationFrame(function(){
          var sy=window.scrollY;
          var wh=window.innerHeight;
          if(sy<wh*1.5){
            heroImg.style.transform='scale('+(1.02+sy*0.00008)+') translateY('+sy*0.15+'px)';
            if(heroInner)heroInner.style.opacity=Math.max(0,1-sy/(wh*0.65));
            if(vtext)vtext.style.opacity=Math.max(0,.7-sy/(wh*0.8));
          }
          ticking=false;
        });
        ticking=true;
      }
    },{passive:true});
  }

  /* ---- 导航栏活跃项高亮 ---- */
  function initActiveNav(){
    var navLinks=document.querySelectorAll('.nav a[data-page]');
    var sections={};
    navLinks.forEach(function(a){
      sections[a.getAttribute('data-page')]=a;
    });
    /* 页面切换时高亮 */
    var origShowPage=window.showPage;
    if(typeof origShowPage==='function'){
      window.showPage=function(id){
        origShowPage(id);
        navLinks.forEach(function(a){
          a.style.position='relative';
          if(a.getAttribute('data-page')===id){
            a.style.fontWeight='700';
          }else{
            a.style.fontWeight='';
          }
        });
      };
    }
  }

  /* ---- 策划导航项序号标记 ---- */
  function initNavNumbers(){
    var navItems=document.querySelectorAll('.nav ul li');
    navItems.forEach(function(li,i){
      li.style.setProperty('--nav-i',i);
    });
  }

  /* ---- 图片懒加载增强 ---- */
  function initLazyImages(){
    if('loading' in HTMLImageElement.prototype)return;
    var imgs=document.querySelectorAll('img:not([loading])');
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var img=entry.target;
          if(img.dataset.src){img.src=img.dataset.src;}
          obs.unobserve(img);
        }
      });
    },{rootMargin:'200px'});
    imgs.forEach(function(img){obs.observe(img);});
  }

  /* ---- 平滑锚点滚动（增强版） ---- */
  function initSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click',function(e){
        var target=document.querySelector(a.getAttribute('href'));
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
        }
      });
    });
  }

  /* ---- 鼠标跟随光晕（仅桌面） ---- */
  function initCursorGlow(){
    if(window.innerWidth<900)return;
    var glow=document.createElement('div');
    glow.style.cssText='position:fixed;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(176,138,62,.04),transparent 70%);pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:opacity .3s;opacity:0';
    glow.setAttribute('aria-hidden','true');
    document.body.appendChild(glow);
    document.addEventListener('mousemove',function(e){
      glow.style.left=e.clientX+'px';
      glow.style.top=e.clientY+'px';
      glow.style.opacity='1';
    });
    document.addEventListener('mouseleave',function(){glow.style.opacity='0';});
  }

  /* ---- 初始化 ---- */
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',boot);
  }else{
    boot();
  }
  function boot(){
    initParticles();
    initScrollReveal();
    initParallax();
    initActiveNav();
    initNavNumbers();
    initLazyImages();
    initSmoothScroll();
    initCursorGlow();
  }
})();
