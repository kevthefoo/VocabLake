/**
 * Analytics utilities for VocabLake
 * Add your tracking scripts here (Google Analytics, etc.)
 */

export const GoogleAnalytics = ({ measurementId }) => {
  if (!measurementId) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  );
};

export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

// Usage examples:
// trackEvent('vocabulary_search', { search_term: 'example' });
// trackEvent('vocab_export', { format: 'csv', count: 100 });
// trackEvent('review_complete', { words_reviewed: 10, accuracy: 85 });
