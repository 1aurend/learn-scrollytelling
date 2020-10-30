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
    <script src="https://unpkg.com/intersection-observer"></script>
    <script src="https://unpkg.com/scrollama"></script>
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
```
