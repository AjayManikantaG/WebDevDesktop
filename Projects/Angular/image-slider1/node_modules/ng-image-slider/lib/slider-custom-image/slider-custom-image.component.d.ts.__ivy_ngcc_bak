import { OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgImageSliderService } from './../ng-image-slider.service';
export declare class SliderCustomImageComponent implements OnChanges {
    imageSliderService: NgImageSliderService;
    private sanitizer;
    YOUTUBE: string;
    IMAGE: string;
    VIDEO: string;
    fileUrl: SafeResourceUrl;
    fileExtension: string;
    type: string;
    showVideo: boolean;
    videoAutoPlay: boolean;
    showVideoControls: number;
    currentImageIndex: number;
    imageIndex: number;
    speed: number;
    imageUrl: any;
    isVideo: boolean;
    alt: String;
    title: String;
    direction: string;
    ratio: boolean;
    constructor(imageSliderService: NgImageSliderService, sanitizer: DomSanitizer, document: any);
    ngOnChanges(changes: SimpleChanges): void;
    setUrl(): void;
    videoClickHandler(event: any): void;
}
