import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";
import { ArticleJsonLd } from "@/components/articles/ArticleJsonLd";
import { getArticleBySlug, getPublishedArticleSlugs } from "@/lib/articles";
import { formatThaiDate, readingTimeMin } from "@/lib/format";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Best Solutions Skill`,
    description: article.excerpt ?? undefined,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.coverImage ? [article.coverImage] : undefined,
      publishedTime: article.publishedAt ?? undefined,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <SiteNavbar />
      <main id="top">
        <article className="section">
          <div className="container article">
            <header className="article-head js-reveal">
              {article.tags.length > 0 ? (
                <span className="tag">{article.tags[0]}</span>
              ) : null}
              <h1>{article.title}</h1>
              <div className="article-meta">
                {article.publishedAt ? (
                  <time dateTime={article.publishedAt}>
                    {formatThaiDate(article.publishedAt)}
                  </time>
                ) : null}
                <span>· อ่าน {readingTimeMin(article.content)} นาที</span>
                <span>· {article.author}</span>
              </div>
            </header>
            {article.coverImage ? (
              <figure className="article-cover js-reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.coverImage} alt={article.title} />
              </figure>
            ) : null}
            <div className="article-body js-reveal">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
        <ArticleJsonLd article={article} />
      </main>
      <Footer />
    </>
  );
}
