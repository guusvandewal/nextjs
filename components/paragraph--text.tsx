import { ParagraphProps } from "components/paragraph";
export function ParagraphText({ paragraph, ...props }: ParagraphProps) {
  return (
    <section>
      {paragraph.field_header_text && (
        <h2
          className="mb-4 text-2 font-black leading-tight"
          dangerouslySetInnerHTML={{ __html: paragraph.field_header_text }}
        />
      )}
      {paragraph.field_text && (
        <div
          dangerouslySetInnerHTML={{ __html: paragraph.field_text.processed }}
        />
      )}
    </section>
  );
}
