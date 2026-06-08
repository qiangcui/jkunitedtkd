export function assetUrl(path: string): string {
  const trimmed = path.startsWith('/') ? path.slice(1) : path;
  // Linux hosts (e.g. Vercel) store Korean filenames in NFC; macOS often uses NFD.
  const nfcPath = trimmed.normalize('NFC');
  const encoded = nfcPath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `${import.meta.env.BASE_URL}${encoded}`;
}
