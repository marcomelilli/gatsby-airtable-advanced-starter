import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

export default class CategoryTemplate extends React.Component {
  render() {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.allAirtable.edges;
    return (
      <Layout>
        <div className="category-container">
          <Helmet
            title={`Posts in category "${category}" | ${config.siteTitle}`}
          />
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String, $dateFormat: String) {
    allAirtable(
      limit: 1000
      sort: { fields: [data___date], order: DESC }
      filter: { data : { category: { eq: $category }, status: {eq: "publish"} } }
    ) {
      totalCount
      edges {
        node {
          data {
            title
            category
            tags
            slug
            date(formatString: $dateFormat)
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
