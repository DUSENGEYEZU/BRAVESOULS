import { Component } from '@angular/core';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrl: './what-we-do.component.scss'
})
export class WhatWeDoComponent {
  services = [
    {
      title: 'AI & Machine Learning Services',
      description: 'A small river named Duden flows by their place and supplies.',
      icon: 'assets/icons/web-design.svg',
    },
    {
      title: 'Data Solutions',
      description: 'A small river named Duden flows by their place and supplies.',
      icon: 'assets/icons/web-app.svg',
    },
    {
      title: 'Custom Software Development',
      description: 'A small river named Duden flows by their place and supplies.',
      icon: 'assets/icons/web-dev.svg',
    },
    {
      title: 'Digital Transformation Consulting',
      description: 'A small river named Duden flows by their place and supplies.',
      icon: 'assets/icons/banner.svg',
    },
    
  ];
}

