import type { Article } from "@/lib/articles";
import { formatThaiDate } from "@/lib/format";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <a className="card card-hover article-card" href={`/articles/${article.slug}`}>
      {article.coverImage ? (
        <div className="article-card-shot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.coverImage} alt={article.title} loading="lazy" />
        </div>
      ) : null}
      <div className="article-card-body">
        {article.tags.length > 0 ? (
          <span className="tag">{article.tags[0]}</span>
        ) : null}
        <h3 className="article-card-title">{article.title}</h3>
        {article.excerpt ? (
          <p className="text-dim article-card-excerpt">{article.excerpt}</p>
        ) : null}
        {article.publishedAt ? (
          <time className="article-card-date text-dim" dateTime={article.publishedAt}>
            {formatThaiDate(article.publishedAt)}
          </time>
        ) : null}
      </div>
    </a>
  );
}
