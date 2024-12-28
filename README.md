# Typescript Chrome Extension Starter

## 🚀 Overview

A robust, modern starter template for building Chrome extensions using TypeScript, Webpack, and best practices for browser extension development.

## ✨ Features

- 🔧 TypeScript support
- 📦 Webpack bundling
- 🌐 Content script and service worker integration
- 🔒 Secure content security policy
- 🔑 Manifest v3
- 🔥 Hot reloading in development mode

## 📋 Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Chrome Browser (or any other Chromium based browser)

## 🛠 Installation

1. Clone the repository or directly use the template:

```bash
git clone https://github.com/harshitbudhraja/typescript-chrome-extension-starter.git
cd typescript-chrome-extension-starter
```

2. Install dependencies:
```bash
yarn install
```

## 🖥 Development

### Running in Development Mode
```bash
yarn dev
```

### Building for Production
```bash
yarn build
```

### Loading in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the project directory
4. You don't need to select the `dist` directory, it's already set in the manifest.json

## 📂 Project Structure

```
├── src/
│   ├── content/
│   │   └── index.ts        # Content script entry point
│   └── worker/
│       └── index.ts        # Service worker entry point
├── dist/                   # Compiled extension files
├── webpack.config.js       # Webpack configuration
├── tsconfig.json           # TypeScript configuration
└── manifest.json           # Chrome extension manifest
```

## 🔐 Permissions

The extension requests the following Chrome permissions by default. You can modify the permissions in the manifest.json file.
- `scripting`
- `activeTab`
- `storage`
- `declarativeNetRequest`
- `tabs`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Harshit Budhraja - [@harshitbudhraja on X (previously, Twitter)](https://x.com/harshitbudhraja)

---

**Note**: This is a starter template. Remember to customize it to fit your specific extension's needs!
