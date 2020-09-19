/** @format */

import { SafePipe } from "./safe.pipe";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgxSwiperComponent } from "./ngx-swiper/ngx-swiper.component";
import {
  SwiperModule,
  SwiperConfigInterface,
  SWIPER_CONFIG,
} from "ngx-swiper-wrapper";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: "horizontal",
  slidesPerView: "auto",
};

@NgModule({
  declarations: [AppComponent, NgxSwiperComponent, SafePipe],
  imports: [BrowserModule, SwiperModule],
  providers: [{ provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }],
  bootstrap: [AppComponent],
})
export class AppModule {}
