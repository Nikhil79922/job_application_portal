import { head, toastCSS, toastJS } from "./shared";

export function getLoginPage() {
  const css = `body{display:flex;align-items:center;justify-content:center;background:#050507;overflow:hidden;}.bg{position:fixed;inset:0;background:radial-gradient(circle at 30% 20%,rgba(124,58,237,.08) 0%,transparent 50%),radial-gradient(circle at 70% 80%,rgba(59,130,246,.06) 0%,transparent 50%);}.card{position:relative;z-index:1;width:100%;max-width:420px;padding:48px 44px;background:rgba(15,15,23,.9);border:1px solid rgba(148,163,184,.08);border-radius:24px;backdrop-filter:blur(20px);box-shadow:0 0 0 1px rgba(148,163,184,.05),0 25px 80px -12px rgba(0,0,0,.8),0 0 60px -30px rgba(124,58,237,.15);}.logo{width:48px;height:48px;background:linear-gradient(135deg,#7c3aed,#3b82f6);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 24px;box-shadow:0 8px 24px -8px rgba(124,58,237,.4);}h1{text-align:center;font-size:20px;font-weight:700;color:#f8fafc;margin-bottom:6px;}.sub{text-align:center;font-size:13px;color:#64748b;margin-bottom:36px;}.field{position:relative;margin-bottom:20px;}.field label{display:block;font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px;}.field input{width:100%;padding:14px 18px;background:rgba(15,23,42,.6);border:1px solid rgba(148,163,184,.1);border-radius:12px;color:#f1f5f9;font-size:14px;outline:none;transition:all .2s;}.field input:focus{border-color:rgba(124,58,237,.5);box-shadow:0 0 0 3px rgba(124,58,237,.1);}.btn{width:100%;padding:14px;background:linear-gradient(135deg,#7c3aed 0%,#6d28d9 100%);border:none;border-radius:12px;color:#fff;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;margin-top:8px;}.btn:hover{transform:translateY(-2px);box-shadow:0 12px 28px -8px rgba(124,58,237,.5);}.btn:active{transform:translateY(0);}.btn:disabled{opacity:.6;cursor:not-allowed;transform:none;}` + toastCSS();
  return head("Log Admin — Login", css) + `<body><div class="bg"></div><div class="card"><div class="logo">🔍</div><h1>Log Admin</h1><p class="sub">Centralized Logging Dashboard</p><div class="field"><label>Password</label><input type="password" id="pw" placeholder="Enter admin password" onkeydown="if(event.key==='Enter')go()"></div><button class="btn" id="btn" onclick="go()">Sign In →</button></div><script>${toastJS()}
async function go(){
  const btn=document.getElementById('btn');
  const pw=document.getElementById('pw').value.trim();
  if(!pw){toast('Please enter the password','err');return;}
  btn.disabled=true;btn.textContent='Signing in…';
  try{
    const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify({password:pw})});
    if(r.ok){toast('Login successful — redirecting…','ok');setTimeout(()=>window.location='/dashboard',700);}
    else{toast('Invalid password. Please try again.','err');btn.disabled=false;btn.textContent='Sign In →';}
  }catch(e){toast('Network error — is the server running?','err');btn.disabled=false;btn.textContent='Sign In →';}
}
</script></body></html>`;
}
