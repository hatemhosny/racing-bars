# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

---

## [v0.3.0](https://github.com/hatemhosny/racing-bars/compare/v0.2.0...v0.3.0) (2024-09-07)

### Highlights for this release

- The charts are now responsive and works much better on smaller screens. Dynamically resizing the container element will also resize the chart.
- Added the option `valueDecimals` to control decimal spaces.
- The `labelsPosition` option can now be set to `"none"` to hide the labels (e.g. for icons only).

In addition to some bug fixes.

The website homepage now has a GUI editor for chart options. Also added search capability in the website.

Thank you @AhmedElbohoty for the valuable contribution.

### Bug Fixes

- **api:** re-prepare data when `makeCumulative` option is changed by `changeOptions` API method ([80584ca](https://github.com/hatemhosny/racing-bars/commit/80584ca3622499a4b5c6e2b7f6b070ac31bfa758))
- **data:** fix passing data to worker ([94aadd5](https://github.com/hatemhosny/racing-bars/commit/94aadd5a0bd3ebc7ec917dd3eacb43c7f8c132b5))
- **renderer:** avoid icons overflow outside bars ([b75dedb](https://github.com/hatemhosny/racing-bars/commit/b75dedb51cde6778431a97d85c4000a104c993e8))

### Features

- **options:** add labelPositions `"none"` ([4127c7a](https://github.com/hatemhosny/racing-bars/commit/4127c7a5dd49c5add1b1bf323815d0ccef965ec3))
- **options:** add the option `valueDecimals` ([330202a](https://github.com/hatemhosny/racing-bars/commit/330202aa7b432e2ff6b509128c0da53226b3d064))
- **options:** validate options ([0dccf85](https://github.com/hatemhosny/racing-bars/commit/0dccf850d4af29eda795a37490606dc11f80cf9c))
- **renderer:** resize chart on resizing root element ([daec0cd](https://github.com/hatemhosny/racing-bars/commit/daec0cdebf95d15736edc52a4101fdd14c231f47))
- **styles:** make the chart text & controls responsive ([eb2a353](https://github.com/hatemhosny/racing-bars/commit/eb2a35341dcda6fbfe3563d7c7cfc1d5f5253430))
- **website:** add options editor GUI ([a023795](https://github.com/hatemhosny/racing-bars/commit/a023795a1f78bbb7ae3562a736641f09d50245b6))
- **website:** add search ([00015fc](https://github.com/hatemhosny/racing-bars/commit/00015fce403e40099c8288a4d6fd4e6fffe32d71))

---

## [v0.2.0](https://github.com/hatemhosny/racing-bars/compare/v0.1.2...v0.2.0) (2024-09-01)

### Bug Fixes

- **data:** fix worker mixing data for multiple charts ([5160018](https://github.com/hatemhosny/racing-bars/commit/5160018b08c8a07683f8865cc9a194fac8cd2adb))
- **types:** fix library type definitions ([929f0af](https://github.com/hatemhosny/racing-bars/commit/929f0af452dacb28f341b47edabad3a0235507af))

### Features

- **data:** auto detect `dataShape` ([5ede0f7](https://github.com/hatemhosny/racing-bars/commit/5ede0f7a02a60d2d66e3ddd7dcca4a4be57423a5))
- **data:** handle empty or invalid data ([544c39d](https://github.com/hatemhosny/racing-bars/commit/544c39d56f5bf6e914f080e5d3c235e5b8455bfd))
- **options:** auto detect `dataType` ([9030de4](https://github.com/hatemhosny/racing-bars/commit/9030de44ce89fb4552aa8508983fb1e4f0570cad))

---

## [v0.1.2](https://github.com/hatemhosny/racing-bars/compare/v0.1.1...v0.1.2) (2024-08-30)

### Bug Fixes

- **data:** fix relative urls in web worker ([ee8296d](https://github.com/hatemhosny/racing-bars/commit/ee8296da3566455abe610ec2aeee0e24fd1a9018))

### Features

- **data:** handle loading data errors ([ef615d7](https://github.com/hatemhosny/racing-bars/commit/ef615d7bca13d16973d7a329a38b12325f0daa4a))

### Others

- **website:** add all gallery demos to playground ([b2c288e](https://github.com/hatemhosny/racing-bars/commit/b2c288e8c7b03748ba99dfa943bd6031c306d7be))
- **website:** allow playground to change languages ([12f7f48](https://github.com/hatemhosny/racing-bars/commit/12f7f487fee06df7b994794a09db15a4f76073d8))
- **website:** allow selecting playground language in querystring ([5725e5f](https://github.com/hatemhosny/racing-bars/commit/5725e5f13a626021d702a2d09d45245955b6d235))
- **website:** load gallery demos in embedded playground ([747eade](https://github.com/hatemhosny/racing-bars/commit/747eadea98e48558537e7b169532a3f278e6d6df))
- lint:stylelint and test:lint scripts ([fd43d45](https://github.com/hatemhosny/racing-bars/commit/fd43d45461297e791e1620569d5613ff3ba5fd81))

- **build:** upgrade most dependencies, including docusaurus that powers the website (Thanks @AhmedElbohoty)

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
