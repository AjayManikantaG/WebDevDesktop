import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { DealersComponent } from './dealers/dealers.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SalesComponent } from './sales/sales.component';
import { PostDealersComponent } from './post-dealers/post-dealers.component';
import { PostSalesComponent } from './post-sales/post-sales.component';

@NgModule({
  declarations: [AppComponent, routingComponents, PagenotfoundComponent, SalesComponent, PostDealersComponent, PostSalesComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
