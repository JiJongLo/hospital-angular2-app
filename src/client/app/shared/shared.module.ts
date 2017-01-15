import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GridComponent } from './grid/index';
import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';
import { DiagnosesListService } from './diagnoses-list/index';
import { MdDataTable } from 'ng2-material/components/data-table/index';
import { MaterialModule } from '@angular/material';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule.forRoot()],
  declarations: [ToolbarComponent,
      NavbarComponent,
      GridComponent,
      MdDataTable
  ],
  exports: [ToolbarComponent, NavbarComponent,
    CommonModule, FormsModule, RouterModule, GridComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [DiagnosesListService]
    };
  }
}
