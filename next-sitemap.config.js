/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || "https://kagi.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
}
