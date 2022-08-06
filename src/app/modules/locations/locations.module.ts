import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsListComponent } from './pages/locations-list/locations-list.component';

@NgModule({
  declarations: [LocationsListComponent],
  imports: [CommonModule, LocationsRoutingModule],
})
export class LocationsModule {}
