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
    description: 'Building AI systems tailored to your data and needs.',
    iconClass: 'fas fa-robot'
  },
  {
    title: 'Data Solutions',
    description: 'Manage, analyze, and unlock value from your data.',
    iconClass: 'fas fa-database'
  },
  {
    title: 'Custom Software Development',
    description: 'Bespoke apps, platforms, and tools that scale.',
    iconClass: 'fas fa-code'
  },
  {
    title: 'Digital Transformation Consulting',
    description: 'Upgrade your workflows, tech, and strategies.',
    iconClass: 'fas fa-lightbulb'
  }
];

}

