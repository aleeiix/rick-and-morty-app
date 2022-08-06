import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HomeItemComponent } from './components/home-item/home-item.component';

@NgModule({
  declarations: [HomeComponent, HomeItemComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
