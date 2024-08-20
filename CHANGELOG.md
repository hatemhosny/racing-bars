# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

---

## [0.1.1](https://github.com/hatemhosny/racing-bars/compare/v0.1.0...0.1.1) (2024-08-20)

- Automate preparing releases
- Add README and LICENSE to published package
- Improve build system
- Add CI

---

## 0.1.0 (2024-08-20)

Initial public release 🎉

### Bug Fixes

- **data:** :bug: fix fillDateGaps ([282ee49](https://github.com/hatemhosny/racing-bars/commit/282ee4997d2e117ccb9ea5c8fb8ba7dcd2376aa3))
- **events:** fix keyboardControls ([d460f96](https://github.com/hatemhosny/racing-bars/commit/d460f964d3a59254acf8d259347facd9b58d7462))

### chore

- **api:** :boom: simplify race api ([d0bfa66](https://github.com/hatemhosny/racing-bars/commit/d0bfa6642dbd0591434c6ae560690f4b184fc982))

### Code Refactoring

- **frameworks:** use default export for react and vue components ([c168a39](https://github.com/hatemhosny/racing-bars/commit/c168a39fd71903bae6d873cbda3f6e7593ef98e3))
- **options:** rename control options ([4fc644d](https://github.com/hatemhosny/racing-bars/commit/4fc644d261c86f475662f2a7f6cba1bce4def3f5))
- **options:** rename labelsOnBars to labelsPosition ([2b3ed1d](https://github.com/hatemhosny/racing-bars/commit/2b3ed1d7d2adade3ed56651250e564f606011b78))

### Documentation

- **events:** :pencil: add docs about events ([46c9c36](https://github.com/hatemhosny/racing-bars/commit/46c9c36c2b27ec8e36e5938820fac14587d7d0c9))

### Features

- **api:** allow API method chaining, on(event), onDate, call(fn), delay(ms) ([c57936a](https://github.com/hatemhosny/racing-bars/commit/c57936a09ed0a37f490107c6de026379ea2b8b38))
- **api:** fluent API with method chaining ([f200adf](https://github.com/hatemhosny/racing-bars/commit/f200adfd9fb69a8a19a2ee7575ea6fc3fda80f34))
- **docs:** :mag: implement offline search ([5c8c5d4](https://github.com/hatemhosny/racing-bars/commit/5c8c5d4bbacb406fac7e939b604c860978c2ac3b))
- **frameworks:** :iphone: add a callback that is called after chart loads ([f6005cd](https://github.com/hatemhosny/racing-bars/commit/f6005cd5d289ecf86f0f355a0b252248dd7c11ed))
- **frameworks:** add loadingContent prop ([681d4eb](https://github.com/hatemhosny/racing-bars/commit/681d4eb616b274d480a0e8accd220278c1acafde))
- **frameworks:** change react build to use react-jsx ([a325036](https://github.com/hatemhosny/racing-bars/commit/a3250364efee1e0b58091696fc5db8dc6f810255))
- **frameworks:** prevent component re-render on prop changes. ([0f2c3ae](https://github.com/hatemhosny/racing-bars/commit/0f2c3ae32063569b420f3a448acce3db040eeb97))
- **options:** :recycle: allow to change options during runtime ([7ed9c83](https://github.com/hatemhosny/racing-bars/commit/7ed9c83ef6c9955c20a3f7b3cc5282f927d56426))
- **options:** add `makeCumulative` option ([bdd87dd](https://github.com/hatemhosny/racing-bars/commit/bdd87dd441e91c6f3b28613625ad23e9d280d6bb))
- **renderer:** :art: adjust header heights ([315fd93](https://github.com/hatemhosny/racing-bars/commit/315fd93894751a6dfc0c8d5d7dfffa6132c08cce))
- **renderer:** allow user to set margins ([fe1dffa](https://github.com/hatemhosny/racing-bars/commit/fe1dffa08c6f97a1b274bb4847f598ff2af9dcd7))
- **styles:** change background color for dark theme ([cbc63b0](https://github.com/hatemhosny/racing-bars/commit/cbc63b05901050d1aa4383076850d74b8d615864))
- **website:** add meta tags ([18ab60d](https://github.com/hatemhosny/racing-bars/commit/18ab60d4315ba37e471371b9f563a48c448b2143))
- **website:** improve code snippets ([a428bc1](https://github.com/hatemhosny/racing-bars/commit/a428bc112f5fc65a5afc300b0829334382c1d2f1))
- **website:** improve playground code ([72eac43](https://github.com/hatemhosny/racing-bars/commit/72eac437f49339ebc0db016a02c6546f8b8b7c9e))
- **website:** support multiple languages for code blocks ([4b477b6](https://github.com/hatemhosny/racing-bars/commit/4b477b628562f03e7ff68043d5f106b236d4ca62))
- **website:** use jsdoc types for "open in playground" links ([06131cf](https://github.com/hatemhosny/racing-bars/commit/06131cf3878ade16491eb4bf23b6d985c04c4b48))

### Performance Improvements

- **data:** :zap: compute next dateSlice after render and cache it ([4f152c6](https://github.com/hatemhosny/racing-bars/commit/4f152c635fddcb5cbd6693608cb0b2013b705cd0))
- **data:** :zap: improve performance of fillDateGaps ([dabd3f6](https://github.com/hatemhosny/racing-bars/commit/dabd3f699e5dbc9824ebf39e051258c0a42927ab))

### BREAKING CHANGES

- **events:** change custom event name from
  'racingBars/dateChanged' to 'racingBars/dateChange'
- **api:** race api change
- **options:** rename control options
- **frameworks:** react and vue components use default exports.
  The main library and Props interface are no longer exported
- **options:** labelsOnBars has been renamed to labelsPosition
  and changed type from boolean to 'inside' | 'outside'

---
