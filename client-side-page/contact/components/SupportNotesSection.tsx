import { supportNotes } from "@/client-side-page/contact/contact.constants";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

export const SupportNotesSection = () => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Support Notes</h2>
        <p className="text-muted-foreground text-sm">
          A few quick expectations before you get in touch.
        </p>
      </div>

      <div className="grid gap-3">
        {supportNotes.map((note, index) => (
          <motion.div
            key={note.title}
            className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card/90 px-4 py-4 shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 + 0.1, ease: "easeOut" }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Icon icon={note.icon} width={20} height={20} />
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm font-semibold">{note.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{note.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};
