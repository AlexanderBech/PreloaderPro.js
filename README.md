PreloaderPro.js
==================

jQuery plugin for preloading images in static or dynamic loaded content

Example: http://alexanderbech.com/work/PreloaderPro.js

Usage
==================
Include jQuery 1.7+ and jquery.preloaderpro.js in your layout and target your list container with preloaderPro().
```javascript
$('.container').preloaderPro({
  loadBar: '.preloader',
  callBack: function(){
    // All images loaded
  }
});
```

```html
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script src="jquery.preloaderpro.js"></script>

<div class="preloader"></div>
<section class="container">
  <img src="image.jpg" />
</div>
```
