import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  SITE_CONTACT,
  WEB3FORMS_ACCESS_KEY,
  INQUIRY_TOPIC_LABEL,
  InquiryTopic,
  topicFromQueryParam,
  buildComposeHandoffUrl,
  buildWhatsAppHref,
  telHref,
} from '../config/site-contact.config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit, OnDestroy {
  readonly contact = SITE_CONTACT;
  readonly telHref = telHref();
  readonly topicLabels = INQUIRY_TOPIC_LABEL;
  /** True when Web3Forms key is set — messages are delivered without opening the mail app */
  readonly serverSendConfigured = WEB3FORMS_ACCESS_KEY.trim().length > 0;

  inquiryTopic: InquiryTopic = 'general';

  name = '';
  email = '';
  message = '';

  submitError: string | null = null;
  submitSuccess: string | null = null;
  sending = false;

  private routeSub?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParamMap.subscribe((params) => {
      this.inquiryTopic = topicFromQueryParam(params.get('topic'));
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private buildMessageBody(): string {
    const lines = [
      `Topic: ${INQUIRY_TOPIC_LABEL[this.inquiryTopic]}`,
      '',
      `Name: ${this.name.trim()}`,
      `Reply email: ${this.email.trim()}`,
      '',
      'Message:',
      this.message.trim(),
      '',
      '---',
      `Phone (site): ${SITE_CONTACT.phoneDisplay}`,
    ];
    return lines.join('\n');
  }

  sendViaEmail(): void {
    this.submitError = null;
    this.submitSuccess = null;
    if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
      this.submitError = 'Please fill in your name, email, and message.';
      return;
    }

    const subject = `Brave Souls — ${INQUIRY_TOPIC_LABEL[this.inquiryTopic]}`;
    const body = this.buildMessageBody();
    const key = WEB3FORMS_ACCESS_KEY.trim();

    if (key) {
      this.sending = true;
      this.http
        .post<{ success?: boolean; message?: string }>('https://api.web3forms.com/submit', {
          access_key: key,
          subject,
          name: this.name.trim(),
          email: this.email.trim(),
          from_name: this.name.trim(),
          reply_to: this.email.trim(),
          message: body,
        })
        .subscribe({
          next: (res) => {
            this.sending = false;
            if (res && res.success === true) {
              this.submitSuccess = 'Thank you — your message was sent. We will reply soon.';
              this.name = '';
              this.email = '';
              this.message = '';
            } else {
              this.submitError =
                (res && typeof res.message === 'string' && res.message) ||
                'Could not send. Try again or use WhatsApp.';
            }
          },
          error: () => {
            this.sending = false;
            this.submitError = 'Could not send. Check your connection, or use “Open in email app” below.';
          },
        });
      return;
    }

    const href = buildComposeHandoffUrl(this.email.trim(), subject, body);
    if (href.startsWith('mailto:')) {
      window.location.href = href;
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  }

  /** When Web3Forms is not configured: open compose without sending from our server */
  openInEmailAppInstead(): void {
    this.submitError = null;
    this.submitSuccess = null;
    if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
      this.submitError = 'Please fill in your name, email, and message first.';
      return;
    }
    const subject = `Brave Souls — ${INQUIRY_TOPIC_LABEL[this.inquiryTopic]}`;
    const body = this.buildMessageBody();
    const href = buildComposeHandoffUrl(this.email.trim(), subject, body);
    if (href.startsWith('mailto:')) {
      window.location.href = href;
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  }

  /** Same text as email, opens WhatsApp to the configured number */
  sendViaWhatsApp(): void {
    this.submitError = null;
    if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
      this.submitError = 'Please fill in your name, email, and message.';
      return;
    }
    window.open(buildWhatsAppHref(this.buildMessageBody()), '_blank', 'noopener,noreferrer');
  }
}
