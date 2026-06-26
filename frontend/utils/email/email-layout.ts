type EmailLayoutProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  footer: string;
};

export function emailLayout({
  title,
  description,
  buttonText,
  buttonUrl,
  footer,
}: EmailLayoutProps) {
  return `
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
</head>

<body
  style="
    margin:0;
    padding:40px 20px;
    background:#F4F6F7;
    font-family:Arial,Helvetica,sans-serif;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
>
<tr>
<td align="center">

<table
  width="600"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#ffffff;
    border:1px solid #E8ECF0;
    border-radius:18px;
    overflow:hidden;
  "
>

<tr>
<td
style="
padding:42px;
"
>

<div
style="
font-size:32px;
font-weight:700;
letter-spacing:2px;
color:#1A2B35;
text-align:center;
margin-bottom:32px;
"
>
TRIAGENT
</div>

<h1
style="
font-size:32px;
margin:0 0 20px;
text-align:center;
color:#1A2B35;
"
>
${title}
</h1>

<p
style="
font-size:16px;
line-height:1.8;
color:#5F6B76;
text-align:center;
margin-bottom:40px;
"
>
${description}
</p>

<div
style="
text-align:center;
margin-bottom:40px;
"
>

<a
href="${buttonUrl}"
style="
display:inline-block;
background:#1A2B35;
color:#ffffff;
text-decoration:none;
padding:16px 34px;
border-radius:12px;
font-size:16px;
font-weight:600;
"
>
${buttonText}
</a>

</div>

<p
style="
font-size:14px;
line-height:1.8;
color:#6B7B88;
text-align:center;
"
>
If the button doesn't work, copy and paste this link into your browser.
</p>

<p
style="
font-size:13px;
word-break:break-all;
text-align:center;
color:#4A7FA0;
"
>
${buttonUrl}
</p>

<hr
style="
margin:36px 0;
border:none;
border-top:1px solid #E8ECF0;
"
/>

<p
style="
font-size:14px;
line-height:1.8;
color:#6B7B88;
text-align:center;
"
>
${footer}
</p>

<p
style="
font-size:13px;
color:#98A2B3;
text-align:center;
margin-top:24px;
"
>
© ${new Date().getFullYear()} Triagent.
All rights reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>

</html>
`;
}