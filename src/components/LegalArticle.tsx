import { Link } from '@/i18n/navigation';

type Props = {
  title: string;
  updated: string;
  intro: string;
  demoNote: string;
  backHome: string;
  children: React.ReactNode;
};

export default function LegalArticle({
  title,
  updated,
  intro,
  demoNote,
  backHome,
  children
}: Props) {
  return (
    <main className="legal">
      <div className="legal__container">
        <Link href="/" className="legal__back">
          ← {backHome}
        </Link>
        <h1 className="legal__title">{title}</h1>
        <p className="legal__updated">{updated}</p>
        <p className="legal__intro">{intro}</p>
        {children}
        <p className="legal__demo-note">{demoNote}</p>
      </div>
    </main>
  );
}
