const { gql } = require('graphql-request');
const getRequest = require('../../11ty/helpers/getRequest');
const _ = require('lodash');

const removeMd = require('remove-markdown');
const createExcerpt = (input) =>
  removeMd(input, {
    useImgAltText: false,
  })
    .split(' ')
    .slice(0, 40)
    .join(' ') + ' …';

const ALL_POSTS = gql`
  query ALL_POSTS {
    posts {
      title
      date
      tags
      content
      slug
    }
  }
`;

module.exports = async () => {
  const data = await getRequest(ALL_POSTS, 'all-posts');

  const posts = {};

  posts.all = data.posts
    .map((post) => ({
      ...post,
      tags: post.tags.split(', '),
      excerpt: createExcerpt(post.content),
    }))
    .sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return bDate - aDate;
    });

  const tagsSet = new Set();
  posts.all.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });
  const tagsArray = Array.from(tagsSet).sort();
  posts.byTag = [];
  const PAGINATION_SIZE = 10;

  tagsArray.forEach((tag) => {
    const tagPosts = posts.all.filter((post) => post.tags.includes(tag));

    const chunkedTagPosts = _.chunk(tagPosts, PAGINATION_SIZE);
    const byTagGroups = chunkedTagPosts.map((chunk, index, array) => ({
      tagName: tag,
      pagesLength: array.length,
      pageIndex: index,
      previous: index > 0,
      next: array.length > index + 1,
      posts: chunk,
    }));
    byTagGroups.forEach((group) => posts.byTag.push(group));
  });

  return posts;
};
