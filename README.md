## Style Guide

Please use prettier and change settings (others use default):

```javascript
{
  "prettier.semi": false,
  "prettier.singleQuote": true,
}
```

## Node Module

Suggession install this module to global env.

```bash
npm install yarn pm2 -g && yarn install
```

## Development

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production (First Build On Server)

centos:

```bash
sudo yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 Xvfb -y
```

ubuntu:

```bash
sudo apt-get install libnspr4 libnss3 libnss3-nssdb libnss3-tools libgbm-dev xvfb -y
```

## Production

build and start server:

```bash
yarn build && yarn server
```

## Learn More

- [Next.js](https://nextjs.org)
- [Ant Design](https://ant.design)
- [Tailwind CSS](https://tailwindcss.com)
