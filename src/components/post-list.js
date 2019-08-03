import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { isEmpty } from 'lodash'

import { rhythm, scale } from '../utils/typography'
import PostListTags from './post-list-tags'

const PostList = ({ posts }) => (
  posts.map(({ node: post }) => {
    const { slug } = post.fields
    const {
      title = slug,
      description = post.excerpt,
      dateTime,
      date,
      tags,
    } = post.frontmatter

    return (
      <div key={slug}>
        <h3 style={{ marginBottom: rhythm(1 / 4) }}>
          <Link
            style={{ boxShadow: `none` }}
            to={slug}
            data-testid="post-list-link"
          >
            {title}
          </Link>
        </h3>
        <div style={{ ...scale(-1 / 5), fontStyle: `italic` }}>
          <time dateTime={dateTime}>{date}</time>
          {!isEmpty(tags) && (
            <span>{' · '}<PostListTags tags={tags} /></span>
          )}
        </div>
        <p
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    )
  })
)

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        frontmatter: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }),
        fields: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }),
      }),
    }).isRequired
  ),
}


export default PostList