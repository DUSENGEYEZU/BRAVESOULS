import { Component } from '@angular/core';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrl: './what-we-do.component.scss'
})
export class WhatWeDoComponent {
  services = [
    {
      title: 'Web Design',
      description: 'A small river named Duden flows by their place and supplies.',
      icon: 'assets/icons/web-design.svg',
    },
    {
      title: 'Web Application',
      description: 'A small river named Duden flows by their place and supplies.',
      icon: 'assets/icons/web-app.svg',
    },
    {
      title: 'Web Development',
      description: 'A small river named Duden flows by their place and supplies.',
      icon: 'assets/icons/web-dev.svg',
    },
    {
      title: 'Banner Design',
      description: 'A small river named Duden flows by their place and supplies.',
      icon: 'assets/icons/banner.svg',
    },
    {
      title: 'Branding',
      description: 'A small river named Duden flows by their place and supplies.',
      icon: 'assets/icons/branding.svg',
    },
    {
      title: 'Icon Design',
      description: 'A small river named Duden flows by their place and supplies.',
      icon: 'assets/icons/icon.svg',
    },
    {
      title: 'Graphic Design',
      description: 'A small river named Duden flows by their place and supplies.',
      icon: 'assets/icons/graphic.svg',
    },
    {
      title: 'SEO',
      description: 'A small river named Duden flows by their place and supplies.',
      icon: 'assets/icons/seo.svg',
    },
  ];
}

