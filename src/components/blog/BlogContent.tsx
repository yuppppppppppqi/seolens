import { marked } from "marked";

type Props = {
  content: string;
};

export default function BlogContent({ content }: Props) {
  const html = marked.parse(content, { async: false }) as string;

  return (
    <div
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
