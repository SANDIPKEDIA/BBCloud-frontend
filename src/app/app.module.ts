import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { NotificationsService } from "./providers/communication.service";
import { TokenInterceptor } from "../core/interceptors/token.interceptor";
import { JwtInterceptor } from "../core/interceptors/jwt.interceptor";
import { SocketService  } from "./providers/socket.service";
import { OrderIncomingPage } from './modal/order-incoming';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Push, PushObject } from '@ionic-native/push/ngx';
import { AccountService } from './providers/account.service';
import { FinanceService } from './providers/finance.service';
import { FirstComponent } from './first/first.component';
import { UsersService } from './users.service';
import { NoteManagementService } from './providers/note-management.service';

 
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
      IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent,OrderIncomingPage,FirstComponent],
  providers: [InAppBrowser ,FileTransfer,SplashScreen,SocketService, StatusBar,SocialSharing,UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    NotificationsService,BackgroundMode,Vibration,
    Push,
    AccountService,
    FinanceService,
    NoteManagementService

  ],
  bootstrap: [AppComponent],
  entryComponents:[OrderIncomingPage]
})

export class AppModule {}
