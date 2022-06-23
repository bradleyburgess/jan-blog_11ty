const { gql } = require("graphql-request");
const getRequest = require("../../11ty/helpers/getRequest");
const splitSentences = require("../../11ty/helpers/splitSentences");

const SITE_SETTINGS_QUERY = gql`
  query SITE_SETTINGS {
    settings {
      siteTitle
      tagLine
      siteEmail
      shareText
      siteCoverImage {
        url
        description
      }
      socialLinks {
        name
        url
      }
    }
  }
`;

module.exports = async () => {
  const data = await getRequest(SITE_SETTINGS_QUERY, "site-settings");
  const settings = data.settings[0];
  return {
    ...settings,
    tagLine: splitSentences(settings.tagLine),
  };
};
