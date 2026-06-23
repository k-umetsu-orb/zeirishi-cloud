import type { GetServerSideProps } from 'next';
import { buildListUrls } from '@/lib/sitemapData';
import { buildSitemapXml, getSitemapChunk, sendXml } from '@/lib/sitemap';

const CHUNK_SIZE = 3000;
const PART_NUMBER = 4;
const TOTAL_PARTS = 5;

export default function SitemapList04() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const chunk = getSitemapChunk(buildListUrls(), CHUNK_SIZE, PART_NUMBER, TOTAL_PARTS);
  sendXml(res, buildSitemapXml(chunk));
  return { props: {} };
};
