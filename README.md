# Whop Docs

These docs use the Protocol [Tailwind UI](https://tailwindui.com) template, built with [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

First clone the repo
```
git clone https://github.com/whopio/api-docs.git
```

Install the npm dependencies

```bash
npm install
cp .env.example .env.local
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Editing Guide

These docs use MDX, allowing you to write text elements in markdown and add JSX elements as needed. [Here](https://www.markdownguide.org/cheat-sheet/) is a markdown cheat sheet. The site will auto-update as you edit these files.

### New Pages

Create a new mdx file in `src/pages`. Styles and other elements will be automatically applied.

### Adding to Navigation

In `src/components/Navigation.jsx` you can add new elements to the navigation.

### Images and Gifs

Images and gifs are hosted on Imgur. You do not need an account to post. Max file size is 20mb. To set a open graph image use this inside the mdx file. 

```
export const image = 'https://i.imgur.com/12345.png'
``` 

## Learn more

To learn more about the technologies used in these docs, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [Framer Motion](https://www.framer.com/docs/) - the official Framer Motion documentation
- [MDX](https://mdxjs.com/) - the official MDX documentation
- [Algolia Autocomplete](https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/what-is-autocomplete/) - the official Algolia Autocomplete documentation
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) - the official Zustand documentation
