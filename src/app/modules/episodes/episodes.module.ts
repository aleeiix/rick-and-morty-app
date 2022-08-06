import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodesRoutingModule } from './episodes-routing.module';
import { EpisodesListComponent } from './pages/episodes-list/episodes-list.component';

@NgModule({
  declarations: [EpisodesListComponent],
  imports: [CommonModule, EpisodesRoutingModule],
})
export class EpisodesModule {}
