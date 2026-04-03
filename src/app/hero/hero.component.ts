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

  /**
   * High-res PNG (1978×1358) with srcset — sharp on retina. Do not use SVG-as-img that embeds
   * another image; browsers often omit the inner bitmap, so the logo vanishes.
   */
  private readonly logoRasterSrc = assetPathFromBase(this.baseHref, 'assets/images/logFinal.png');
  private readonly logoFallbackSrc = assetPathFromBase(this.baseHref, 'assets/images/logFinal.png');

  logoSrc = this.logoRasterSrc;
  logoSrcset = `${this.logoRasterSrc} 1978w`;
  readonly logoSizes = '(max-width: 639px) 260px, (max-width: 767px) 300px, 340px';

  readonly heroImageSrc = assetPathFromBase(this.baseHref, 'assets/images/hero-image.png');
  readonly heroVideoSrc = assetPathFromBase(this.baseHref, 'assets/videos/bg3.mp4');

  onLogoError(): void {
    if (this.logoSrc !== this.logoFallbackSrc) {
      this.logoSrc = this.logoFallbackSrc;
      this.logoSrcset = `${this.logoFallbackSrc} 1182w`;
    }
  }
}
