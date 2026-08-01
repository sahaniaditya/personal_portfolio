import { ArrowLeft, ArrowUpRight, Github, PlayCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Tags } from "@/components/common/tags";
import { shippedProducts } from "@/config/shipped";
import { siteConfig } from "@/config/site";

import "../../portfolio.css";

interface Props {
  params: { slug: string };
}

/** Pre-render every product page at build time. */
export function generateStaticParams() {
  return shippedProducts.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = shippedProducts.find((p) => p.slug === params.slug);
  if (!product) return { title: "Not found" };

  return {
    title: `${product.name} — ${siteConfig.authorName}`,
    description: product.tagline,
    alternates: { canonical: `${siteConfig.url}shipped/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${siteConfig.authorName}`,
      description: product.tagline,
      type: "website",
    },
  };
}

export default function ShippedProductPage({ params }: Props) {
  const product = shippedProducts.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return (
    <div className="ed">
      <header className="ed-head">
        <div className="ed-head-inner">
          <Link href="/" className="ed-wordmark">
            Aditya Sahani
          </Link>
          <nav className="ed-nav">
            <Link href="/#shipped">Shipped</Link>
            <Link href="/#work">Work</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="sp">
        <div className="ed-wrap">
          <Link href="/#shipped" className="sp-back">
            <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
            All shipped products
          </Link>

          <div className="sp-head">
            <span className="ed-label sp-status" data-status={product.status}>
              <span className="sp-dot" />
              {product.status}
            </span>
            <h1 className="sp-title">{product.name}</h1>
            <p className="sp-tagline">{product.tagline}</p>

            <div className="sp-actions">
              <a
                href={product.url}
                target="_blank"
                rel="noreferrer"
                className="sp-cta"
              >
                Open {product.name}
                <ArrowUpRight size={15} strokeWidth={1.9} aria-hidden="true" />
              </a>
              {product.repo && (
                <a
                  href={product.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="sp-secondary"
                >
                  <Github size={14} strokeWidth={1.75} aria-hidden="true" />
                  Source
                </a>
              )}
            </div>
          </div>

          {/* Demo. A path starting with "/" is a file we host, so it plays in
              a native <video>; anything else is treated as an embed URL. With
              no videoUrl at all it falls back to a placeholder frame, so the
              layout is identical in all three cases. */}
          <div className="sp-video">
            {product.videoUrl?.startsWith("/") ? (
              <video
                src={product.videoUrl}
                poster={product.videoPoster}
                controls
                playsInline
                preload="metadata"
                aria-label={`${product.name} demo video`}
              />
            ) : product.videoUrl ? (
              <iframe
                src={product.videoUrl}
                title={`${product.name} demo video`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="sp-video-empty">
                <PlayCircle size={30} strokeWidth={1.4} aria-hidden="true" />
                <p className="sp-video-label">Demo video</p>
                <p className="sp-video-hint">
                  Set <code>videoUrl</code> on this product in{" "}
                  <code>config/shipped.ts</code>
                </p>
              </div>
            )}
          </div>

          <div className="sp-body">
            <div className="sp-main">
              <h2 className="ed-label sp-h">Overview</h2>
              {product.summary.map((para) => (
                <p key={para.slice(0, 32)} className="sp-para">
                  {para}
                </p>
              ))}

              <h2 className="ed-label sp-h sp-h--spaced">
                {product.roadmap ? "Working today" : "What it does"}
              </h2>
              <ul className="sp-features">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              {product.roadmap && (
                <>
                  <h2 className="ed-label sp-h sp-h--spaced">Planned</h2>
                  <ul className="sp-features sp-features--planned">
                    {product.roadmap.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <aside className="sp-aside">
              <div className="sp-meta">
                <span className="ed-label">Shipped</span>
                <span className="sp-meta-value">{product.year}</span>
              </div>
              {product.metric && (
                <div className="sp-meta">
                  <span className="ed-label">Usage</span>
                  <span className="sp-meta-value">{product.metric}</span>
                </div>
              )}
              <div className="sp-meta">
                <span className="ed-label">Built with</span>
                <Tags items={product.stack} />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
