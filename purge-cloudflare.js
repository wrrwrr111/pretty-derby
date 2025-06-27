import fs from 'fs';
import crypto from 'crypto';
import fetch from 'node-fetch';

const FILES = [
  { localPath: './public/locales/zh_CN.json', url: 'https://yourdomain.com/locales/zh_CN.json', hashKey: 'zh_CN_hash' },
  { localPath: './public/locales/en.json', url: 'https://yourdomain.com/locales/en.json', hashKey: 'en_hash' },
];

const CACHE_FILE = './.cache.json';

function getFileHash(path) {
  const content = fs.readFileSync(path);
  return crypto.createHash('md5').update(content).digest('hex');
}

async function purgeCache(filesToPurge) {
  if (filesToPurge.length === 0) {
    console.log('No files to purge.');
    return;
  }
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  const urls = filesToPurge.map(f => f.url);

  const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ files: urls }),
  });

  const data = await res.json();
  console.log('Cloudflare purge response:', data);
}

async function main() {
  let cache = {};
  if (fs.existsSync(CACHE_FILE)) {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  }

  const filesToPurge = [];

  for (const file of FILES) {
    const currentHash = getFileHash(file.localPath);
    if (cache[file.hashKey] !== currentHash) {
      console.log(`File changed: ${file.localPath}`);
      filesToPurge.push(file);
      cache[file.hashKey] = currentHash;
    } else {
      console.log(`No change: ${file.localPath}`);
    }
  }

  await purgeCache(filesToPurge);

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

main().catch(console.error);
