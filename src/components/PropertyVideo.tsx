interface PropertyVideoProps {
  className?: string;
}

export default function PropertyVideo({ className = "" }: PropertyVideoProps) {
  return (
    <div className={`mx-auto w-full max-w-5xl ${className}`}>
      <div className="aspect-video overflow-hidden bg-neutral-100 shadow-[0_18px_45px_rgba(26,26,26,0.12)]">
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/zZTcpSxtztU?si=gEp7X2Yc4xI7FxZj"
          title="Brač Estate video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
