import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://c4b87e1885a62691a7f7234fee6bd113@o4509097520332800.ingest.de.sentry.io/4509097527738448",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});
