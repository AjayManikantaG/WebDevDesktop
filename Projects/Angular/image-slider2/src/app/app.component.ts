import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';

import { SwiperDirective } from 'ngx-swiper-wrapper';


@Component({
  selector: 'app-ngx-swiper',
  templateUrl: './ngx-swiper.component.html',
  styleUrls: ['./ngx-swiper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor() {}
  isPopUp = false;
  pause = false;

  // Image object
  slides = [
    {
      type: 'image',
      src:
        'https://mytrademartstore.com/storage/img/5cac7ab27fb5a.anti_hairfall.jpg',
      thumb:
        'https://mytrademartstore.com/storage/img/5cac7ab27fb5a.anti_hairfall.jpg',
      title: '1',
    },
    {
      type: 'image',
      src: 'https://mytrademartstore.com/storage/img/5d3e8e470c4d5.cinthol.jpg',
      thumb:
        'https://mytrademartstore.com/storage/img/5d3e8e470c4d5.cinthol.jpg',
      title: '1',
    },
    {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/PEzVie6wjVI ',
      thumb: 'abc/5.png?raw=true',
      poster: 'abc/5.png?raw=true',
    },
    {
      type: 'image',
      src:
        'https://mytrademartstore.com/storage/img/5d3e8e6ac4439.fairglow.jpg',
      thumb:
        'https://mytrademartstore.com/storage/img/5d3e8e6ac4439.fairglow.jpg',
      title: '1',
    },
    {
      type: 'image',
      src:
        'https://mytrademartstore.com/storage/img/5d62d244cb50c.advayurvedahairoil.jpg',
      thumb: 'https://static.toiimg.com/photo/72975551.cms',
      title: '1',
    },
    {
      type: 'image',
      src:
        'https://mytrademartstore.com/storage/img/5f1062c2b3214.3526a77b62daa780a1688aa6c5fbb590.jpg',
      thumb:
        'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?ixlib=rb-1.2.1&w=1000&q=80',
      title: '1',
    },
    {
      type: 'video',
      src: '../../assets/lesson6.mp4',
      thumb:
        'https://pbs.twimg.com/profile_images/981311875643195393/dS0t6BQ8_400x400.jpg',
      title: '1',
      format: 'video/mp4',
    },
  ];

  galleryThumbsConfig = {
    spaceBetween: 0.1,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    calculateHeight: true,
  };
  galleryTopConfig = {
    spaceBetween: 0,
    lazy: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: undefined,
    },
  };

  galleryTopConfig1 = {
    simulateTouch: true,
    spaceBetween: 0,
    slidesPerView: 'auto',
    centeredSlides: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: true,
    thumbs: {
      swiper: undefined,
    },
    calculateHeight: true,
  };
  @ViewChild('galleryThumbs', { static: false })
  galleryThumbs?: SwiperDirective;
  @ViewChild('galleryImages2', { static: false })
  galleryImages2?: SwiperDirective;
  @ViewChild('galleryImages1', { static: false })
  galleryImages1?: SwiperDirective;

  ngAfterViewInit() {
    const imagesSwiper = this.galleryImages2.swiper();
    const imagesSwiper1 = this.galleryImages1.swiper();
    const thumbsSwiper = this.galleryThumbs.swiper();
    imagesSwiper.thumbs.swiper = thumbsSwiper;
    imagesSwiper.thumbs.init();
    imagesSwiper.thumbs.update();
  }

  ngOnInit(): void {}

  activatePopUp(currentSlide) {
    this.isPopUp = true;
    const imagesSwiper1 = this.galleryImages1.swiper();
    console.log(currentSlide);
    imagesSwiper1.slideTo(currentSlide);
  }

  removePopUp() {
    this.isPopUp = false;
    this.pause = true;

    this.slides.forEach((obj) => {
      if (obj.type === 'youtube' || obj.type === 'video') {
        let source = obj.src;
        obj.src = source + ' ';
        obj.title = '';
      }
    });
  }

}
