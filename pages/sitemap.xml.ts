import { Page } from "@/interfaces";
import { GetServerSideProps } from "next";

const relativeLink = (link: string) => (link[0] == "/" ? link : `/${link}`);
const getPages = async () => {
  const res = await fetch(`${process.env.API_URL}pages`);
  const { docs }: Page = await res.json();

  return docs.map(({ slug }) => process.env.APP_URL + relativeLink(slug));
};

const SiteMap = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const allPaths = await getPages();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
    .map((url: string) => {
      return `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
    `;
    })
    .join("")}
  </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
