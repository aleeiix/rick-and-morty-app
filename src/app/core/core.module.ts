import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';

@NgModule({
  declarations: [BaseLayoutComponent],
  imports: [CommonModule, RouterModule],
})
export class CoreModule {}
