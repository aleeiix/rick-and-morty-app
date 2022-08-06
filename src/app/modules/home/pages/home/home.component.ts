import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  items = [
    {
      text: 'Characters',
      link: ['/characters'],
      imageUrl: '/assets/images/characters.jpg',
    },
    {
      text: 'Locations',
      link: ['/locations'],
      imageUrl: '/assets/images/locations.jpg',
    },
    {
      text: 'Episodes',
      link: ['/episodes'],
      imageUrl: '/assets/images/episodes.jpg',
    },
  ];

  constructor() {}
}
