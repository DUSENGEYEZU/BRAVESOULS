/**
 * Site-wide contact targets. Edit this file to change email and phone everywhere they are used.
 */
export const SITE_CONTACT = {
  /** Inbound messages from the website (mailto + form handoff) */
  email: 'mufukuzij@gmail.com',

  /** Shown in the UI (spaces optional) */
  phoneDisplay: '+250 788 675 638',

  /**
   * E.164 for tel:, SMS, WhatsApp (Rwanda: +250 and national number without leading 0).
   */
  phoneE164: '+250788675638',
} as const;

/**
 * Real inbox delivery (static sites cannot send SMTP by themselves).
 * 1. Create a free key at https://web3forms.com (use the same email as `SITE_CONTACT.email`).
 * 2. Paste the access key here. Submissions are POSTed to Web3Forms and emailed to you.
 * 3. Leave empty to only open Gmail/Yahoo/mailto — then you must click Send in the mail window.
 */
export const WEB3FORMS_ACCESS_KEY = '9ff1a565-99be-4d25-9503-78a4f8b98259';
// https://web3forms.com
export type InquiryTopic = 'general' | 'coaching' | 'consultation' | 'partnership';

export const INQUIRY_TOPIC_LABEL: Record<InquiryTopic, string> = {
  general: 'General inquiry',
  coaching: 'Apply for Coaching',
  consultation: 'Book a Consultation',
  partnership: 'Partner With Us',
};

/** `topic` query param value → InquiryTopic */
export function topicFromQueryParam(param: string | null): InquiryTopic {
  if (param === 'coaching' || param === 'consultation' || param === 'partnership') {
    return param;
  }
  return 'general';
}

export function buildMailtoHref(subject: string, body: string): string {
  return `mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Guess web-mail provider from the visitor's own email (the "Your Email" field).
 * Used so Gmail users open Gmail compose, Yahoo users open Yahoo, etc. — instead of
 * whatever desktop default `mailto:` is (often Yahoo Mail if that is the OS default).
 */
export function webMailProviderFromVisitorEmail(visitorEmail: string): 'gmail' | 'yahoo' | 'outlook' | 'other' {
  const domain = visitorEmail.split('@')[1]?.toLowerCase().trim() ?? '';
  const map: Record<string, 'gmail' | 'yahoo' | 'outlook'> = {
    'gmail.com': 'gmail',
    'googlemail.com': 'gmail',
    'yahoo.com': 'yahoo',
    'ymail.com': 'yahoo',
    'rocketmail.com': 'yahoo',
    'yahoo.co.uk': 'yahoo',
    'yahoo.fr': 'yahoo',
    'outlook.com': 'outlook',
    'hotmail.com': 'outlook',
    'live.com': 'outlook',
    'msn.com': 'outlook',
    'hotmail.co.uk': 'outlook',
  };
  return map[domain] ?? 'other';
}

/**
 * Opens the right compose screen: web URL for known providers, otherwise `mailto:` (default app).
 */
export function buildComposeHandoffUrl(visitorEmail: string, subject: string, body: string): string {
  const to = SITE_CONTACT.email;
  const su = encodeURIComponent(subject);
  const bd = encodeURIComponent(body);
  const toEnc = encodeURIComponent(to);
  const provider = webMailProviderFromVisitorEmail(visitorEmail);

  switch (provider) {
    case 'gmail':
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${toEnc}&su=${su}&body=${bd}`;
    case 'yahoo':
      return `https://compose.mail.yahoo.com/?to=${toEnc}&subject=${su}&body=${bd}`;
    case 'outlook':
      return `https://outlook.live.com/mail/0/deeplink/compose?to=${toEnc}&subject=${su}&body=${bd}`;
    default:
      return buildMailtoHref(subject, body);
  }
}

/** WhatsApp click-to-chat; message prefilled when possible */
export function buildWhatsAppHref(message: string): string {
  const digits = SITE_CONTACT.phoneE164.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function telHref(): string {
  return `tel:${SITE_CONTACT.phoneE164}`;
}
