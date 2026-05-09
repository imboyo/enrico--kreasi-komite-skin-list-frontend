import { supportNotes } from "@/client-side-page/contact/contact.constants";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

export const SupportNotesSection = () => {
  return (
    <>
      {/* Section header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">Support Notes</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          A few quick expectations before you get in touch.
        </p>
      </div>

      {/* 3-column grid on md+ — cards are always vertical (icon top, text below) */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {supportNotes.map((note, index) => (
          <motion.div
            key={note.title}
            className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/90 px-5 py-5 shadow-sm transition-shadow hover:shadow-md lg:px-6 lg:py-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 + 0.1, ease: "easeOut" }}
          >
            {/* Note icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground lg:h-12 lg:w-12">
              <Icon icon={note.icon} width={20} height={20} className="lg:hidden" />
              <Icon icon={note.icon} width={24} height={24} className="hidden lg:block" />
            </div>

            {/* Note content */}
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold lg:text-base">{note.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed lg:text-sm">
                {note.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};
