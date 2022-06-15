const { gql } = require('graphql-request');
const getRequest = require('../../11ty/helpers/getRequest');

const ALL_TAGS = gql`
  query ALL_TAGS {
    posts {
      tags
    }
  }
`;

module.exports = async () => {
  const { posts } = await getRequest(ALL_TAGS, 'all-tags');
  const tags = new Set();
  posts.forEach((post) => {
    const postTags = post.tags.split(', ');
    postTags.forEach((tag) => {
      tags.add(tag);
    });
  });

  return Array.from(tags).sort();
};
