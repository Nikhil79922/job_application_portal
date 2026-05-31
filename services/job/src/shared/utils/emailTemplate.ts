export const applicationStatusUpdateTemplate = (
  jobTitle: string
) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">

<title>Application Status Update</title>

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

.label{
  color:#9ca3af;
  font-size:12px;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:.12em;
}

.job-title{
  margin-top:14px;
  color:#111827;
  font-size:30px;
  font-weight:800;
  line-height:1.2;
}

.status-box{
  margin-top:24px;
  padding:20px;
  border-radius:16px;
  background:#ecfdf5;
  border:1px solid #a7f3d0;
}

.status-title{
  color:#065f46;
  font-size:13px;
  font-weight:700;
  text-transform:uppercase;
}

.status-text{
  margin-top:8px;
  color:#047857;
  font-size:14px;
  line-height:1.8;
}

.description{
  margin-top:28px;
  color:#4b5563;
  font-size:15px;
  line-height:1.9;
}

.note{
  margin-top:28px;
  padding-top:24px;
  border-top:1px solid #e5e7eb;
  color:#6b7280;
  font-size:14px;
  line-height:1.8;
}

.footer{
  padding:30px 40px;
  border-top:1px solid #e5e7eb;
  text-align:center;
}

.footer-brand{
  color:#111827;
  font-size:14px;
  font-weight:700;
}

.footer-text{
  margin-top:8px;
  color:#6b7280;
  font-size:12px;
}
</style>
</head>

<body>

<div class="wrapper">

<div class="container">

<div class="header">

<div class="badge">
RECRUITMENT TEAM
</div>

<div class="title">
Application Status Update
</div>

<div class="subtitle">
There has been an update regarding your application.
</div>

</div>

<div class="content">

<div class="label">
Position
</div>

<div class="job-title">
${jobTitle}
</div>

<div class="status-box">

<div class="status-title">
Application Updated
</div>

<div class="status-text">
The hiring team has reviewed your application and updated its status.
</div>

</div>

<div class="description">

Thank you for your interest in this opportunity.

We wanted to let you know that there has been an update regarding your application for the role listed above.

You can review the latest status and recruiter feedback from your TalentForge account.

</div>

<div class="note">

Hiring timelines and decisions may vary depending on the recruitment process for this role.

</div>

</div>

<div class="footer">

<div class="footer-brand">
TalentForge
</div>

<div class="footer-text">
This notification was generated automatically by TalentForge.
</div>

</div>

</div>

</div>

</body>
</html>
`;
};
