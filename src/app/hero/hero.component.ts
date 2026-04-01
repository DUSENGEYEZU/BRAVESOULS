import { Component, inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { assetPathFromBase } from '../utils/asset-path';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  private readonly baseHref = inject(APP_BASE_HREF);

  /** Primary logo; falls back to logo.png in template if this fails to load */
  logoSrc = assetPathFromBase(this.baseHref, 'assets/images/logcorrect.jpeg');
  private readonly logoFallbackSrc = assetPathFromBase(this.baseHref, 'assets/images/logo.png');

  readonly heroImageSrc = assetPathFromBase(this.baseHref, 'assets/images/hero-image.png');
  readonly heroVideoSrc = assetPathFromBase(this.baseHref, 'assets/videos/bg3.mp4');

  onLogoError(): void {
    if (this.logoSrc !== this.logoFallbackSrc) {
      this.logoSrc = this.logoFallbackSrc;
    }
  }
}
