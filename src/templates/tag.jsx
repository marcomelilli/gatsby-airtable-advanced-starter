import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

export default class TagTemplate extends React.Component {
  render() {
    const { tag } = this.props.pageContext;
    const postEdges = this.props.data.allAirtable.edges;
    return (
      <Layout>
        <div className="tag-container">
          <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allAirtable(
      limit: 1000
      sort: { fields: [data___date], order: DESC }
      filter: { data : { tags: { eq: $tag }, status: {eq: "publish"} } }
    ) {
      totalCount
      edges {
        node {
          data {
            title
            date
            category
            tags
            slug
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
