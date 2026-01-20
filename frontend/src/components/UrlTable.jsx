import React from 'react';
import { Copy, QrCode, Trash2, ExternalLink, BarChart, Play } from 'lucide-react';

export default function UrlTable({ urls, onDelete, onQR }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const testRedirect = (shortId) => {
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const shortUrl = `${backendUrl}/r/${shortId}`;
    window.open(shortUrl, '_blank');
  };

  const shortUrl = (shortId) => {
    // Use the backend URL for redirects
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    return `${backendUrl}/r/${shortId}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Short URL</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Original URL</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Clicks</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {urls.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No URLs yet. Create your first short link!
                </td>
              </tr>
            ) : (
              urls.map((url) => (
                <tr key={url._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{url.title || 'Untitled'}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(url.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <a
                        href={shortUrl(url.shortId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 font-mono text-sm hover:underline"
                        title="Click to test redirect"
                      >
                        {shortUrl(url.shortId)}
                      </a>
                      <button
                        onClick={() => copyToClipboard(shortUrl(url.shortId))}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                        title="Copy"
                      >
                        <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={url.longUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 max-w-xs truncate"
                    >
                      {url.longUrl}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <BarChart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">{url.clicks}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => testRedirect(url.shortId)}
                        className="p-2 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg transition-colors"
                        title="Test Redirect"
                      >
                        <Play className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </button>
                      <button
                        onClick={() => onQR(url)}
                        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                        title="QR Code"
                      >
                        <QrCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </button>
                      <button
                        onClick={() => onDelete(url._id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
