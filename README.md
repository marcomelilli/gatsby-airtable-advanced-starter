<div align="center">
    <img src="static/logos/gatsby-airtable-advanced-starter-logo.png" alt="Logo" width='70%' height='auto'/>
</div>

# Gatsby Airtable Advanced Starter

This is a blog starter skeleton for [Gatsby](https://github.com/gatsbyjs/gatsby/) v2 using [Airtable](https://airtable.com/) as source.

This project aims to provide a minimal base for building advanced GatsbyJS powered blog, without UI limitations.

NOTE: This project is based on [Gatsby Advanced Starter](https://github.com/Vagr9K/gatsby-advanced-starter/), thanks [Vagr9K](https://github.com/Vagr9K) for the inspiration.

## Demo
🚀 Here a [LIVE DEMO](https://gatsby-airtable-advanced-starter.marcomelilli.com) of the site.

These are the airtable bases used to generate posts and authors:

![airtable screenshot](https://github.com/marcomelilli/gatsby-airtable-advanced-starter/blob/master/static/airtable-blog.png)
👉 [Navigate the view](https://airtable.com/shrPAHW7PNHlJeTcu/tblwz1XshdQGQlPuf?blocks=hide) Blog

![airtable screenshot](https://github.com/marcomelilli/gatsby-airtable-advanced-starter/blob/master/static/airtable-authors.png)
👉 [Navigate the view](https://airtable.com/shrKtgDuvqdcmGKhu/tblKQUYHrJBdh05vl?blocks=hide) Authors

## Getting Started

Fork the project or clone it:

```sh
git clone https://github.com/marcomelilli/gatsby-airtable-advanced-starter YourProjectName # Clone the project
cd YourProjectname
rm -rf .git # So you can have your own changes stored in VCS.
npm install # or yarn install
gatsby develop 
```

create files `.env.development` and `.env.production` to set Airtable config:
```
AIRTABLE_API_KEY=XXXXXXXXXXX
AIRTABLE_BASE=XXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Blog
AIRTABLE_TABLE_NAME_LINKED=Authors
```
NOTE: remember to not commit these files in your repository for security reason.

Now you are ready to start editing the `data/SiteConfig.js`.

```js
module.exports = {
  siteTitle: "Gastsby Airtable Advanced Starter", // Site title.
  siteTitleShort: "Gatsby Airtable", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Starter Blog with Gatsby and Airtable", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://gatsby-airtable-advanced-starter.marcomelilli.com", // Domain of your website without pathPrefix.
  pathPrefix: "/gatsby-airtable-advanced-starter", // Prefixes all links. For cases when deployed to example.github.io/gatsby-airtable-advanced-starter/ 
  siteDescription: "A GatsbyJS stater blog with Airtable.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "1XXXXXXXXXXX9", // FB Application ID for using app insights
  googleAnalyticsID: "MM-XXXXXXXX-1", // GA tracking ID.
  disqusShortname: "gatsby-airtable-advanced-starter", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  ],
  copyright: "Copyright © 2019", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};
```

## Features

- Gatsby v2 support
- Posts in Markdown
  - Code syntax highlighting
  - Embed YouTube videos
  - Embed Tweets
- Tags
  - Separate page for posts under each tag
- Categories
  - Separate page for posts under each category
- Disqus support
- Google Analytics support
- Social features
  - Twitter tweet button
  - Facebook, Reddit, LinkedIn, Telegram share/share count
- SEO
  - Sitemap generation
  - robots.txt
  - ...
- RSS feeds
- Offline support
- Web App Manifest support
- `/static/` and content folders are available to use with `gatsby-image` out of the box
- Netlify deploy configuration
- And More!


WARNING: Make sure to edit `static/robots.txt` to include your domain for the sitemap!
