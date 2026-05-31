export const emailTemp = (resetLink: string) => {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">

<title>Reset Password</title>

<style>
body{
  margin:0;
  padding:0;
  background:#f5f7fb;
  font-family:Inter,Arial,sans-serif;
}

.wrapper{
  width:100%;
  padding:40px 16px;
}

.container{
  max-width:620px;
  margin:0 auto;
  background:#ffffff;
  border-radius:24px;
  overflow:hidden;
  border:1px solid #e5e7eb;
}

.header{
  padding:48px 40px;
  background:#111827;
}

.badge{
  display:inline-block;
  padding:8px 12px;
  border-radius:999px;
  background:rgba(255,255,255,.08);
  color:#ffffff;
  font-size:11px;
  font-weight:700;
  letter-spacing:.12em;
  text-transform:uppercase;
}

.title{
  margin-top:20px;
  color:#ffffff;
  font-size:38px;
  font-weight:800;
  line-height:1.1;
}

.subtitle{
  margin-top:16px;
  color:rgba(255,255,255,.7);
  font-size:15px;
  line-height:1.8;
}

.content{
  padding:40px;
}

.text{
  color:#374151;
  font-size:15px;
  line-height:1.9;
  margin-bottom:20px;
}

.button-wrap{
  margin:32px 0;
}

.button{
  display:inline-block;
  padding:16px 28px;
  background:#111827;
  color:#ffffff !important;
  text-decoration:none;
  border-radius:14px;
  font-weight:600;
  font-size:15px;
}

.security-box{
  margin-top:28px;
  padding:20px;
  border-radius:16px;
  background:#f9fafb;
  border:1px solid #e5e7eb;
}

.security-title{
  font-size:13px;
  font-weight:700;
  color:#111827;
  margin-bottom:8px;
}

.security-text{
  font-size:14px;
  color:#6b7280;
  line-height:1.8;
}

.link-box{
  margin-top:24px;
  padding:16px;
  background:#f9fafb;
  border:1px solid #e5e7eb;
  border-radius:14px;
  font-size:13px;
  color:#374151;
  word-break:break-all;
}

.footer{
  padding:30px 40px;
  border-top:1px solid #e5e7eb;
  text-align:center;
}

.footer-brand{
  font-size:14px;
  font-weight:700;
  color:#111827;
}

.footer-text{
  margin-top:8px;
  color:#6b7280;
  font-size:12px;
  line-height:1.8;
}
</style>
</head>

<body>

<div class="wrapper">

<div class="container">

<div class="header">
<div class="badge">ACCOUNT SECURITY</div>

<div class="title">
Reset your password
</div>

<div class="subtitle">
A password reset request was received for your account.
</div>
</div>

<div class="content">

<p class="text">
We received a request to reset the password associated with your account.
</p>

<p class="text">
Click the button below to securely create a new password.
</p>

<div class="button-wrap">
<a href="${resetLink}" class="button">
Reset Password →
</a>
</div>

<div class="security-box">
<div class="security-title">
Security Notice
</div>

<div class="security-text">
This password reset link expires in 15 minutes and can only be used once.
</div>
</div>

<div class="link-box">
${resetLink}
</div>

<p class="text" style="margin-top:24px;">
If you did not request a password reset, you can safely ignore this email.
</p>

</div>

<div class="footer">

<div class="footer-brand">
TalentForge
</div>

<div class="footer-text">
This email was generated automatically for account security purposes.
</div>

</div>

</div>

</div>

</body>
</html>
`;
};

