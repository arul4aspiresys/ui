import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

export interface LibConfig {
  apiUrl: string;
}

export const LibConfigService = new InjectionToken<LibConfig>('LibConfig');

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
export class SharedServicesModule { 
  static forRoot(config: LibConfig): ModuleWithProviders<SharedServicesModule> {
    return {
      ngModule: SharedServicesModule,
      providers: [
        {
          provide: LibConfigService,
          useValue: config
        }
      ]
    };
  }
}
