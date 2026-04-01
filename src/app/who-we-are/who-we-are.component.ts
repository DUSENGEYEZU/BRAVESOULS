import { Component, inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { assetPathFromBase } from '../utils/asset-path';

@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.scss'
})
export class WhoWeAreComponent {
  private readonly baseHref = inject(APP_BASE_HREF);
  readonly teamImageSrc = assetPathFromBase(this.baseHref, 'assets/images/team.png');
}
