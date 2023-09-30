import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LayoutCleanComponent } from './components/layout-clean/layout-clean.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { SortableDirective } from './sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LayoutCleanComponent,
    DashboardComponent,
    LoginComponent,
    SortableDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    QuestionnairesModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
