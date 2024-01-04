import { NgModule } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";

const matModules = [
  MatSidenavModule,
];

@NgModule({
  declarations: [],
  imports: [matModules],
  exports: [matModules]
})
export class MaterialModule { }
