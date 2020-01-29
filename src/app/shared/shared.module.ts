import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// ==============================================
//  Pipes Module
// =============================================
import { PipesModule } from '../pipes/pipes.module';


import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';




@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],

  declarations: [
    NopagefoundComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent

  ],

  exports: [
    NopagefoundComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent
  ]

})
export class SharedModule { }
