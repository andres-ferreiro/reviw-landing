import Image from "next/image";

// QR & Distribution tile visual: the complete QR code, plain, no border/crop/effects.
export function QRPeek() {
  return (
    <div className="relative h-20 w-20">
      <Image src="/images/sample-qr.png" alt="Sample QR code" fill sizes="80px" className="object-contain" />
    </div>
  );
}
