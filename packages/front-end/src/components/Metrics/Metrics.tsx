"use client";
import { LoaderCircle } from "lucide-react";

// COMPONENTS
import { Card } from "@/components/Card/Card";
import { CustomError } from "@/components/CustomError/CustomError";

// CONTEXTS
import { useLinks } from "@/contexts/links-context";

// UTILS
import { createMetricLinks } from "@/utils/create-metric-links";

// METRICS COMPONENT
export const Metrics = () => {
    /* Hooks */
    const { registeredLinks, metrics, isLoadingLinks, isLoadingMetrics, errorLinksMetrics } = useLinks();

    /* Vars */
    const metricLinks = createMetricLinks(registeredLinks, metrics);
    const isLoading = isLoadingLinks || isLoadingMetrics;

    /* Utils */
    const renderLoading = (
        <div className="flex flex-col items-center gap-2">
            <LoaderCircle className="animate-spin size-12 text-cyan-600" />
            <p className="text-cyan-600 font-semibold animate-pulse">Loading...</p>
        </div>
    );

    const tableRanking = (
        <div className="flex justify-center items-center border border-cyan-100 dark:border-dark-border bg-cyan-50 dark:bg-light-text rounded-md py-4 px-8">
            <table className="flex flex-col gap-2">
                <thead className="w-full flex flex-col gap-2">
                    <tr className="flex justify-between w-60 md:w-96 text-sm md:text-base font-bold px-2 dark:text-dark-text text-light-text">
                        <th>CODE</th>
                        <th>CLICKS</th>
                    </tr>
                </thead>
                <tbody className="w-full flex flex-col gap-2">
                    {metricLinks.map(link => (
                        <tr key={link.code} className="flex justify-between w-60 md:w-96 text-xs md:text-sm text-light-text dark:text-dark-text">
                            <td>
                                <a
                                    href={`https://mylinkin.com/${link.code}`}
                                    target="_blank"
                                    className="px-2 cursor-pointer rounded-md hover:bg-cyan-200 dark:hover:bg-dark-placeholder transition-all duration-300"
                                >
                                    {link.code}
                                </a>
                            </td>
                            <td className="px-2">
                                {link.clicks}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const noRankedLinks = <p className="text-light-text">no links listed in the ranking.</p>;

    const renderRanking = errorLinksMetrics
        ? <CustomError />
        : metricLinks.length > 0
            ? tableRanking
            : noRankedLinks;

    /* Renders */
    return (
        <Card
            title="Top #5"
            description="This is the ranking of the top 5 most clicked shortened links."
            large
            component={isLoading && !errorLinksMetrics ? renderLoading : renderRanking}
        />
    );
};
