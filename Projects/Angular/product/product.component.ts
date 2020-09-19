import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { PostService } from '../services/post.service';
import { UtilService } from '../services/util.service';
import { HeaderDataService } from '../services/header-data.service';
import { RepoService } from '../services/repo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ShareService } from '@ngx-share/core';
import { MetaTagService } from '../services/meta-tag.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from '@kolkov/ngx-gallery';
import * as _ from 'lodash';
import * as $ from 'jquery';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

	public safeURL: SafeResourceUrl;

	sku; quantity; selectedRow; isEnabled; totalReviewCount;
	inv; cost_price; list_price; variant;
	name; searchName; option; gender; description; subvariant;
	slides: any = [];
	loading: boolean = true;
	permalink: string = '';
	checkoutStatus = false;
	myInterval = 5000;
	noWrapSlides = false;
	isDisabled = false;
	showSpinner = false;
	rating: any = [];

	activeTabIndex = 1;
	productRating = 0;
	newReview: string = "";
	showPostReviewBox = false;
	value: any = null;

	product: any = [];
	reviews: any = [];
	groupedAttributes: any = [];
	groupedSubAttributes: any = []; // unused attribute
	child: any = {};
	maxlimit: any = null;

	galleryOptions: NgxGalleryOptions[];
	galleryImages: NgxGalleryImage[] = [];

	ctx = {
		cartItems: []
	};

	quantityErrorMessage = "";
	quantityToAdd = 1;

	public limit = 0;
	public recperpage = 8;
	public recincrement = 8;

	constructor(private router: Router,
		private activatedRoute: ActivatedRoute,
		private postService: PostService,
		private repoService: RepoService,
		private headerDataService: HeaderDataService,
		private sanitizer: DomSanitizer,
		public share: ShareService,
		private metaTagService: MetaTagService,
		public utilService: UtilService) {

		this.activatedRoute.params.subscribe(params => {
			if (params['permalink']) {
				this.permalink = params['permalink'];
				this.getProduct();
			} else {
				this.router.navigate(['/store']);
			}
		});
	}

	ngOnInit(): void {
		this.galleryOptions = [
			{
				width: '100%',
				height: '400px',
				thumbnailsColumns: 4,
				// imageAnimation: NgxGalleryAnimation.Slide,
				imageSize: NgxGalleryImageSize.Contain,
				imageSwipe: true,
				imageArrows: true,
				thumbnailSize: NgxGalleryImageSize.Contain,
				thumbnailsSwipe: true,
				previewSwipe: true
			},
			// max-width 800
			{
				breakpoint: 800,
				width: '100%',
				height: '600px',
				imagePercent: 80,
				thumbnailsPercent: 20,
				thumbnailsMargin: 20,
				thumbnailMargin: 20
			},
			// max-width 400
			{
				breakpoint: 400,
				preview: false
			}
		];
	}

	getProduct() {
		this.value = null;
		this.loading = true;
		let paramlink = this.permalink;
		this.postService.getProductByPerm(paramlink)
			.subscribe((response: any) => {
				this.product = response.product;
				if (this.product) {
					this.afterProductInit();
				} else {
					this.loading = false;
					this.router.navigate(['/store']);
				}
				this.loading = false;
			}, (errors: any) => {
				console.log('intention error', errors);
				this.loading = false;
				this.router.navigate(['/store']);
			});
	}

	afterProductInit() {

		var metaData: Data = null;
		if (this.product.option === 'I') {
			metaData = {
				title: this.product.metatag.title,
				description: this.product.metatag.description
			}
		} else if (this.product.option === 'G') {
			metaData = {
				title: this.product.combometatag.title,
				description: this.product.combometatag.description
			}
		}
		if (metaData) {
			this.metaTagService.updateMetaTag(metaData);
		}

		this.ctx.cartItems = this.repoService.formatCart() ? this.repoService.formatCart() : [];

		let grouping = "attribute";

		this.groupedAttributes = _.values(_.groupBy(this.product.variant, grouping));

		// this.groupedAttributes = $filter('groupBy')(
		// 		this.product.variant,
		// 		grouping
		// );

		this.groupedAttributes.forEach((v, key) => {
			v.forEach((v, key) => {
				if (v.dflt == 1) {
					if (v.inventory.inv == 0) {
						this.isDisabled = true;
					}
				}
			})
		})

		if (typeof this.product.variant === 'undefined') {
			this.value = this.product.value;
		}

		this.child = this.product.child[0];

		//console.log(this.child);

		this.checkoutStatus = (this.repoService.formatCart().length > 0) ? false : true;

		var filter = _.filter(this.product.variant, { sku: this.product.sku });
		// var filter = $filter('filter')(
		// 	this.product.variant, { sku: this.product.sku }
		// );

		if (typeof this.product.inv != 'undefined') {
			if (this.product.inv == 0) {
				this.isDisabled = true;
			}
			this.inv = this.product.inv;
		} else {
			this.inv = (filter) ? filter[0].inventory.inv : 0;
		}

		this.name = this.product.name;
		this.searchName = this.product.searchName;
		this.cost_price = this.product.cost_price;
		this.list_price = this.product.list_price;
		this.option = this.product.option;
		this.sku = this.product.sku;
		this.gender = this.product.gender;
		this.description = (typeof this.product.description === 'undefined') ? this.product.combodescription : this.product.description;
		this.slides = (typeof this.product.image === 'undefined') ? this.product.comboimage : this.product.image;
		this.quantity = this.calcTotalCountBySKU();
		this.rating = this.product.rating;
		this.variant = this.product.variant;
		this.subvariant = this.product.subvariant;
		//this.opt = this.product.option;

		if (this.slides) {
			this.slides.forEach(slide => {
				// this.galleryImages.push({
				// 	small: 'https://mytrademartstore.com' + slide.path,
				// 	medium: 'https://mytrademartstore.com' + slide.path,
				// 	big: 'https://mytrademartstore.com' + slide.path,
				// 	url: 'https://mytrademartstore.com' + slide.path
				// });

				if (slide.image == 0) {
					slide.trustSrc = this.trustAsResourceUrl(slide.path + '?rel=0&enablejsapi=1&playlist=' + (+slide.filename ? +slide.filename : ''));
				}
				if (slide.image == 1) {
					// http://localhost:8000
					slide.trustSrc = 'https://mytrademartstore.com' + slide.path;
					// slide.trustSrc = this.trustAsResourceUrl('http://localhost:8000'+slide.path);
				}
			});
		}

		this.initReview();

		// $rootScope.$broadcast('shoppingCartWasUpdated', this.calcTotalCount()); 	
	}

	initReview() {
		$('body').css({ 'overflowY': 'hidden' });
		//this.loading = true;

		this.postService.getReviews(this.permalink, this.recperpage)
			.subscribe((response: any) => {
				if (response) {
					this.reviews = response.reviews;
					this.maxlimit = response.maxlimit;
					this.totalReviewCount = response.total;
					this.isEnabled = (this.recperpage >= this.maxlimit) ? true : false;
					// $('body').css({'overflowY':'scroll'});
					$('body').css({ 'overflowY': 'auto' });
					//this.loading = false;
				}
			}, (errors: any) => {
				this.reviews = [];
				// $('body').css({'overflowY':'scroll'});
				$('body').css({ 'overflowY': 'auto' });
				//this.loading = false;
			});
	}

	loadMore() {
		this.recperpage += this.recincrement;
		this.limit = this.recperpage;
		$('body').css({ 'overflowY': 'hidden' });
		this.showSpinner = true;

		this.postService.getReviews(this.permalink, this.recperpage)
			.subscribe((response: any) => {
				if (response) {
					for (var i = 0; i < response.reviews.length; i++) {
						this.reviews.push(response.reviews[i]);
					}
					this.isEnabled = (this.recperpage >= this.maxlimit) ? true : false;
					// $('body').css({'overflowY':'scroll'});
					$('body').css({ 'overflowY': 'auto' });
					this.showSpinner = false;
				}
			}, (errors: any) => {
				this.reviews = [];
				// $('body').css({'overflowY':'scroll'});
				$('body').css({ 'overflowY': 'auto' });
				this.showSpinner = false;
			});
	}

	navCategory(permalink, name, filter) {
		// this.headerDataService.changeFilter(filter);
		this.router.navigate(['/category', permalink]);
	}

	updatePrice(value, attrs) {

		// var filter = $filter('filter')(attrs, { dflt:1 });
		// if(filter){	filter[0].dflt=0; value.dflt = 1;}
		console.log('update price');

		if (value.inventory.inv == 0) {
			this.isDisabled = true;
		} else {
			this.isDisabled = false;
		}

		this.product.cost_price = value.cost_price * value.qty;
		this.product.list_price = value.list_price * value.qty;
		this.product.sku = value.sku;

		this.inv = value.inventory.inv;

		this.cost_price = value.cost_price * value.qty;
		this.list_price = value.list_price * value.qty;
		this.sku = value.sku;

		this.quantity = this.calcTotalCountBySKU();
		this.variant = this.product.variant;
	}

	updateSubAttribute(value, attrs) {
		var filter = _.filter(attrs, { dflt: 1 });
		if (filter) {
			if (filter[0]) { filter[0].dflt = 0; }
			value.dflt = 1;
		} else {
			value.dflt = 1;
		}
	}

	roundedPercentage(listPrice, costPrice) {
		var result = ((listPrice / costPrice) * 100);
		return (100 - Math.round(result));
	}

	calcTotalCount() {
		var totalCount = 0;
		for (var i = 0; i < this.ctx.cartItems.length; i++) {
			var item = this.ctx.cartItems[i];
			totalCount += item.quantity;
		}
		return totalCount;
	}

	calcTotalCountBySKU() {
		var totalCount = 0;
		for (var i = 0; i < this.ctx.cartItems.length; i++) {
			var item = this.ctx.cartItems[i];
			if (item.sku == this.sku) {
				totalCount += item.quantity;
			}
		}
		return totalCount;
	}

	minusQty() {
		this.quantityToAdd = this.quantityToAdd - 1;
		// for (var i = 0; i < this.ctx.cartItems.length; i++) {
		// 	var item = this.ctx.cartItems[i];
		// 	if (item.sku === this.sku) {
		// 		item.quantity--;
		// 		this.quantity = item.quantity;
		// 		if (item.quantity === 0) {
		// 			this.ctx.cartItems.splice(i, 1);
		// 			this.repoService.updateCart(this.ctx.cartItems);
		// 		} else {
		// 			this.repoService.updateCart(this.ctx.cartItems);
		// 		}
		// 	}
		// }
		// this.checkoutStatus = (this.repoService.formatCart().length > 0) ? false : true;
		//$rootScope.$broadcast('shoppingCartWasUpdated', this.calcTotalCount());
	}

	plusQty() {
		this.quantityToAdd = this.quantityToAdd + 1;
		// this.quantity = 1;
		// if (this.calcTotalCountBySKU() == 0) {
		// 	this.ctx.cartItems.push({
		// 		sku: this.sku,
		// 		quantity: 1
		// 	});
		// 	this.repoService.updateCart(this.ctx.cartItems);
		// } else {
		// 	for (var i = 0; i < this.ctx.cartItems.length; i++) {
		// 		var item = this.ctx.cartItems[i];
		// 		if (item.sku === this.sku) {
		// 			item.quantity++;
		// 			this.quantity = item.quantity;

		// 			item.total_price = item.unit_price * item.quantity;
		// 			item.total_price = item.total_price.toFixed(2);

		// 			this.repoService.updateCart(this.ctx.cartItems);
		// 		}
		// 	}
		// }
		// this.checkoutStatus = (this.repoService.formatCart().length > 0) ? false : true;
		//$rootScope.$broadcast('shoppingCartWasUpdated', this.calcTotalCount()); 

	}

	addToCart() {
		this.quantityErrorMessage = "";
		if (this.quantity == 0) {
			if (this.quantityToAdd > 0 && this.quantityToAdd <= 10) {
				this.ctx.cartItems.push({
					sku: this.sku,
					quantity: this.quantityToAdd
				});
				this.quantity = this.quantity + this.quantityToAdd;
				this.repoService.updateCart(this.ctx.cartItems);
			} else {
				this.quantityErrorMessage = "You have reached maximum quantity allowed";
			}
		} else {
			for (var i = 0; i < this.ctx.cartItems.length; i++) {
				var item = this.ctx.cartItems[i];
				if (item.sku === this.sku) {

					var updatedCartItems = 0;
					updatedCartItems = this.quantity + this.quantityToAdd;

					if (updatedCartItems > 0 && updatedCartItems <= 10) {
						if (this.quantity == 0) {
							this.ctx.cartItems.push({
								sku: this.sku,
								quantity: updatedCartItems
							});
						} else {
							this.quantity = updatedCartItems;
							item.quantity = updatedCartItems;
						}
						this.repoService.updateCart(this.ctx.cartItems);
					} else if (updatedCartItems > 10) {
						this.quantityErrorMessage = "You have reached maximum quantity allowed";
					}
				}
			}
		}
		this.checkoutStatus = (this.repoService.formatCart().length > 0) ? false : true;
		// $rootScope.$broadcast('shoppingCartWasUpdated', this.calcTotalCount());
	}

	onChangeRating() {

	}

	ratingChanged(star) {
		this.productRating = star;
	}

	cancelRating() {
		this.showPostReviewBox = false;
		this.newReview = "";
		this.productRating = 0;
	}

	fnInitOnCarousel() {
		// angular.element("#myCarousel").on('slide.bs.carousel', function (e) {
		//    var currentSlide = angular.element("#myCarousel").find(".item.active");
		//    if(currentSlide.find("iframe").length){
		// 	   var player = currentSlide.find("iframe").get(0);
		// 	   this.stopVideo(player);
		//    }
		// });
	}

	stopVideo(player) {
		this.postMessageToPlayer(player, {
			"event": "command",
			"func": "pauseVideo"
		});
	}

	private postMessageToPlayer(player, command) {
		if (player == null || command == null) return;
		player.contentWindow.postMessage(JSON.stringify(command), "*");
	}

	formatLabel(value) {
		var arr = [];
		arr = value.split('-');
		return arr[1];
	}

	trustAsResourceUrl(url) {
		// 	return $sce.trustAsResourceUrl(url);
		this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
		// console.log(this.safeURL);
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);;
	}

}
