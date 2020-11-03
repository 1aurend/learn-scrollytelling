# Building my First Observer

I decided to start with the centered text boxes over an "animation" type scroll. Here's a rough walkthrough of my process:

## 1. Starter HTML

I began by adding HTML for a couple of sections of the imagined "visual essay" including the middle section that would be the animation with scrolling text boxes:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <link rel="stylesheet" href="./first-observer.css"/>
  </head>
  <body>
    <div id="hero">Pretend I'm a hero image...</div>
    <section id="intro">
    </section>
    <section id="scrolly">
      <div id="animation">
        <h4 id="step">Scroll to start "animation"</h4>
      </div>
      <div class="text" id="one">
        <p>
          Step 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div class="text" id="two">
        <p>
          Step 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div class="text" id="three">
        <p>
          Step 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </section>
    <section id="next-chunk">
    </section>
</html>
```

Of note here is the `#scrolly` section. I knew I wanted the "animation" to be sticky and have the text boxes scroll over top, so I made all of them children of the one large section. However, `IntersectionObserver` only checks for intersections of elements with the their ancestors. In this case, `#animation` and the `#text` elements are siblings. More on how I solved this below, but a future test is to figure out if it's possible to do with the sticky element as the parent of the scrolling text boxes.**

(**Fwiw, I now think not. It messes up the sticky behavior if the things that are supposed to scroll over top are children of the sticky element.)

## 2. Key CSS

I'm not going to cover all of the `css` here. You can find the complete file over in [the project](./vanilla-js/first-observer/first-observer.css). But let's talk about some key properties.

#### `position: sticky;`

Using `sticky` toggles the element's positioning between `relative` and `fixed` so that the element "sticks" during scrolling. You use the `top bottom left right` properties to define where the element will stick. Note that element sticks only when its parent element is visible, so a sticky element that is a direct child of body will always remain on the screen. To create the effect often found in scrollytelling where an element sticks for some number of trigger steps, the `sticky` element needs to be inside a parent element that is taller than the sticky element and contains all the steps but that isn't the whole page.

Here's the css for my `#animation` element and its large parent `#scrolly` for reference:
```css
#scrolly {
  height: 300vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

#animation {
  position: sticky;
  position: -webkit-sticky;
  top: 20vh;
  margin-top: 5vh;
  margin-bottom: 5vh;
  height: 50vh;
  width: 90vw;
  margin-left: 5vw;
  margin-right: 5vw;
  background: #3D4849;
  z-index: -1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
```
In my demo, `#scrolly` is very tall because I've got a lot of space between the scrolling text boxes.

But more important is `#animation`. Here we have `position:sticky` (and `position:-webkit-sticky` for Safari). The property `top:20vh` determines where the element sticks, that is when it reaches 20% of the way down from the top. None of the rest of the `css` has specifically to do with scrollytelling, except I found needed to add a negative z-index, `z-index:-1` in order for the text boxes to appear on top in Safari. An index of 0 worked fine other browsers I tested.

My text boxes are nothing special, but I made sure to assign them a starting opacity, since that's the propery I'll be changing on scroll.

```css
#one {
  background: teal;
  margin-bottom: 50vh;
  opacity: .9;
}

#two {
  background: teal;
  margin-bottom: 50vh;
  opacity: .9;
}

#three {
  background: teal;
  opacity: .9;
}
```

## 3. Add the Observer

Next I started to write the script for the observer.

First, I copied in the basic setup from the MDN docs:
```js
const createObserver = target => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  }
  const observer = new IntersectionObserver(handleScroll, options)
}
```

Then I wrote a very simple observer callback to see what information gets passed to the observer callback:
```js
const handleScroll = (entries, observer) => {
  entries.forEach(entry => {
    console.log(entry)
}
```
Here's a snipet of the output of that log:
```js
IntersectionObserverEntry: {
  boundingClientRect: DOMRect { x: 237, y: 2445.25, width: 398, … },
  intersectionRatio: 0,
  intersectionRect: DOMRect { x: 0, y: 0, width: 0, … },
  isIntersecting: false,
  rootBounds: DOMRect { x: 43.5, y: 268.6000061035156, width: 783, … },
  target: <div id="one" class="text" style="opacity: 0.9;">,
  time: 60
}
```
The key properties here for my project were `intersectionRatio`, `isIntersecting`, and `target`.

Let's start with `target`. It's exactly what you think-- the DOM element that has

```js
const createObserver = (one, two, three) => {
  const options = {
    root: null,
    rootMargin: '-20% -5% -30% -5%',
    threshold: [0, .1, .25, .5, .75, 1]
  }
  const observer = new IntersectionObserver(handleScroll, options)
  observer.observe(one)
  observer.observe(two)
  observer.observe(three)
}
```

## 4. Calibrate the Observer

The final script turned out like this:
