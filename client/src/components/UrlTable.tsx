import { Copy, ExternalLink, Trash2 } from "lucide-react";

import type { ShortUrl } from "../types/url";

interface Props {
  urls: ShortUrl[];
  deleting: boolean;

  onDelete: (id: string) => void;
}

export default function UrlTable({ urls, deleting, onDelete }: Props) {
  if (urls.length === 0) {
    return (
      <div className="empty-state">
        <h3>No links yet</h3>

        <p>Create your first short URL above.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {urls.map((url) => (
            <tr key={url.id}>
              <td>
                <a href={url.originalUrl} target="_blank" rel="noreferrer">
                  {url.originalUrl}
                </a>
              </td>

              <td>
                <a href={url.shortUrl} target="_blank" rel="noreferrer">
                  {url.shortCode}
                  <ExternalLink size={13} />
                </a>
              </td>

              <td>
                <strong>{url.clickCount}</strong>
              </td>

              <td>{new Date(url.createdAt).toLocaleDateString()}</td>

              <td className="actions">
                <button
                  title="Copy"
                  onClick={() => navigator.clipboard.writeText(url.shortUrl)}
                >
                  <Copy size={17} />
                </button>

                <button
                  title="Delete"
                  disabled={deleting}
                  onClick={() => onDelete(url.id)}
                >
                  <Trash2 size={17} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
