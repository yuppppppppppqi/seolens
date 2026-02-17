import { marked } from "marked";

type Props = {
  content: string;
  sectionImages?: string[];
};

function injectSectionImages(html: string, images: string[]): string {
  let h2Count = 0;
  let imageIndex = 0;
  return html.replace(/<\/h2>/g, (match) => {
    h2Count++;
    if (h2Count === 1) return match;
    if (imageIndex < images.length) {
      const src = images[imageIndex];
      imageIndex++;
      return `${match}\n<figure class="blog-section-image"><img src="${src}" alt="" loading="lazy" decoding="async" /></figure>`;
    }
    return match;
  });
}

export default function BlogContent({ content, sectionImages }: Props) {
  const rawHtml = marked.parse(content, { async: false }) as string;

  if (!sectionImages || sectionImages.length === 0) {
    return (
      <div
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: rawHtml }}
      />
    );
  }

  const html = injectSectionImages(rawHtml, sectionImages);

  return (
    <div
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
