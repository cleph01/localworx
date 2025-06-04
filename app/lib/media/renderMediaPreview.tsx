// Determine appropriate media preview component (image or embed)
export const renderMediaPreview = (media_url: string, media_type: string) => {
  if (!media_url) return null;

  if (media_type === "image") {
    return (
      <img
        src={media_url}
        alt="Image Preview"
        className="w-full h-64 mt-2 rounded-xl border border-gray-200 object-cover shadow-sm"
      />
    );
  }

  // Match common YouTube and Vimeo patterns
  const youTubeMatch = media_url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
  );
  const vimeoMatch = media_url.match(/vimeo\.com\/(\d+)/);

  if (youTubeMatch) {
    const id = youTubeMatch[1];
    return (
      <iframe
        className="w-full h-64 mt-2 rounded-xl border border-gray-200 object-cover shadow-sm"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube Preview"
        allowFullScreen
      />
    );
  }

  if (vimeoMatch) {
    const id = vimeoMatch[1];
    return (
      <iframe
        className="w-full h-64 mt-2 rounded-xl border border-gray-200 object-cover shadow-sm"
        src={`https://player.vimeo.com/video/${id}`}
        title="Vimeo Preview"
        allowFullScreen
      />
    );
  }

  // Basic image preview fallback
  if (media_url.match(/\.(jpeg|jpg|gif|png|webp)$/)) {
    return (
      <img
        src={media_url}
        alt="Image Preview"
        className="w-full h-64 mt-2 rounded-xl border border-gray-200 object-cover shadow-sm"
      />
    );
  }

  return (
    <p className="text-sm text-gray-500 mt-2">Unrecognized media format.</p>
  );
};
