import * as Sentry from "@sentry/nextjs";

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Replay may only be enabled for the client-side
    integrations: [
        Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
        }),
    ],

    // Set tracesSampleRate to 0.2 to capture 20%
    // of transactions for performance monitoring.
    // Adjust this value based on traffic volume and cost.
    tracesSampleRate: 0.2,

    // Capture Replay for 10% of all sessions,
    // plus 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    debug: false,
});
