import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allAirtable.edges;
    return (
      <Layout>
        <div className="index-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery($dateFormat: String) {
    allAirtable(
      limit: 2000
      sort: {fields: data___date, order: DESC}
      filter: {data: {status: {eq: "publish"}}}
    ) {
      edges {
        node {
          data {
            slug
            date(formatString: $dateFormat)
            title
            tags
            category
            author {
              data { 
                name
                email
                twitter
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
`;
