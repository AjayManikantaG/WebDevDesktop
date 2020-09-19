<!-- @format -->

# JS-Carousel

Vanilla JS carousel for the web. [See demo](https://aprilmintacpineda.github.io/js-carousel/).

---

The carousel should be as self-sufficient as possible. Though it doesn't know and it doesn't care what you put inside in, it will do it's job the best it could. But it leaves it up to you to style whatever you put inside it. The carousel assumes that each item has width equal to the width of the container.

The carousel supports swipes to navigate around.

# Usage

## with html

Add the following inside the head tag

```html
<script src="https://www.unpkg.com/js-carousel@latest/lib/index.min.js"></script>
```

```html
<div id="carousel-container">
  <img src="https://www.anime-evo.net/wp-content/uploads/2015/10/One-Punch-Man-01-03.jpg">
  <img src="http://mangalerie.fr/wp-content/uploads/2016/01/Saitama_OK.jpg">
  <img src="https://twosensei.files.wordpress.com/2015/10/one-punch-man-02-1080p-mkv_00005.png">
  <img src="https://otakukart.com/animeblog/wp-content/uploads/2016/07/One-Punch-Man-05-Large-03.jpg">
</div>
<!-- then somewhere down below -->

<script>
  jscarousel(document.getElementById('carousel-container'), {
    animationSpeed: 500,
    itemDuration: 1500,
    swipeThreshold: 150
  });
</script>
```

The first parameter that `jscarousel` function expects is an `HTML element` that's the carousel. The second parameter is a configuration object with the following keys:

- `animationSpeed` is the speed (in terms of milliseconds) of the transition animation.
- `itemDuration` is the amount of time (in terms of milliseconds) it has to wait before transitioning to the next item.
- `swipeThreshold` is the sensitivity of swipe, the lower the number the more sensitive the swipe will be, you don't want it to be very high otherwise the users would have a hard time navigating around using swipe. You don't want it to be very low, otherwise a click might become enough to navigate around using swipe. I suggest starting at `150` and tweaking it from there according to how you like it.
- `noClone` to simulate infinite scroll, the library clones the first and the last elements, this could have unwanted effects if you are using it with ReactJS or InfernoJS. Set this configuration to `true` if you don't want this feature. This feature is being used by inferno-carousel and react-carousel. If this is set to `true`, the carousel constructor assumes that the first and last items provided are for simulating infinite scrolls. Consider using [react-carousel](https://github.com/aprilmintacpineda/react-carousel) or [inferno-carousel](https://github.com/aprilmintacpineda/inferno-carousel) so you don't need to worry about this. If you are using vanilla JS to create the elements inside the carousel as you would in the examples provided here, you don't need to use this.

## with npm

`npm i -s js-carousel`.

```html
<div id="carousel-container">
  <img src="https://www.anime-evo.net/wp-content/uploads/2015/10/One-Punch-Man-01-03.jpg">
  <img src="http://mangalerie.fr/wp-content/uploads/2016/01/Saitama_OK.jpg">
  <img src="https://twosensei.files.wordpress.com/2015/10/one-punch-man-02-1080p-mkv_00005.png">
  <img src="https://otakukart.com/animeblog/wp-content/uploads/2016/07/One-Punch-Man-05-Large-03.jpg">
</div>
```

somewhere in your js file.

```js
import jscarousel from 'js-carousel';

const stop = jscarousel(
  // targetCarousel
  document.getElementById('carousel-container'),
  // carousel config
  {
    animationSpeed: 500,
    itemDuration: 1500,
    swipeThreshold: 150
  }
);

// Later on, when I want to stop the carousel from playing.
stop();
```

By default, the carousel would stop when the `targetCarousel.parentElement` has become `null`. But you can manually stop it by calling the returned function of the `jscarousel`.

Make sure to load the js file after the target element has loaded.

## With ReactJS / InfernoJS

- [react-carousel](https://github.com/aprilmintacpineda/react-carousel)
- [inferno-carousel](https://github.com/aprilmintacpineda/inferno-carousel)
