/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  jsxRuntime: `automatic`,
  siteMetadata: {
    title: `FlyingSquirrel | Infrastructure & Kubernetes consulting`,
    titleTemplate: `%s · FlyingSquirrel`,
    description: `FlyingSquirrel helps engineering teams cut cloud waste, stabilize Kubernetes, and ship with confidence — integrated with how you already work.`,
    siteUrl: `https://aprilrieger.github.io`,
    twitterUsername: `@aprilrieger`,
  },
  pathPrefix: ``,
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `FlyingSquirrel`,
        short_name: `FlyingSquirrel`,
        start_url: `/`,
        background_color: `#fafaf9`,
        theme_color: `#0f766e`,
        display: `standalone`,
        icon: `${__dirname}/content/images/fs_logo.png`,
      },
    },
  ],
};
