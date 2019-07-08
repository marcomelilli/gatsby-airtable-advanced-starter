const urljoin = require("url-join");
const config = require("./data/SiteConfig");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: config.pathPrefix === "" ? "/" : config.pathPrefix,
  siteMetadata: {
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
    rssMetadata: {
      site_url: urljoin(config.siteUrl, config.pathPrefix),
      feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${urljoin(
        config.siteUrl,
        config.pathPrefix
      )}/logos/logo-512.png`,
      copyright: config.copyright
    }
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-lodash",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/`
      }
    },
	{
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY, // specify via env
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE, // specify via env
            tableName: process.env.AIRTABLE_TABLE_NAME, // specify via env
            queryName: `posts`, // optional
            tableLinks: [`author`],
            mapping: { postMarkdown: `text/markdown` },
          },
          {
            baseId:  process.env.AIRTABLE_BASE,
            tableName: process.env.AIRTABLE_TABLE_NAME_LINKED
          }
        ]
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 690
            }
          },
          {
            resolve: "gatsby-remark-responsive-iframe"
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-autolink-headers"
        ]
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: config.googleAnalyticsID
      }
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-twitter",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "minimal-ui",
        icons: [
          {
            src: "/logos/logo-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/logos/logo-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = "GatsbyJS Airtable Advanced Starter";
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const { rssMetadata } = ctx.query.site.siteMetadata;
              return ctx.query.allAirtable.edges.map(edge => ({
                date: edge.node.data.date,
                title: edge.node.data.title,
                description: edge.node.data.postMarkdown.childMarkdownRemark.excerpt,
                url: rssMetadata.site_url + "/" + edge.node.data.slug,
                guid: rssMetadata.site_url + "/" + edge.node.data.slug,
                custom_elements: [
                  { "content:encoded": edge.node.data.postMarkdown.childMarkdownRemark.html },
                  { author: edge.node.data.author ? edge.node.data.author[0].data.name : null},
                  { category: edge.node.data.category}
                ]
              }));
            },
            query: `
            {
              allAirtable(
                limit: 1000
                sort: {fields: data___date, order: DESC}
                filter: {data: {status: {eq: "publish"}}}
              ) {
                edges {
                  node {
                    data {
                      slug
                      date
                      title
                      category
                      tags
                      author {
                        data { 
                          name,
                          email,
                          twitter,
                          github
                        }
                      }
                      postMarkdown {
                        childMarkdownRemark {
                          html
                          excerpt(format: PLAIN)
                          timeToRead
                        }
                      }
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
            `,
            output: config.siteRss
          }
        ]
      }
    }
  ]
};
