"use client";
import { LoaderCircle } from "lucide-react";

// COMPONENTS
import { Card } from "../Card/Card";
import { CustomError } from "../CustomError/CustomError";

// CONTEXTS
import { useLinks } from "@/app/contexts/links-context";

// UTILS
import { createMetricLinks } from "@/app/utils/create-metric-links";

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
        <div className="flex justify-center items-center bg-stone-100 rounded-md py-4 px-8">
            <table className="flex flex-col gap-2">
                <thead className="w-full flex flex-col gap-2">
                    <tr className="flex justify-between w-60 md:w-96 text-sm md:text-base font-bold px-2">
                        <th>CODE</th>
                        <th>CLICKS</th>
                    </tr>
                </thead>
                <tbody className="w-full flex flex-col gap-2">
                    {metricLinks.map(link => (
                        <tr key={link.code} className="flex justify-between w-60 md:w-96 text-xs md:text-sm">
                            <td>
                                <a
                                    href={`${process.env.NEXT_PUBLIC_API}/${link.code}`}
                                    target="_blank"
                                    className="px-2 cursor-pointer rounded-md hover:bg-zinc-300 transition-all duration-300"
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

    const noRankedLinks = <p className="text-zinc-700">no links listed in the ranking.</p>;

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
