import { Bounce, toast } from "react-toastify";

interface IAlert {
    description: string;
};

export const errorAlert = ({ description }: IAlert) => {
    toast.error(description, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
    });
};

export const successAlert = ({ description }: IAlert) => {
    toast.success(description, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
    });
};
