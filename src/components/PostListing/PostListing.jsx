import React from "react";
import { Link } from "gatsby";
import "./PostListing.css";
import moment from 'moment';
import siteConfig from "../../../data/SiteConfig";


class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.data.slug,
        tags: postEdge.node.data.tags,
        category: postEdge.node.data.category,
        image: postEdge.node.data.image ? postEdge.node.data.image[0] : null,
        title: postEdge.node.data.title,
        date: siteConfig.dateFormat ? moment(postEdge.node.data.date).format(siteConfig.dateFormat) : postEdge.node.data.date,
        author: postEdge.node.data.author ? postEdge.node.data.author[0].data.name : null,
        postMarkdown: postEdge.node.data.postMarkdown
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div>
        {/* Your post list here. */
        postList.map(post => (
          <div key={post.title} className="post-box">
            <Link to={post.path} key={post.title}>
              <h1>{post.title}</h1>
            </Link>            
            <div>{post.postMarkdown.childMarkdownRemark.excerpt}</div>
            <div className="sub-excerpt">📅 {post.date}<span className="author">🙍‍♂ {post.author}</span><span>⏱️ {post.postMarkdown.childMarkdownRemark.timeToRead} min</span></div>
          </div>
        ))}
      </div>
    );
  }
}

export default PostListing;
