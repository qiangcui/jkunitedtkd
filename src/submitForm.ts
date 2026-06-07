export interface TrialFormPayload {
  formType: 'trial-booking-contact' | 'trial-booking-modal';
  program: string;
  parentName: string;
  studentName: string;
  studentAge: string;
  phone: string;
  email: string;
  notes: string;
}

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string | undefined;

export async function submitTrialForm(payload: TrialFormPayload): Promise<void> {
  if (!SCRIPT_URL) {
    throw new Error('Form is not configured yet. Add VITE_GOOGLE_APPS_SCRIPT_URL to .env');
  }

  if (!SCRIPT_URL.includes('script.google.com/macros/s/') || !SCRIPT_URL.endsWith('/exec')) {
    throw new Error('Invalid Apps Script URL. It must end with /exec (not a Google Drive link).');
  }

  // Apps Script web apps return a redirect after POST. Using no-cors is the
  // reliable way to submit from the browser — the script still receives the data.
  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      site: 'JK United TKD',
    }),
  });
}
