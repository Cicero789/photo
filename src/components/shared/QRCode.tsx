export function QRCode({ url, size = 200 }: { url: string; size?: number }) {
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&margin=10`;
  return (
    <div className="inline-flex flex-col items-center gap-2">
      <img src={src} alt="QR Code" width={size} height={size} className="rounded-xl border" />
      <button onClick={() => navigator.clipboard?.writeText(url)}
        className="text-xs text-primary-600 hover:text-primary-700 font-medium">
        📋 Copy link
      </button>
    </div>
  );
}
