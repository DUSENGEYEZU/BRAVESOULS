import { Component } from '@angular/core';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrl: './what-we-do.component.scss'
})
export class WhatWeDoComponent {
  programCategories = [
    {
      title: 'Fitness Programs',
      iconClass: 'fas fa-dumbbell',
      items: [
        'Personal Training',
        'Group Fitness Classes',
        'Weight Loss Programs',
        'Muscle Toning & Strength Training',
        'Functional Movement Training',
        'Corporate Fitness Sessions'
      ]
    },
    {
      title: 'Wellness & Mental Fitness',
      iconClass: 'fas fa-brain',
      items: [
        'Stress Management Sessions',
        'Mindfulness & Breathing Classes',
        'Mobility Training',
        'Emotional Well-Being Coaching',
        'Lifestyle Discipline Coaching'
      ]
    },
    {
      title: 'Corporate & Community Programs',
      iconClass: 'fas fa-users',
      items: [
        'Corporate Wellness Programs',
        'Monthly Wellness Challenges',
        'Fitness Camps & Bootcamps',
        'School Wellness Programs'
      ]
    }
  ];
}
