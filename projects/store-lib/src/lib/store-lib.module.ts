import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './state/auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { SharedServicesModule } from 'shared-services';


@NgModule({
  imports: [    
    StoreModule.forRoot({auth: authReducer}),
    EffectsModule.forRoot([AuthEffects]),
    SharedServicesModule.forRoot({ apiUrl: 'http://localhost:4000/users' }),
  ],
  exports: [
    
  ]
})
export class StoreLibModule { }
