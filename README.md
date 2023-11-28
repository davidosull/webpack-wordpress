# Inovo Media Theme Asset Bundler for WordPress
This webpack configuration is designed to bundle assets for WordPress themes. It combines scripts, styles, and other static assets. It includes BrowserSync, which is better suited for WordPress than HMR. BrowserSync automatically updates during local development and there's a built-in web server for seamless integration and testing.


## Prerequisites

-  Node.js (npm)
-  OpenSSL
-  Yarn or npm

## Setup Instructions

Follow these steps to setup the project.

### 1. Install OpenSSL with brew

```shell
brew install openssl
```

### 2. Generate Self Signed Certificates

We're using these certificates to make the development server be able to serve HTTPS locally. I have one SSL istalled globally to cover all localhost environments.

```shell
# Generate a private key
openssl genrsa -out ~/.localhost.key 2048

# Generate a csr
openssl req -new -x509 -key ~/.localhost.key -out ~/.localhost.crt -days 365 -subj /CN=localhost

# Change the certificate files permission
chmod 600 ~/.localhost.*
```

### 3. Trust the Certificate You Created
Drag the created .localhost.crt file into KeyChain Access (Mac) or Windows equivalent (certmgr.msc on Windows) and trust the certificate.

### 4. Install Node.js Dependencies
```shell
yarn install
# or
npm install
```

### 5. Configure Project Variables in ﻿webpack.config.js
A typical configuration can look like this:
```js
const project = {
  theme_name: 'project-name',
  base_url: 'https://project-name.local/',
};
```

### 6. Run the Webpack Watch Task
This task starts a development server and recompiles your assets as soon as they change.
```shell
yarn watch
# or
npm run watch
```

### 7. Switch Mode for Deployment
Before you build assets for deployment, make sure to update ﻿webpack.config.js export mode to 'production'.
```js
module.exports = {
  mode: 'production',
  // devtool: 'source-map', // remove for production
  // rest of code
}
```

### 8. Build Production-ready Assets
```shell
yarn build
# or
npm run build
```

### 9. Deploy to Staging/Live Environments
Once your assets are built, you're ready to deploy your project to staging or live environments.

## Important Information
Here are some key points you should know:

- All assets, including images and fonts mentioned in script/style files, are packaged and saved in the `theme-name/app` directory.
- For images (SVGs, maninly) that are directly used in templates, I have created a separate folder called `theme-name/static/img` to store and reference those files.
  - Currently, I haven't discovered a method for Webpack to handle images referenced in templates that works for me. The current approach of using a separate folder is a temporary solution until I find a more suitable alternative.
  - I also store `favicon` bits in `theme-name/static`, hence the nested `img` folder

## License
This project is licensed under the terms of the [MIT License](https://opensource.org/license/mit/).

## Contributing
We're open to any contributions. Please fork the project and open a pull request for any features, bug fixes, or suggestions.
