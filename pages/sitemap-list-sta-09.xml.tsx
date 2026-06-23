import type { GetServerSideProps } from 'next';
import { buildStationListUrls } from '@/lib/sitemapData';
import { buildSitemapXml, getSitemapChunk, sendXml } from '@/lib/sitemap';

const CHUNK_SIZE = 3000;
const PART_NUMBER = 9;
const TOTAL_PARTS = 14;

export default function SitemapListSta09() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const chunk = getSitemapChunk(buildStationListUrls(), CHUNK_SIZE, PART_NUMBER, TOTAL_PARTS);
  sendXml(res, buildSitemapXml(chunk));
  return { props: {} };
};
