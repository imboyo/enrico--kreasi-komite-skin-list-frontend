import { Icon } from "@iconify/react";

type FloatingAddButtonProps = {
  onClick: () => void;
};

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    // Fixed FAB aligned inside the 500px content shell
    <div className="fixed inset-x-0 bottom-6 z-40 mx-auto flex max-w-125 justify-end px-4">
      <button
        type="button"
        aria-label="Tambah skin treat"
        onClick={onClick}
        className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95"
      >
        <Icon icon="lucide:plus" className="size-6" />
      </button>
    </div>
  );
}
