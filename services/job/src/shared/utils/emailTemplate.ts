export const applicationStatusUpdateTemplate = (
    jobTitle:string
  ) => {
  
    return `
    <!DOCTYPE html>
    <html lang="en">
  
    <head>
  
      <meta charset="UTF-8" />
  
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
  
      <title>
        Application Update
      </title>
  
      <style>
  
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
  
        body {
  
          background: #090909;
  
          font-family:
            Inter,
            Arial,
            sans-serif;
  
          padding: 40px 20px;
  
          color: #ffffff;
        }
  
        .wrapper {
          width: 100%;
        }
  
        .container {
  
          position: relative;
  
          width: 100%;
          max-width: 620px;
  
          margin: auto;
  
          overflow: hidden;
  
          border-radius: 32px;
  
          background:
            linear-gradient(
              180deg,
              #111111 0%,
              #0d0d0d 100%
            );
  
          border:
            1px solid rgba(255,255,255,0.06);
  
          box-shadow:
            0 30px 80px rgba(0,0,0,0.55);
        }
  
        /* ambient */
  
        .ambient {
  
          position: absolute;
  
          inset: 0;
  
          pointer-events: none;
  
          overflow: hidden;
        }
  
        .ambient-left {
  
          position: absolute;
  
          top: -120px;
          left: -120px;
  
          width: 320px;
          height: 320px;
  
          border-radius: 999px;
  
          background:
            radial-gradient(
              circle,
              rgba(16,185,129,0.10) 0%,
              transparent 70%
            );
        }
  
        .ambient-right {
  
          position: absolute;
  
          bottom: -140px;
          right: -140px;
  
          width: 340px;
          height: 340px;
  
          border-radius: 999px;
  
          background:
            radial-gradient(
              circle,
              rgba(6,182,212,0.08) 0%,
              transparent 70%
            );
        }
  
        .top-line {
  
          width: 100%;
          height: 1px;
  
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(52,211,153,0.55),
              transparent
            );
        }
  
        .hero {
  
          position: relative;
  
          overflow: hidden;
  
          padding: 52px 42px 42px;
        }
  
        .badge {
  
          display: inline-flex;
  
          align-items: center;
  
          gap: 6px;
  
          padding: 8px 14px;
  
          border-radius: 999px;
  
          background:
            rgba(52,211,153,0.08);
  
          border:
            1px solid rgba(52,211,153,0.15);
  
          color: #34d399;
  
          font-size: 11px;
  
          font-weight: 700;
  
          letter-spacing: 0.14em;
  
          text-transform: uppercase;
        }
  
        .title {
  
          margin-top: 24px;
  
          font-size: 42px;
  
          font-weight: 900;
  
          line-height: 1;
  
          letter-spacing: -0.08em;
  
          color: #ffffff;
        }
  
        .subtitle {
  
          margin-top: 18px;
  
          max-width: 470px;
  
          font-size: 15px;
  
          line-height: 1.8;
  
          color: rgba(255,255,255,0.55);
        }
  
        .content {
  
          position: relative;
  
          padding:
            0 42px 42px;
        }
  
        .card {
  
          position: relative;
  
          overflow: hidden;
  
          padding: 30px;
  
          border-radius: 28px;
  
          background:
            rgba(255,255,255,0.025);
  
          border:
            1px solid rgba(255,255,255,0.06);
  
          backdrop-filter: blur(18px);
        }
  
        .card::before {
  
          content: "";
  
          position: absolute;
  
          inset-x: 0;
          top: 0;
  
          height: 1px;
  
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(52,211,153,0.40),
              transparent
            );
        }
  
        .label {
  
          font-size: 11px;
  
          font-weight: 700;
  
          letter-spacing: 0.16em;
  
          text-transform: uppercase;
  
          color: rgba(255,255,255,0.30);
        }
  
        .job-title {
  
          margin-top: 16px;
  
          font-size: 32px;
  
          font-weight: 900;
  
          line-height: 1.15;
  
          letter-spacing: -0.06em;
  
          color: #ffffff;
        }
  
        .description {
  
          margin-top: 28px;
  
          font-size: 15px;
  
          line-height: 1.9;
  
          color: rgba(255,255,255,0.55);
        }
  
        .cta-wrapper {
          margin-top: 36px;
        }
  
        .cta {
  
          display: inline-flex;
  
          align-items: center;
  
          gap: 10px;
  
          height: 48px;
  
          padding: 0 22px;
  
          border-radius: 18px;
  
          background:
            linear-gradient(
              135deg,
              #10b981 0%,
              #059669 100%
            );
  
          color: #ffffff;
  
          text-decoration: none;
  
          font-size: 14px;
  
          font-weight: 700;
  
          box-shadow:
            0 10px 30px rgba(16,185,129,0.20);
        }
  
        .footer {
  
          padding: 30px 42px;
  
          border-top:
            1px solid rgba(255,255,255,0.06);
  
          text-align: center;
        }
  
        .footer-text {
  
          font-size: 12px;
  
          line-height: 1.8;
  
          color: rgba(255,255,255,0.30);
        }
  
        @media screen and (max-width: 640px) {
  
          body {
            padding: 18px 10px;
          }
  
          .hero,
          .content,
          .footer {
            padding-left: 24px;
            padding-right: 24px;
          }
  
          .hero {
            padding-top: 38px;
          }
  
          .title {
            font-size: 34px;
          }
  
          .job-title {
            font-size: 26px;
          }
  
          .card {
            padding: 24px;
          }
        }
  
      </style>
    </head>
  
    <body>
  
      <div class="wrapper">
  
        <div class="container">
  
          <!-- ambient -->
  
          <div class="ambient">
  
            <div class="ambient-left"></div>
  
            <div class="ambient-right"></div>
  
          </div>
  
          <div class="top-line"></div>
  
          <!-- HERO -->
  
          <div class="hero">
  
            <div class="badge">
              TalentForge Recruiter
            </div>
  
            <div class="title">
              Application Updated
            </div>
  
            <div class="subtitle">
              Your application has been reviewed by the recruiter team.
            </div>
          </div>
  
          <!-- CONTENT -->
  
          <div class="content">
  
            <div class="card">
  
              <div class="label">
                Position
              </div>
  
              <div class="job-title">
                ${jobTitle}
              </div>
  
              <div class="description">
  
                We wanted to let you know
                that there has been an update
                regarding your application for
                this role.
  
                Please login to your
                TalentForge dashboard to
                review the latest information
                and recruiter feedback.
  
              </div>
  
              <div class="cta-wrapper">
  
                <a
                  href="#"
                  class="cta"
                >
                  View Application
                </a>
  
              </div>
            </div>
          </div>
  
          <!-- FOOTER -->
  
          <div class="footer">
  
            <div class="footer-text">
              © 2026 TalentForge. All rights reserved.
            </div>
  
            <div class="footer-text">
              This is an automated email. Please do not reply.
            </div>
  
          </div>
        </div>
      </div>
    </body>
    </html>
    `
  }