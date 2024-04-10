import { ILink, ILinkMetric, ISimpleLinkMetric } from "@/interfaces/link";

export const createMetricLinks = (links: ILink[], metrics: ISimpleLinkMetric[]) => {
    const metricMap = new Map<number, number>(metrics.map(item => [item.shortLinkId, item.clicks]));

    const result: ILinkMetric[] = [];

    for (const link of links) {
      if (metricMap.has(link.id)) {
        result.push({
          created_at: link.created_at,
          original_url: link.original_url,
          code: link.code,
          clicks: metricMap.get(link.id) || 0,
        });

        metricMap.delete(link.id);

        if (metricMap.size === 0) break;
      }
    }

    result.sort((a, b) => b.clicks - a.clicks);

    return result;
};
