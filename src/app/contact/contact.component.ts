import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  SITE_CONTACT,
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

  inquiryTopic: InquiryTopic = 'general';

  name = '';
  email = '';
  message = '';

  submitError: string | null = null;

  private routeSub?: Subscription;

  constructor(private readonly route: ActivatedRoute) {}

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
    if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
      this.submitError = 'Please fill in your name, email, and message.';
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
