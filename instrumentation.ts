import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { LoggerProvider, SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';

export function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const token = process.env.NEXT_PUBLIC_POSTHOG_LOGS_TOKEN;
  if (!token) {
    console.warn(
      '[instrumentation] NEXT_PUBLIC_POSTHOG_LOGS_TOKEN not set — skipping log shipping'
    );
    return;
  }

  const exporter = new OTLPLogExporter({
    url: 'https://us.i.posthog.com/otlp/v1/logs',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const loggerProvider = new LoggerProvider({
    resource: resourceFromAttributes({
      'service.name': 'olgasite',
    }),
    processors: [new SimpleLogRecordProcessor(exporter)],
  });

  (globalThis as unknown as { __posthogLogger?: unknown }).__posthogLogger =
    loggerProvider.getLogger('olgasite');
}
