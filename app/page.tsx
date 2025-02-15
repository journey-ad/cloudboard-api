import { IconApps, IconBrandGithub } from '@tabler/icons-react';
import { useTranslations } from "next-intl";
import Link from '@/components/ui/Link';
import SwitchTheme from '@/components/ui/SwitchTheme';
import SwitchLang from '@/components/ui/SwitchLang';

// 使用常量管理快捷方式链接
const SHORTCUT_LINKS = {
  GET_CLIPBOARD: "https://www.icloud.com/shortcuts/b0ccf3de427c4540bf5a6ea9a631219a",
  SEND_CLIPBOARD: "https://www.icloud.com/shortcuts/8c2e8b9f06484cc98134b807e73a7767"
} as const;

// 提取代码样式为可重用组件
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-orange-400/[.3] dark:bg-white/[.3] px-1 py-0.5 rounded font-normal">
    {children}
  </code>
);

// 提取按钮组件
interface ActionButtonProps {
  href: string;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const ActionButton = ({ href, icon, variant = 'primary', children }: ActionButtonProps) => {
  const baseStyles = "rounded-full transition-colors flex items-center justify-center text-base px-6 py-3 min-w-[50vw] sm:min-w-36";
  const variantStyles = variant === 'primary'
    ? "bg-[#765015] text-white gap-2 hover:bg-[#37260a] dark:text-foreground dark:bg-blue-950 dark:hover:bg-blue-900 border-transparent"
    : "border border-solid border-[#37260a]/[.3] dark:border-white/[.145] hover:bg-[#765015] hover:text-white dark:hover:bg-blue-950 hover:border-transparent";

  return (
    <a className={`${baseStyles} ${variantStyles}`} href={href} target="_blank" rel="noopener noreferrer">
      {icon}
      {children}
    </a>
  );
};

export default function Home() {
  const t = useTranslations();

  return (
    <div className="h-screen overflow-y-auto scroll-smooth relative bg-gradient-to-b from-white to-yellow-50 dark:bg-none dark:bg-[#020314]">

      <div className="absolute z-50 top-4 right-4 flex gap-4">
        <SwitchTheme />
        <SwitchLang />
      </div>

      <main className="relative z-10 max-w-5xl min-h-screen mx-auto flex flex-col justify-center gap-8 px-6 sm:px-8 py-12 sm:py-20">
        <div className="absolute z-0 top-0 left-[-15%] w-3/5 h-3/5 bg-gradient-to-t from-yellow-100 dark:from-cyan-600 to-transparent rounded-full filter blur-[160px] opacity-30 pointer-events-none"></div>

        <header className="relative z-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold font-['Bungee_Shade']">{t("Index.title")}</h1>
          <h4 className="mt-4">{t("Index.subtitle")}</h4>
        </header>

        <section className="usage relative z-10">
          <h4 className="text-lg font-bold mb-4">{t("Index.usage.how_to_use")}</h4>
          <ol className="leading-[1.375] list-inside list-decimal text-sm sm:text-base text-left break-all font-[family-name:var(--font-geist-mono)]">
            <li className="mb-4 min-w-0">
              <span>
                {t.rich("Index.usage.download_latest_version", {
                  link: (chunks) => <Link href="https://github.com/journey-ad/cloudboard/releases/latest" isExternal>{chunks}</Link>
                })}
              </span>
              <ol className="pl-5 sm:pl-6 list-inside list-disc text-sm text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-1">
                  {t.rich("Index.usage.fill_in_api_endpoint", {
                    b: (chunks) => <b>{chunks}</b>,
                    code: (chunks) => <CodeBlock>{chunks}</CodeBlock>
                  })}
                </li>
                <li className="mb-1">
                  {t.rich("Index.usage.fill_in_e2e_encryption", {
                    b: (chunks) => <b>{chunks}</b>,
                    code: (chunks) => <CodeBlock>{chunks}</CodeBlock>
                  })}
                </li>
              </ol>
            </li>
            <li className="mb-4">
              {t.rich("Index.usage.install_scriptable", {
                link: (chunks) => <Link href="https://apps.apple.com/cn/app/scriptable/id1405459188" isExternal>{chunks}</Link>
              })}
              <ol className="pl-5 sm:pl-6 list-inside list-disc text-sm text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-1">
                  {t.rich("Index.usage.import_encrypt_helper", {
                    link: (chunks) => <Link href="https://raw.githubusercontent.com/journey-ad/cloudboard/master/docs/CloudboardEncryptHelper.js" isExternal>{chunks}</Link>
                  })}
                </li>
              </ol>
            </li>
            <li className="mb-4">
              {t("Index.usage.install_shortcut")}
              <ol className="pl-5 sm:pl-6 list-inside list-disc text-sm text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-1">
                  {t("Index.usage.get_clipboard")}{" "}
                  <Link href={SHORTCUT_LINKS.GET_CLIPBOARD} isExternal>{SHORTCUT_LINKS.GET_CLIPBOARD}</Link>
                </li>
                <li className="mb-1">
                  {t("Index.usage.send_clipboard")}{" "}
                  <Link href={SHORTCUT_LINKS.SEND_CLIPBOARD} isExternal>{SHORTCUT_LINKS.SEND_CLIPBOARD}</Link>
                </li>
              </ol>
            </li>
            <li className="mb-4">
              {t.rich("Index.usage.configure_shortcut", {
                code: (chunks) => <CodeBlock>{chunks}</CodeBlock>
              })}
            </li>
            <li className="mb-4">
              {t("Index.usage.enjoy_it")}
            </li>
          </ol>
        </section>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <ActionButton
            href="https://github.com/journey-ad/cloudboard/releases/latest"
            icon={<IconApps stroke={2} size={20} />}
            variant="primary"
          >
            {t("Index.buttons.download_now")}
          </ActionButton>

          <ActionButton
            href="https://github.com/journey-ad/cloudboard"
            icon={<IconBrandGithub stroke={2} size={20} className="mr-1" />}
            variant="secondary"
          >
            {t("Index.buttons.source_code")}
          </ActionButton>
        </div>
      </main>
    </div>
  );
}
