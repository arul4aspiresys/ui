import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-top-center',
      timeOut: 3000,
      closeButton: true,
    }),
  ],
  exports: [
    
  ]
})
export class SharedServicesModule { }
