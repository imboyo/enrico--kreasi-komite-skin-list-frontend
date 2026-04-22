import { appConfig } from "@/config";
import { Icon } from "@iconify/react";

export function NotLoginFooter() {
  const currentYear = new Date().getFullYear();
  const { githubUsername } = appConfig.developer;
  const developerGithubHref = `https://github.com/${githubUsername}`;

  return (
    <footer className="flex items-center justify-center pb-4">
      <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
        <Icon
          icon="material-symbols:spa-outline-rounded"
          width={14}
          height={14}
          className="text-orange-500"
        />
        <span>Skin List</span>
        <span aria-hidden="true">·</span>
        <span>{currentYear}</span>
        <span aria-hidden="true">·</span>
        <a
          href={developerGithubHref}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-2 transition hover:text-foreground hover:underline"
        >
          Develop By @{githubUsername}
        </a>
      </div>
    </footer>
  );
}
