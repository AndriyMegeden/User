import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { AuthGuard } from '@core/auth-service/guards/auth.guard';
import { AuthInterceptor } from '@core/auth-service/services/auth.interceptor';
import { ComponentsModule } from "./theme/components/components.module";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const INTERCEPTOR_POVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
}

@NgModule({
    declarations: [AppComponent],
    imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
        defaultLanguage: 'en', // Default language
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    ComponentsModule
],
    providers: [
        INTERCEPTOR_POVIDER,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
