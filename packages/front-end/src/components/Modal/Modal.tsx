"use client";
import { Dispatch, SetStateAction } from "react";
import { Drawer } from "vaul";
import * as Dialog from "@radix-ui/react-dialog";

// HOOKS
import useMediaQuery from "@/hooks/use-media-query";

// MODAL COMPONENT INTERFACES
interface IModalProps {
    children: React.ReactNode;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

// MODAL COMPONENT
export const Modal = ({ children, showModal, setShowModal }: IModalProps) => {
    /* Hooks */
    const { isMobile } = useMediaQuery();

    /* Renders */
    if (isMobile) {
        return (
            <Drawer.Root open={showModal} onOpenChange={setShowModal}>
                <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur" />
                <Drawer.Portal>
                    <Drawer.Content
                        className="fixed bottom-0 left-0 right-0 z-50 mt-24 rounded-t-[10px] border-t border-gray-200 bg-white"
                    >
                        <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
                            <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
                        </div>
                        {children}
                    </Drawer.Content>
                    <Drawer.Overlay />
                </Drawer.Portal>
            </Drawer.Root>
      );
    }
    return (
        <Dialog.Root open={showModal} onOpenChange={setShowModal}>
            <Dialog.Portal>
                <Dialog.Overlay
                    id="modal-backdrop"
                    className="animate-fade-in fixed inset-0 z-40 bg-gray-100 bg-opacity-50 backdrop-blur-md"
                />
                <Dialog.Content
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    className="animate-scale-in fixed inset-0 z-40 m-auto max-h-fit w-full max-w-md overflow-hidden border border-gray-200 bg-white p-0 shadow-xl md:rounded-2xl"
                >
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
