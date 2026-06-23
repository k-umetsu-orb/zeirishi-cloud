import type { GetServerSideProps } from 'next';
import { buildStationListUrls } from '@/lib/sitemapData';
import { buildSitemapXml, getSitemapChunk, sendXml } from '@/lib/sitemap';

const CHUNK_SIZE = 10000;
const PART_NUMBER = 4;
const TOTAL_PARTS = 4;

export default function SitemapListSta04() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const chunk = getSitemapChunk(buildStationListUrls(), CHUNK_SIZE, PART_NUMBER, TOTAL_PARTS);
  sendXml(res, buildSitemapXml(chunk));
  return { props: {} };
};
