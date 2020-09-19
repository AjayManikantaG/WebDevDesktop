'use strict';

/** @format */

window.jscarousel = function (targetCarousel, config) {
  function navigateToNextItem() {
    var transform = 'translate(-' + currentPage * containerWidth + 'px, 0)';

    itemsWrapper.style.webkitTransform = transform;
    itemsWrapper.style.MozTransform = transform;
    itemsWrapper.style.msTransform = transform;
    itemsWrapper.style.OTransform = transform;
    itemsWrapper.style.transform = transform;
  }

  function simulateInfiniteScroll(resetPage) {
    currentPage = resetPage;
    // disable animation
    itemsWrapper.style.transition = '';
    navigateToNextItem();
  }

  function playCarousel() {
    if (!hasBeenStopped) {
      carouselPlayer = setTimeout(function () {
        if (!isPlaying && targetCarousel.parentElement) {
          isPlaying = true;
          var shouldReset = false;
          lastPage = currentPage;
          currentPage = currentPage + 1;

          /**
           * when the page is on the last prepended item, navigate
           * back to the first item but don't show animation
           */
          if (currentPage === maxPage + 1) {
            shouldReset = true;
            paginationContainer.children[0].style.backgroundColor = '#4ecbf4';
          } else {
            paginationContainer.children[currentPage - 1].style.backgroundColor = '#4ecbf4';
          }

          if (paginationContainer.children[lastPage - 1]) {
            paginationContainer.children[lastPage - 1].style.backgroundColor = '#1a84a8';
          }

          // enable animation
          itemsWrapper.style.transition = transition;

          // navigate to next item
          navigateToNextItem();

          setTimeout(function () {
            isPlaying = false;
            if (shouldReset) simulateInfiniteScroll(1);
          }, config.animationSpeed + 10);

          playCarousel();
        }
      }, config.itemDuration);
    }
  }

  function resolveMouseX(ev) {
    return ev instanceof MouseEvent ? ev.clientX : ev.changedTouches[0].clientX || ev.changedTouches[0].pageX;
  }

  function swipeMove(ev) {
    if (swipeStartXPosition !== null) {
      var translate = 'translate(-' + (currentPage * containerWidth + (swipeStartXPosition - resolveMouseX(ev))) + 'px, 0)';

      itemsWrapper.style.webkitTransform = translate;
      itemsWrapper.style.MozTransform = translate;
      itemsWrapper.style.msTransform = translate;
      itemsWrapper.style.OTransform = translate;
      itemsWrapper.style.transform = translate;
    }
  }

  function swipeEnd(ev) {
    if (swipeStartXPosition !== null) {
      ev.stopPropagation();

      var shouldReset = false;

      // enable animation
      itemsWrapper.style.transition = transition;

      if (Math.abs(resolveMouseX(ev) - swipeStartXPosition) >= config.swipeThreshold) {
        lastPage = currentPage;

        if (resolveMouseX(ev) > swipeStartXPosition) {
          currentPage = currentPage - 1;
        } else {
          currentPage = currentPage + 1;
        }

        swipeStartXPosition = null;

        navigateToNextItem();

        if (currentPage === maxPage + 1) {
          paginationContainer.children[0].style.backgroundColor = '#4ecbf4';
          paginationContainer.children[lastPage - 1].style.backgroundColor = '#1a84a8';
          shouldReset = 1;
        } else if (currentPage === 0) {
          paginationContainer.children[maxPage - 1].style.backgroundColor = '#4ecbf4';
          paginationContainer.children[0].style.backgroundColor = '#1a84a8';
          shouldReset = maxPage;
        } else {
          paginationContainer.children[currentPage - 1].style.backgroundColor = '#4ecbf4';
          paginationContainer.children[lastPage - 1].style.backgroundColor = '#1a84a8';
        }
      } else {
        navigateToNextItem();
      }

      playCarousel();

      setTimeout(function () {
        isPlaying = false;
        if (shouldReset !== false) simulateInfiniteScroll(shouldReset);
      }, config.animationSpeed + 10);

      // cleaning listeners after execution
      itemsWrapper.removeEventListener('mousemove', swipeMove);
      itemsWrapper.removeEventListener('mouseout', swipeEnd);

      itemsWrapper.removeEventListener('touchmove', swipeMove);
      itemsWrapper.removeEventListener('touchend', swipeEnd);
    }
  }

  function swipeStart(ev) {
    if (!isPlaying) {
      isPlaying = true;
      clearTimeout(carouselPlayer);
      swipeStartXPosition = resolveMouseX(ev);

      // disable animation
      itemsWrapper.style.transition = '';

      // mouse
      addPassiveListener(itemsWrapper, 'mousemove', swipeMove);
      addPassiveListener(itemsWrapper, 'mouseup', swipeEnd);
      addPassiveListener(itemsWrapper, 'mouseout', swipeEnd);
      // touch
      addPassiveListener(itemsWrapper, 'touchmove', swipeMove);
      addPassiveListener(itemsWrapper, 'touchend', swipeEnd);
    }
  }

  function addPassiveListener(target, event, handler) {
    var passiveListenerIsSupported = false;

    try {
      var options = {};

      Object.defineProperty(options, 'passive', {
        get: function get() {
          passiveListenerIsSupported = true;
        }
      });

      window.addEventListener('test', options, options);
      window.removeEventListener('test', options, options);
    } catch (err) {}

    if (passiveListenerIsSupported) {
      target.addEventListener(event, handler, {
        passive: true
      });
    } else {
      target.addEventListener(event, handler);
    }
  }

  function goToPage(ev) {
    if (!isPlaying) {
      isPlaying = true;
      clearTimeout(carouselPlayer);
      lastPage = currentPage;

      for (var a = 0; a < paginationContainer.children.length; a++) {
        if (paginationContainer.children[a] === ev.target) {
          currentPage = a + 1;
          break;
        }
      }

      paginationContainer.children[lastPage - 1].style.backgroundColor = '#1a84a8';
      paginationContainer.children[currentPage - 1].style.backgroundColor = '#4ecbf4';

      // enable animation
      itemsWrapper.style.transition = transition;

      navigateToNextItem();
      isPlaying = false;
      playCarousel();
    }
  }

  var paginationContainer = document.createElement('div');
  var itemsWrapper = document.createElement('div');
  var transition = 'transform ' + config.animationSpeed + 'ms';
  // computation
  var lastPage = 0;
  var currentPage = 1;
  var maxPage = targetCarousel.children.length;
  var containerWidth = targetCarousel.clientWidth;
  // autoplay
  var isPlaying = false;
  var carouselPlayer = void 0;
  // swipe
  var swipeStartXPosition = null;
  var hasBeenStopped = false;

  // apply styles to the elements
  targetCarousel.setAttribute('style', 'white-space: nowrap; overflow: hidden; position: relative;');
  paginationContainer.setAttribute('style', 'position: absolute; bottom: 20px; left: 50%; transform: translate(-50%, 0);');
  itemsWrapper.setAttribute('style', 'overflow: visible;');

  var maxLoop = targetCarousel.children.length;

  if (config.noClone) {
    maxPage -= 2;
    maxLoop -= 2;
    targetCarousel.children[0].setAttribute('style', 'width: 100%; vertical-align: top; display: inline-block; white-space: pre-line;');
    itemsWrapper.appendChild(targetCarousel.children[0]);
  }

  while (maxLoop) {
    maxLoop--;
    targetCarousel.children[0].setAttribute('style', 'width: 100%; vertical-align: top; display: inline-block; white-space: pre-line;');
    itemsWrapper.appendChild(targetCarousel.children[0]);

    // might as well create pagination elements now
    var page = document.createElement('div');
    page.setAttribute('style', 'display: inline-block; width: 7px; height: 7px; background-color: #1a84a8; border-radius: 50%; margin-right: 10px; cursor: pointer;');
    page.onclick = goToPage;
    paginationContainer.appendChild(page);
  }

  if (!config.noClone) {
    // to be able to simulate an infinite scroll
    itemsWrapper.appendChild(itemsWrapper.children[0].cloneNode(true));
    itemsWrapper.prepend(itemsWrapper.children[maxPage - 1].cloneNode(true));
  } else {
    targetCarousel.children[0].setAttribute('style', 'width: 100%; vertical-align: top; display: inline-block; white-space: pre-line;');
    itemsWrapper.appendChild(targetCarousel.children[0]);
  }

  // replace the container with the built carousel
  targetCarousel.innerHTML = '';
  targetCarousel.appendChild(itemsWrapper);
  targetCarousel.appendChild(paginationContainer);

  // initially go to the first item
  paginationContainer.children[0].style.backgroundColor = '#4ecbf4';
  navigateToNextItem();
  playCarousel();

  // add listeners

  // this is the only guy around that calls preventDefault
  itemsWrapper.addEventListener('dragstart', function (ev) {
    ev.preventDefault();
  });

  addPassiveListener(itemsWrapper, 'mousedown', swipeStart);
  addPassiveListener(itemsWrapper, 'touchstart', swipeStart);

  addPassiveListener(window, 'resize', function () {
    isPlaying = true;
    clearTimeout(carouselPlayer);
    containerWidth = targetCarousel.clientWidth;
    navigateToNextItem();
    isPlaying = false;
    playCarousel();
  });

  return function () {
    clearTimeout(carouselPlayer);
    hasBeenStopped = true;
  };
};