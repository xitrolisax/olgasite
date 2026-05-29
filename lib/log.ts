import { SeverityNumber } from '@opentelemetry/api-logs';

type OtelLogger = {
  emit: (record: {
    severityNumber: SeverityNumber;
    severityText: string;
    body: string;
    attributes?: Record<string, unknown>;
  }) => void;
};

function getLogger(): OtelLogger | undefined {
  return (globalThis as unknown as { __posthogLogger?: OtelLogger })
    .__posthogLogger;
}

type Attrs = Record<string, unknown> | undefined;

export function logInfo(message: string, attributes?: Attrs): void {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message, attributes ?? '');
  }
  getLogger()?.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    body: message,
    attributes,
  });
}

export function logWarn(message: string, attributes?: Attrs): void {
  console.warn(message, attributes ?? '');
  getLogger()?.emit({
    severityNumber: SeverityNumber.WARN,
    severityText: 'WARN',
    body: message,
    attributes,
  });
}

export function logError(message: string, attributes?: Attrs): void {
  console.error(message, attributes ?? '');
  getLogger()?.emit({
    severityNumber: SeverityNumber.ERROR,
    severityText: 'ERROR',
    body: message,
    attributes,
  });
}
