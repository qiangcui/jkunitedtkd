/**
 * JK United TKD — Form Email Handler
 *
 * IMPORTANT: Do NOT open this file from Google Drive.
 * Copy-paste this code into https://script.google.com (New project).
 *
 * Setup (jkunitedtkd@gmail.com):
 * 1. Go to https://script.google.com → New project
 * 2. Delete default code, paste ALL of this file into Code.gs → Save
 * 3. Run testSetup() once from the editor (authorize Gmail when prompted)
 * 4. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL — must look like:
 *    https://script.google.com/macros/s/AKfycb.../exec
 * 6. Paste that URL into .env as VITE_GOOGLE_APPS_SCRIPT_URL
 * 7. Open that /exec URL in your browser — you should see JSON, NOT a Drive error
 */

var RECIPIENT_EMAIL = 'jkunitedtkd@gmail.com';
var SITE_URL = 'https://jkunitedtkd.vercel.app';
var STUDIO_PHONE = '720-900-4546';
var STUDIO_EMAIL = 'jkunitedtkd@gmail.com';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    sendAdminNotification(data);

    if (data.email) {
      sendCustomerConfirmation(data);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ success: false, error: error.toString() });
  }
}

function doGet() {
  return jsonResponse({ success: true, message: 'JK United TKD form handler is running.' });
}

/**
 * Run this ONCE from the Apps Script editor before deploying.
 * Authorizes Gmail and sends a test email to jkunitedtkd@gmail.com.
 */
function testSetup() {
  var testData = {
    formType: 'trial-booking-contact',
    program: 'Children (Ages 7-12)',
    parentName: 'Test Parent',
    studentName: 'Test Student',
    studentAge: '8',
    phone: '720-900-4546',
    email: 'jkunitedtkd@gmail.com',
    notes: 'This is a test submission from Apps Script setup.',
    submittedAt: new Date().toISOString(),
    site: 'JK United TKD',
  };

  sendAdminNotification(testData);
  sendCustomerConfirmation(testData);
  Logger.log('Test emails sent successfully. You can deploy the web app now.');
}

function sendAdminNotification(data) {
  var formLabel = formatFormType(data.formType);
  var subject = '[JK United TKD] New 2-Week Trial Request - ' + (data.parentName || 'Website Visitor');

  var plainBody = [
    'New 2-Week Trial Program ($59) booking from JK United TKD website',
    '',
    'Form: ' + formLabel,
    'Program: ' + (data.program || '—'),
    'Parent / Contact: ' + (data.parentName || '—'),
    'Student: ' + (data.studentName || '—'),
    'Age: ' + (data.studentAge || '—'),
    'Phone: ' + (data.phone || '—'),
    'Email: ' + (data.email || '—'),
    'Notes: ' + (data.notes || '—'),
  ].join('\n');

  GmailApp.sendEmail(RECIPIENT_EMAIL, subject, plainBody, {
    htmlBody: buildAdminEmailHtml(data, formLabel),
    replyTo: data.email || '',
    name: 'JK United TKD Website',
  });
}

function sendCustomerConfirmation(data) {
  var firstName = (data.parentName || 'there').split(' ')[0];
  var subject = 'Your 2-Week Trial Request - JK United Taekwondo';

  var plainBody = [
    'Hi ' + firstName + ',',
    '',
    'Thank you for booking the 2-Week Trial Program ($59) at JK United Taekwondo!',
    'Includes 4 Classes & FREE Uniform ($50 Value).',
    '',
    'Program: ' + (data.program || '—'),
    'We received your submission and will contact you within 24 hours.',
    '',
    'Questions? Call us at ' + STUDIO_PHONE + ' or email ' + STUDIO_EMAIL + '.',
    '',
    'JK United Taekwondo Center',
    '22651 E Aurora Pkwy Unit A-8, Aurora, CO 80016',
  ].join('\n');

  GmailApp.sendEmail(data.email, subject, plainBody, {
    htmlBody: buildCustomerEmailHtml(data, firstName),
    name: 'JK United Taekwondo',
    replyTo: STUDIO_EMAIL,
  });
}

function buildAdminEmailHtml(data, formLabel) {
  var rows = [
    compactField('Program', data.program),
    compactField('Contact', data.parentName),
    compactField('Student', data.studentName),
    compactField('Age', data.studentAge),
    compactField('Phone', data.phone, true),
    compactField('Email', data.email, true),
    compactField('Source', formLabel),
    compactField('Notes', data.notes),
    compactField('Submitted', formatDate(data.submittedAt)),
  ].join('');

  return wrapEmailHtml({
    preheader: 'New 2-Week Trial request from ' + (data.parentName || 'website visitor'),
    badge: 'New Submission',
    title: '2-Week Trial Booking Received',
    subtitle: '2-Week Trial Program – $59 (4 classes + FREE uniform).',
    bodyContent: singleColumnTable(rows),
    cta: data.phone
      ? ctaButton('tel:' + escapeHtml(data.phone.replace(/\D/g, '')), 'Call ' + escapeHtml(data.phone))
      : '',
    footer: 'Reply to this email to reach the customer.',
  });
}

function buildCustomerEmailHtml(data, firstName) {
  var rows = [
    compactField('Program', data.program),
    compactField('Student', data.studentName || data.parentName),
    compactField('Phone', data.phone, true),
    compactField('Email', data.email, true),
  ].join('');

  return wrapEmailHtml({
    preheader: 'We received your 2-Week Trial request - JK United TKD',
    badge: 'Request Confirmed',
    title: 'Thank You, ' + escapeHtml(firstName) + '!',
    subtitle: '2-Week Trial Program – $59. Includes 4 Classes & FREE Uniform ($50 Value). We will contact you within 24 hours.',
    bodyContent: singleColumnTable(rows),
    cta:
      ctaButton('tel:7209004546', 'Call ' + STUDIO_PHONE) +
      '<p style="margin:14px 0 0;text-align:center;">' +
      '<a href="' + SITE_URL + '" style="' + linkStyle() + 'font-size:16px;">Visit Website</a>' +
      '</p>',
    footer: 'JK United TKD · 22651 E Aurora Pkwy Unit A-8, Aurora, CO 80016',
  });
}

function wrapEmailHtml(opts) {
  return [
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
    '<title>JK United TKD</title></head>',
    '<body style="margin:0;padding:0;background:#0A1128;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">',
    '<div style="display:none;max-height:0;overflow:hidden;">' + escapeHtml(opts.preheader) + '</div>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A1128;padding:24px 12px;">',
    '<tr><td align="center">',
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border:1px solid #1E3A8A;border-radius:16px;overflow:hidden;">',

    // Header
    '<tr><td style="background:linear-gradient(135deg,#CC2936 0%,#1E3A8A 100%);padding:28px 24px;text-align:center;">',
    '<p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.9);">' + escapeHtml(opts.badge) + '</p>',
    '<h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2;">' + opts.title + '</h1>',
    '</td></tr>',

    // Body
    '<tr><td style="background:#0D1B3E;padding:24px;">',
    '<p style="margin:0 0 20px;font-size:17px;line-height:1.55;color:#e2e8f0;">' + opts.subtitle + '</p>',
    opts.bodyContent,
    opts.cta ? '<div style="margin:24px 0 0;text-align:center;">' + opts.cta + '</div>' : '',
    '</td></tr>',

    // Footer
    '<tr><td style="background:#091129;padding:18px 24px;text-align:center;border-top:1px solid #1E3A8A;">',
    '<p style="margin:0;font-size:14px;line-height:1.5;color:#94a3b8;">' + opts.footer + '</p>',
    '</td></tr>',

    '</table></td></tr></table></body></html>',
  ].join('');
}

function singleColumnTable(rows) {
  return [
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A1128;border:1px solid #1E3A8A;border-radius:12px;overflow:hidden;">',
    rows,
    '</table>',
  ].join('');
}

function compactField(label, value, isLink) {
  var display = value ? escapeHtml(String(value)) : '<span style="color:#94a3b8;font-size:17px;">—</span>';
  var valueHtml = value && isLink
    ? '<a href="' + (label === 'Phone' ? 'tel:' + String(value).replace(/\D/g, '') : 'mailto:' + escapeHtml(String(value))) + '" style="color:#ffffff;text-decoration:none;font-size:18px;font-weight:700;">' + display + '</a>'
    : '<span style="font-size:18px;font-weight:600;color:#ffffff;">' + display + '</span>';

  return [
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">',
    '<tr>',
    '<td style="padding:14px 18px;border-bottom:1px solid #1E3A8A;">',
    '<span style="display:block;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#f59e0b;line-height:1.3;margin-bottom:6px;">' + escapeHtml(label) + '</span>',
    valueHtml,
    '</td></tr></table>',
  ].join('');
}

function ctaButton(href, label) {
  return [
    '<a href="', href, '" style="display:inline-block;background:#CC2936;color:#ffffff;',
    'text-decoration:none;font-size:18px;font-weight:800;padding:16px 32px;',
    'border-radius:999px;line-height:1.2;">',
    label,
    '</a>',
  ].join('');
}

function linkStyle() {
  return 'color:#f59e0b;text-decoration:none;font-weight:700;';
}

function formatFormType(formType) {
  if (formType === 'trial-booking-modal') return '2-Week Trial Modal';
  if (formType === 'trial-booking-contact') return 'Contact Page 2-Week Trial Booking';
  return 'Form Submission';
}

function formatDate(iso) {
  if (!iso) return new Date().toLocaleString('en-US', { timeZone: 'America/Denver' });
  try {
    return new Date(iso).toLocaleString('en-US', { timeZone: 'America/Denver', dateStyle: 'medium', timeStyle: 'short' });
  } catch (e) {
    return iso;
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
