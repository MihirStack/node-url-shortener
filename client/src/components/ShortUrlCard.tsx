import {
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  ShortUrl,
} from "../types/url";

interface Props {
  url: ShortUrl;
}

export default function ShortUrlCard({
  url,
}: Props) {
  const [copied, setCopied] =
    useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(
      url.shortUrl
    );

    setCopied(true);

    window.setTimeout(
      () => setCopied(false),
      1500
    );
  };

  return (
    <section className="result-card">
      <div>
        <span className="eyebrow">
          Your short link is ready
        </span>

        <a
          href={url.shortUrl}
          target="_blank"
          rel="noreferrer"
          className="short-link"
        >
          {url.shortUrl}

          <ExternalLink size={16} />
        </a>

        <p className="original-link">
          {url.originalUrl}
        </p>
      </div>

      <button
        onClick={copy}
        className="copy-button"
      >
        {copied ? (
          <>
            <Check size={18} />
            Copied
          </>
        ) : (
          <>
            <Copy size={18} />
            Copy
          </>
        )}
      </button>
    </section>
  );
}