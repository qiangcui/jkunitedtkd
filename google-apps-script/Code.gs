/**
 * JK United TKD — Form Email Handler
 *
 * IMPORTANT: Do NOT open this file from Google Drive.
 * Copy-paste this code into https://script.google.com (New project).
 *
 * Setup (gloriacloudco@gmail.com):
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

var RECIPIENT_EMAIL = 'gloriacloudco@gmail.com';
var SITE_URL = 'https://jkunitedtkd.vercel.app';
var STUDIO_PHONE = '720-900-4546';
var STUDIO_EMAIL = 'info@jkunitedtkd.com';

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
 * Authorizes Gmail and sends a test email to gloriacloudco@gmail.com.
 */
function testSetup() {
  var testData = {
    formType: 'trial-booking-contact',
    program: 'Children (Ages 7-12)',
    parentName: 'Test Parent',
    studentName: 'Test Student',
    studentAge: '8',
    phone: '720-900-4546',
    email: 'gloriacloudco@gmail.com',
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
  var subject = '[JK United TKD] New Trial Request - ' + (data.parentName || 'Website Visitor');

  var plainBody = [
    'New trial booking from JK United TKD website',
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
  var subject = 'Your Free Trial Request - JK United Taekwondo';

  var plainBody = [
    'Hi ' + firstName + ',',
    '',
    'Thank you for requesting a free 1-week trial at JK United Taekwondo!',
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
  var leftRows = [
    compactField('Source', formLabel),
    compactField('Program', data.program),
    compactField('Contact', data.parentName),
    compactField('Student', data.studentName),
    compactField('Age', data.studentAge),
  ].join('');

  var rightRows = [
    compactField('Phone', data.phone, true),
    compactField('Email', data.email, true),
    compactField('Notes', data.notes),
    compactField('Submitted', formatDate(data.submittedAt)),
  ].join('');

  return wrapEmailHtml({
    preheader: 'New trial request from ' + (data.parentName || 'website visitor'),
    badge: 'New Submission',
    title: 'Trial Booking Received',
    subtitle: 'New free trial request on the website.',
    bodyContent: twoColumnTable(leftRows, rightRows),
    cta: data.phone
      ? '<a href="tel:' + escapeHtml(data.phone.replace(/\D/g, '')) + '" style="' + linkStyle() + '">Call ' + escapeHtml(data.phone) + '</a>'
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
    preheader: 'We received your free trial request - JK United TKD',
    badge: 'Request Confirmed',
    title: 'Thank You, ' + escapeHtml(firstName) + '!',
    subtitle: 'We received your request and will contact you within 24 hours.',
    bodyContent: singleColumnTable(rows),
    cta:
      '<a href="tel:7209004546" style="' + linkStyle() + '">Call ' + STUDIO_PHONE + '</a>' +
      ' &nbsp;|&nbsp; ' +
      '<a href="' + SITE_URL + '" style="' + linkStyle() + '">Visit Website</a>',
    footer: 'JK United TKD · 22651 E Aurora Pkwy Unit A-8, Aurora, CO 80016',
  });
}

function wrapEmailHtml(opts) {
  return [
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
    '<title>JK United TKD</title></head>',
    '<body style="margin:0;padding:0;background:#0A1128;font-family:Arial,Helvetica,sans-serif;">',
    '<div style="display:none;max-height:0;overflow:hidden;">' + escapeHtml(opts.preheader) + '</div>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A1128;padding:12px 8px;">',
    '<tr><td align="center">',
    '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">',

    // Header
    '<tr><td style="background:linear-gradient(135deg,#CC2936 0%,#1E3A8A 100%);border-radius:8px 8px 0 0;padding:14px 16px;text-align:center;">',
    '<p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.85);">' + escapeHtml(opts.badge) + '</p>',
    '<h1 style="margin:0;font-size:18px;font-weight:800;color:#ffffff;line-height:1.25;">' + opts.title + '</h1>',
    '</td></tr>',

    // Body
    '<tr><td style="background:#0D1B3E;border-left:1px solid #1E3A8A;border-right:1px solid #1E3A8A;padding:14px 16px;">',
    '<p style="margin:0 0 12px;font-size:13px;line-height:1.4;color:#cbd5e1;">' + opts.subtitle + '</p>',
    opts.bodyContent,
    opts.cta ? '<p style="margin:12px 0 0;font-size:13px;text-align:center;">' + opts.cta + '</p>' : '',
    '</td></tr>',

    // Footer
    '<tr><td style="background:#0A1128;border:1px solid #1E3A8A;border-top:none;border-radius:0 0 8px 8px;padding:10px 16px;text-align:center;">',
    '<p style="margin:0;font-size:11px;line-height:1.4;color:#64748b;">' + opts.footer + '</p>',
    '</td></tr>',

    '</table></td></tr></table></body></html>',
  ].join('');
}

function twoColumnTable(leftRows, rightRows) {
  return [
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A1128;border:1px solid #1E3A8A;border-radius:6px;">',
    '<tr>',
    '<td width="50%" valign="top" style="border-right:1px solid #1E3A8A;">', leftRows, '</td>',
    '<td width="50%" valign="top">', rightRows, '</td>',
    '</tr></table>',
  ].join('');
}

function singleColumnTable(rows) {
  return [
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A1128;border:1px solid #1E3A8A;border-radius:6px;">',
    rows,
    '</table>',
  ].join('');
}

function compactField(label, value, isLink) {
  var display = value ? escapeHtml(String(value)) : '<span style="color:#64748b;">-</span>';
  var valueHtml = value && isLink
    ? '<a href="' + (label === 'Phone' ? 'tel:' + String(value).replace(/\D/g, '') : 'mailto:' + escapeHtml(String(value))) + '" style="color:#f1f5f9;text-decoration:none;">' + display + '</a>'
    : display;

  return [
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">',
    '<tr>',
    '<td style="padding:6px 10px;border-bottom:1px solid #1E3A8A;">',
    '<span style="display:block;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#CC2936;line-height:1.2;">' + escapeHtml(label) + '</span>',
    '<span style="display:block;font-size:13px;color:#f1f5f9;line-height:1.3;margin-top:2px;">' + valueHtml + '</span>',
    '</td></tr></table>',
  ].join('');
}

function linkStyle() {
  return 'color:#CC2936;text-decoration:none;font-weight:700;';
}

function formatFormType(formType) {
  if (formType === 'trial-booking-modal') return 'Free Trial Modal';
  if (formType === 'trial-booking-contact') return 'Contact Page Trial Booking';
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
