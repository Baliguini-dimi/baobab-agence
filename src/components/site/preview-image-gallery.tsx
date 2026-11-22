import Image from "next/image";
import type { Locale } from "@/content/schema";
import type { PreviewImage } from "@/config/media";

export function PreviewImageGallery({
  images,
  locale,
  className = "",
}: {
  images: PreviewImage[];
  locale: Locale;
  className?: string;
}) {
  if (images.length === 0) return null;

  return (
    <div className={`preview-image-gallery ${className}`}>
      {images.map((image) => (
        <figure className="preview-image-item" key={image.id}>
          <div className="preview-image-frame" data-ratio={image.ratio}>
            <Image
              alt={image.alt[locale]}
              className="preview-image"
              height={image.height}
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 40vw"
              src={image.src}
              width={image.width}
            />
          </div>
          <figcaption className="preview-image-caption">{image.caption[locale]}</figcaption>
        </figure>
      ))}
    </div>
  );
}
