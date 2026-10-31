**English** | [Português (Brasil)](./README.pt-BR.md)

<p align="center">
  <a href="https://wppconnect.io/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://wppconnect-team.github.io/brand/wppconnect-dark.png" />
      <img src="https://wppconnect-team.github.io/brand/wppconnect-light.png" alt="WPPConnect" width="220" height="121" />
    </picture>
  </a>
</p>

# WPPConnect/mobile

Explore WhatsApp Web automation in a React Native mobile application.

A project in the WPPConnect ecosystem, maintained by WPPConnect Team.

[Getting started](#getting-started) | [Documentation](#documentation) | [Contributing](#contributing) | [Support WPPConnect](#support-the-project)

[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue)](./LICENSE) [![Documentation](https://img.shields.io/badge/docs-WPPConnect-blue)](https://wppconnect.io/) [![Open Collective](https://img.shields.io/badge/Open%20Collective-WPPConnect-blue)](https://opencollective.com/wppconnect)

> Experimental application; device and service compatibility require validation.

## Overview

For contributors experimenting with the mobile integration of WA-JS in a WebView. The repository contains a React Native 0.69 development application (`private: true`, version 0.0.1). No App Store or Play Store release is confirmed here; build from source and verify device compatibility.

## Features

- React Native Android/iOS targets and embedded browser integration.
- WA-JS type definitions and local application state/navigation.

## Getting started

Requires Node.js/npm and the native SDKs for React Native **0.69**. Android needs an Android SDK/emulator or connected device; iOS needs macOS, Xcode and CocoaPods. Use the toolchain compatible with this older React Native version, rather than assuming current templates work.

```sh
git clone https://github.com/wppconnect-team/mobile.git
cd mobile
npm install
npm run start
```

Keep Metro running. In another terminal use `npm run android`, or on macOS install the iOS pods with `cd ios && pod install` and run `npm run ios` from the repository root. The first result is the app opening in your device/emulator; WhatsApp authentication and feature support require separate verification.

## Configuration

Review [src](src/), [android](android/) and [ios](ios/) for WebView and native settings. The scripts include tests, lint and TypeScript checking. The previous promise of future store releases is not a release commitment.

## Documentation

- [Application source](./src/)
- [React Native 0.69 environment](https://reactnative-archive-august-2023.netlify.app/docs/0.69/environment-setup)
- [Retained technical details and acknowledgments](documentation/readme-reference.md)

## WPPConnect ecosystem

| Project | Purpose | When to use it |
| --- | --- | --- |
| [WPPConnect/WA-JS](https://github.com/wppconnect-team/wa-js) | Expose WhatsApp Web functions through the browser-side `WPP` API. | Run browser-side code in WhatsApp Web. |
| [Wppconnect Extension](https://github.com/wppconnect-team/wppconnect-extension) | Send configured messages and attachments through a Chrome extension for WhatsApp Web. | Use a Chrome UI over WA-JS. |

## Support the project

WPPConnect is maintained by an open-source community. Your support helps fund maintenance, infrastructure, documentation, and the people working on the ecosystem.

If WPPConnect helps your project or business, consider making a one-time contribution or becoming a recurring supporter.

**[Support WPPConnect on Open Collective](https://opencollective.com/wppconnect)**

Contributions are voluntary. See the official page for current financial information. You can also help with code, tests, documentation, translations and well-described issue reports.

Additional official beneficiaries in [.github/FUNDING.yml](.github/FUNDING.yml): [joaosouz4dev](https://github.com/sponsors/joaosouz4dev), [manfe](https://github.com/sponsors/manfe).

## Contributing

Contributions of code, tests, examples, documentation and translations are welcome. For larger changes, discuss the approach in an issue first. Include the project/runtime versions, a minimal reproduction and sanitized logs when reporting a problem. Update both `README.md` and `README.pt-BR.md` in the same change when installation, configuration, features, examples, licensing or funding changes.

After installing the development dependencies, use the repository checks relevant to your change:

```sh
npm run tsc
npm run lint
npm test
```

Account-dependent examples and tests require separate validation with an authorized test account. Never attach credentials or session files to an issue.

## Community and support

Use [repository issues](https://github.com/wppconnect-team/mobile/issues) for reproducible bugs and feature proposals. For usage questions, join the community through the official channels:

- [Discord](https://discord.gg/JU5JGGKGNG)
- [Telegram](https://t.me/wppconnect)
- [YouTube](https://www.youtube.com/c/wppconnect)

Report vulnerabilities privately according to [SECURITY.md](SECURITY.md).

This project is independent and is not affiliated with or endorsed by WhatsApp or Meta. Follow applicable terms and obtain authorization for account and messaging operations.

## License

[Apache License 2.0 (Apache-2.0)](./LICENSE).

Copyright 2021 WPPConnect Team.

The original legal document and existing copyright notices are preserved. Third-party components retain their own terms.
