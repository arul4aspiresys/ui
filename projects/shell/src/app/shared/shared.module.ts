import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule,    
  ],
  exports: [
    AppMaterialModule,
    ReactiveFormsModule,    
  ]
})
export class SharedModule { }
