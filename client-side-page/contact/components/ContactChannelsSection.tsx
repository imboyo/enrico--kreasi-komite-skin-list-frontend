import { contactChannels } from "@/client-side-page/contact/contact.constants";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "motion/react";

export const ContactChannelsSection = () => {
  return (
    <>
      {/* Section header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">Contact Channels</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Each option is grouped by how people usually reach out to the team.
        </p>
      </div>

      {/* 2-col on sm, 4-col on lg — cards go vertical on lg so they fit the narrower columns */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {contactChannels.map((channel, index) => (
          <motion.div
            key={channel.title}
            className="rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm transition-shadow hover:shadow-md"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
          >
            {/* Mobile: icon + text side by side; desktop: icon top, text below */}
            <div className="flex items-start gap-4 lg:flex-col lg:gap-3">
              {/* Channel icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon icon={channel.icon} width={22} height={22} />
              </div>

              {/* Channel info */}
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <h3 className="text-sm font-semibold">{channel.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {channel.description}
                </p>
                <Link
                  href={channel.href}
                  className="mt-0.5 break-all text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {channel.value}
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};
