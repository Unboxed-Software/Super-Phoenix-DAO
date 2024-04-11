export interface YoutubeVideoProps {
  src: string;
  height: number;
}

export function YoutubeVideo(props: YoutubeVideoProps) {
  const { src, height } = props;

  return (
    <div className="aspect-h-9 aspect-w-16 mx-3">
      <iframe
        className="rounded-lg"
        style={{ maxWidth: '100%' }}
        src={src}
        frameBorder="0"
        height={height}
        width={(height * 16) / 9}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}