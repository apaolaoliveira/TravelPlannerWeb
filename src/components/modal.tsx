import { X } from "lucide-react";
import { ReactNode } from "react";
import { VariantProps, tv } from "tailwind-variants";

const modalVariants = tv({
  variants: {
    size: {
      max: 'w-max',
      large: 'w-[640px]',
    }
  },

  defaultVariants: {
    size:'max',
  },
});

interface ModalProps extends VariantProps<typeof modalVariants> {
 title: string;
 closeModal: () => void;
 description: ReactNode;
 children: ReactNode;
}

export function Modal({ title, description, size, closeModal, children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className={`${modalVariants({size})} rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5`}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button type="button" onClick={closeModal}>
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>
          
          <p className="text-sm text-zinc-400 text-left">
            {description}
          </p>
        </div>
    
        {children}
      </div>
    </div>
  )
}