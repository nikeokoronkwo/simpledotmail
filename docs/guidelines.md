# Contribution Guidelines

These are some general guidelines for writing code for this project.

## ff

#### AVOID duplication of code logic

If you find yourself having to redo certain logic, consider either [refactoring](#consider-refactoring-shared-logic-into-a-package) or, if it is deemed too complicated and/or something that has to be done across platforms, install a suitable platform-independent package.

#### AVOID importing random packages

Having said the [above](#avoid-duplication-of-code-logic), in order to encourage stability across the work we do in this project, it is encouraged to ensure logic needed can be done either by ourselves or with some guided help from AI, before consulting to using a package.

Think of packages as a third-party dependency liability being added to the repo rather than as an advantage.

Also,

- Ensure not to install a package that contains functionality already covered by another.
- Try to find a sweet spot in terms of the scope of the package: not too broad so as to cover more than what we need (unless code is properly dependency-tracked so as not to install/import unused code), but not too small.

#### CONSIDER refactoring shared logic into a package

One of the benefits of having a monorepo structured in this way is that code that works across multiple packages/applications can be shared from one rather than duplicated across all.
Rather than writing the same components/logic multiple times, consider refactoring that logic to make it reusable across applications.

How the code should be refactored depends on where it is being used:

- React specific code can be refactored for use in all apps (except `cli` and `ssh`, which are wrappers of `tui`).
- React **web** specific code (such as shadcn components and other components involving tailwind) can b

Code that needs to be refactored between the web app (at `mobile`) and the desktop app (at `desktop`) and may include platform-specific code may require a few more steps.

This can also improve build times if these packages are cached by turbo

- AVOID using
- AVOID committing unchecked AI-generated code
