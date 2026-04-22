import { contactChannels } from "@/client-side-page/contact/contact.constants";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "motion/react";

export const ContactChannelsSection = () => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Contact Channels</h2>
        <p className="text-muted-foreground text-sm">
          Each option is grouped by how people usually reach out to the team.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {contactChannels.map((channel, index) => (
          <motion.div
            key={channel.title}
            className="rounded-2xl border border-border/70 bg-card/90 p-4 shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon icon={channel.icon} width={22} height={22} />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold">{channel.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {channel.description}
                  </p>
                </div>

                <Link
                  href={channel.href}
                  className="text-sm font-medium break-all text-primary underline-offset-4 hover:underline"
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
