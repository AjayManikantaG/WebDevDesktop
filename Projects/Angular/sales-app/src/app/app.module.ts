import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { EmployeeService } from './employee.service';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent, TestComponent, EmployeeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
