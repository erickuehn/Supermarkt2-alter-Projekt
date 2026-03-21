// Simple login modal behavior (client-side only, demo)
(function(){
  function openModal(){
    const m = document.getElementById('login-modal');
    if(m) m.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    const m = document.getElementById('login-modal');
    if(m) m.setAttribute('aria-hidden','true');
  }

  document.addEventListener('click', (e)=>{
    if(e.target && e.target.id === 'login-open'){
      openModal();
    }
    if(e.target && e.target.closest && e.target.closest('.modal-close')){
      closeModal();
    }
    if(e.target && e.target.id === 'login-modal' && e.target.getAttribute('aria-hidden') === 'false'){
      closeModal();
    }
  });

  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

  document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('login-form');
    const msg = document.getElementById('login-msg');
    if(!form) return;
    form.addEventListener('submit', async (ev)=>{
      ev.preventDefault();
      const email = (document.getElementById('login-email')||{}).value || '';
      const pass = (document.getElementById('login-password')||{}).value || '';
      if(!email || !pass){
        if(msg) { msg.textContent = 'Bitte E‑Mail und Passwort eingeben.'; msg.style.color = '#c00'; }
        return;
      }

      try{
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: pass })
        });
        const data = await res.json();
        if(!res.ok){
          if(msg){ msg.textContent = data.error || 'Login fehlgeschlagen'; msg.style.color = '#c00'; }
          return;
        }
        if(msg){ msg.textContent = 'Erfolgreich eingeloggt.'; msg.style.color = 'green'; }
        setTimeout(()=>{ try{ closeModal(); window.location.reload(); }catch(e){} }, 700);
      }catch(err){
        if(msg){ msg.textContent = 'Netzwerkfehler'; msg.style.color = '#c00'; }
        console.error(err);
      }
    });
  });
})();
