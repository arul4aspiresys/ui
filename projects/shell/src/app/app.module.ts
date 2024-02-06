import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NavToolBarComponent } from './core/components/nav-tool-bar/nav-tool-bar.component';
import { MenuItemComponent } from './core/components/menu-item/menu-item.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './core/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule, StoreModule, AuthEffects, authReducer } from 'store-lib';
import { HttpErrorInterceptorService } from './core/services/http-error-interceptor.service';
import { SharedServicesModule } from 'shared-services';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavToolBarComponent,
    MenuItemComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    NgxPermissionsModule.forRoot({
      permissionsIsolate: true,
      rolesIsolate: true,
    }),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot({auth: authReducer}),
    SharedServicesModule.forRoot({ apiUrl: environment.apiURL }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
