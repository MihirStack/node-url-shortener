import { useState } from "react";

import UrlForm from "../components/UrlForm";
import ShortUrlCard from "../components/ShortUrlCard";
import UrlTable from "../components/UrlTable";

import { useUrls } from "../hooks/useUrls";
import { useCreateUrl } from "../hooks/useCreateUrl";
import { useDeleteUrl } from "../hooks/useDeleteUrl";

import type { ShortUrl } from "../types/url";

export default function HomePage() {
  const [createdUrl, setCreatedUrl] = useState<ShortUrl | null>(null);

  const urlsQuery = useUrls();
  const createMutation = useCreateUrl();
  const deleteMutation = useDeleteUrl();

  const createUrl = async (originalUrl: string) => {
    const result = await createMutation.mutateAsync({
      originalUrl,
    });

    setCreatedUrl(result);
  };

  return (
    <main>
      <section className="hero">
        <span className="badge">Fast • Simple • Trackable</span>

        <h1>
          Short links.
          <br />
          <span>Big possibilities.</span>
        </h1>

        <p>
          Turn long, messy URLs into clean links and track how many times
          they're opened.
        </p>

        <UrlForm loading={createMutation.isPending} onSubmit={createUrl} />

        {createMutation.isError && (
          <p className="api-error">Unable to shorten this URL.</p>
        )}

        {createdUrl && <ShortUrlCard url={createdUrl} />}
      </section>

      <section className="links-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Dashboard</span>

            <h2>Your Links</h2>
          </div>

          <span>{urlsQuery.data?.length ?? 0} links</span>
        </div>

        {urlsQuery.isLoading ? (
          <p>Loading links...</p>
        ) : urlsQuery.isError ? (
          <p>Failed to retrieve links.</p>
        ) : (
          <UrlTable
            urls={urlsQuery.data ?? []}
            deleting={deleteMutation.isPending}
            onDelete={(id) => deleteMutation.mutate(id)}
          />
        )}
      </section>
    </main>
  );
}
