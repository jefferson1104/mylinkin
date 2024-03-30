import { OctagonAlert } from "lucide-react"

interface ICustomError {
    title?: string;
    description?: string;
}

export const CustomError = ({ title, description }: ICustomError) => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <OctagonAlert
                className="size-8 md:size-12 text-red-500"
            />
            <div className="flex flex-col items-center">
                <h2 className="text-base md:text-lg text-zinc-900 font-bold">
                    {title ? title : 'Error'}
                </h2>
                <p className="text-zinc-500 text-xs md:text-base">
                    {description ? description : 'Unexpected error, unable to load data'}
                </p>
            </div>
        </div>
    );
}
