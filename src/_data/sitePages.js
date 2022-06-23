const { gql } = require("graphql-request");
const getRequest = require("../../11ty/helpers/getRequest");

const SITE_PAGES = gql`
  query SITE_PAGES {
    pages {
      title
      slug
      content
    }
  }
`;

module.exports = async () => {
  const { pages } = await getRequest(SITE_PAGES, "site-pages");
  return pages;
};
