# learn-scrollytelling

I've finally got a solid enough idea of what I want to build to feel ready to take on learning scrollytelling. Actually, there are two ideas, both of which I deserve at best partial credit for. But such are the best ideas. The ideas are these:

### 1. Side-By-Side Visual Essay

This one is inspired by Apple's SwiftUI tutorials, for example [here](https://developer.apple.com/tutorials/swiftui/drawing-paths-and-shapes). The basic idea is that there is text that scrolls in one column while an image or other graphic stays in place in the other column. The graphic might itself be animated or change in response to anchors in the text, but it doesn't move.

The moonshot goal in this case is to create this as a template with something markdown-like as its CMS. Perhaps this would ultimately take the form of a static-site built in Gatsby.js where writers could just add their markdown and related media.

### 2. Text Boxes Over Animation

A nice example of this one is the U.S. map found just below the header in [this Guardian article](https://www.theguardian.com/us-news/ng-interactive/2017/dec/20/bussed-out-america-moves-homeless-people-country-study). Here the text scrolls up in semi-transparent boxes over top of a large animation. The animation changes in response to where the reader is at in the text.

The moonshot goal here is part of the play-a-long instrument project, telling the story of that instrument's making which various iterations of the instrument are playable in the background.

## Potential Steps

Both these goals seem approachable by a parallel set of steps. And my plan is to build up the libraries I deploy slowly to really understand how things work.

#### Phase 1: Vanilla JS

- First, I'll build the essence of each of the scroll animations with vanilla JS. No libraries, not even Scrollama.js or its ilk.
  - To start, I'm reading about the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) because this seems to be a more performant way to create these animations than what I've tried in the past using `getBoundingClientRect()` and event handlers.
  - Notes on this and hopefuly future learnings are over in [notes](./notes).
- Then, I'll recreate these scrolls with Scrollama or something similar to compare ease of use.

#### Phase 2: React

- Next, I'll take what I've built and move it over into a React app. Questions I've got about that phase at this stage include:
  - How easy/hard/fun is it to use a library like Scrollama.js in React?
  - Will it be more efficient to turn some of the transitions created using intersections over to changes in React state and conditional renders?
  - How do we implement lazy-loading if there are a lot of images and potentially infinite scroll in at least the Visual Essay case?

#### Phase 3: Gatsby

- Finally, Gatsby (or something like it) seems like the place to land for the ultimate markdown-as-CMS for visual essays site. But I think by first implementing a demo of lazy-loading in React, I'll have a better sence of what Gatsby does for me and how to best make use of it.
