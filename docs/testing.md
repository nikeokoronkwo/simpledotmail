# Testing

All testing applications are rigorously tested on the unit, component and e2e level using [vitest](https://vitest.dev)

The following document highlights how testing works in this repo, including tools and guides for writing these tests

In general, this repo is a vitest workspace with shared vitest config located at [packages/vitest-config](/packages/vitest-config), which enables turborepo to have hybrid caching between individual packages and still work with vitest's workspace features.

## Unit Testing

Unit testing is done with vitest, and written in the individual package's `tests` directory.

It is important that code is written in a way that is testable.

## Component Testing

Applications also have component tests that are written alongside unit tests, which are written using React and vitest.

The web applications have the advantage of being able to leverage vitest's [browser environment](https://vitest.dev/guide/browser/why.html) in order to run component tests headlessly, as well as using mock DOMs like `jsdom` (the one used in this project).

Some libraries may require extra dependencies for authoring component tests, like the TUI which also uses `ink-testing-library`, and the mobile application which uses [`@testing-library/react-native`](https://oss.callstack.com/react-native-testing-library/).

## End to End (e2e) Testing

End-to-end tests are written for all major application and server deployments and are in their own separate packages

> Unless otherwise specified, all end-to-end tests would (directly or indirectly) require a running Convex instance.
>
> Apart from the server e2e, which already handles this, they should also have the server package loaded up!

### Web e2e

Web end-to-end tests are written using vitest and [playwright](https://playwright.dev).
Playwright tests the application across different browsers in two modes: headless (using a mock server instance), and with a dev convex instance.

### Server e2e

The server e2e requires the docker compose service to be active. It does not need the code from the project to be loaded yet.

For more information on authoring tests for the convex backend, see: https://stack.convex.dev/testing-with-local-oss-backend

### TUI e2e

The TUI is tested e2e in the cli and ssh end-to-end tests. They make use of node-pty for working with keystrokes using the terminal. Mouse interactions are not covered at the moment.

Ensure all code written for the TUI is actionable without the use of a mouse (since that is how TUIs are designed anyways)

### Mobile e2e

Mobile end-to-end testing is done using [Maestro](https://maestro.dev). In order to run such tests locally, the expo application needs to be actively running on the user's system

> In the future, we should integrate with EAS

## Running Tests

By default, when PRs or changes are pushed to the repo, unit and component tests are run on every PR and change made, while e2e tests are run on new version deployments and/or on demand (due to the dependencies needed for such).

> In the future, we may be able to afford running e2e once remote caching is enabled

### Mocking Services

In order to run proper end-to-end tests, we need to run some services in mock using docker compose. The variables from these are exposed and

## Testing Guidelines

- Write code that is testable: Try to split code into reusable components where possible.
- Consider writing component tests: Test individual components using `jsdom` enviroment, and test much larger components, like larger section of pages (more integration-like tests), using vitest's browser environment testing
