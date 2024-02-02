import { NgModule } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

const matModules = [
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  exports: [matModules]
})
export class AppMaterialModule { }
