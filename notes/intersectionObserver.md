# Intersection Observer API

### [MDN Overview](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

Why use `IntersectionObserver`?

"Implementing intersection detection in the past involved event handlers and loops calling methods like Element.getBoundingClientRect() to build up the needed information for every element affected. Since all this code runs on the main thread, even one of these can cause performance problems. When a site is loaded with these tests, things can get downright ugly."

How `IntersectionObserver` fixes this:

"The Intersection Observer API lets code register a callback function that is executed whenever an element they wish to monitor enters or exits another element (or the viewport), or when the amount by which the two intersect changes by a requested amount. This way, sites no longer need to do anything on the main thread to watch for this kind of element intersection, and the browser is free to optimize the management of intersections as it sees fit."

Interesting...

"One thing the Intersection Observer API can't tell you: the exact number of pixels that overlap or specifically which ones they are; however, it covers the much more common use case of "If they intersect by somewhere around N%, I need to do something."


Setting up an observer:

```javascript
let options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0
}

let observer = new IntersectionObserver(callback, options);
```

This callback is called under two conditions:

1. A target element intersects either the device's viewport or a specified element. That specified element is called the root element or root for the purposes of the Intersection Observer API.
2. The first time the observer is initially asked to watch a target element.

The `threshold` is a value between 0 and 1 represents the percent of the element that has to be visible in the target before the callback is called. Defaults to `0`. Can also pass an array for calling the function at intervals rather than only once.

Activate a target:

```javascript
let target = document.querySelector('#listItem');
observer.observe(target);
```
