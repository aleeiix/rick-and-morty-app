import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.scss'],
})
export class HomeItemComponent {
  @Input() link: string[] = [];
  @Input() imageUrl: string = '';
  @Input() text: string = '';

  constructor() {}
}
