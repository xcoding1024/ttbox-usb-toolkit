import { IconApple, IconFolder, IconGooglePlay, IconSparkle, UsbHero } from "../components/icons";
import ttboxShot from "../assets/ttbox-app.webp";
import { ReportView } from "../components/ReportView";
import { VolumeCards } from "../components/VolumeCards";
import { interpolate, t } from "../i18n";
import { openReleasePage } from "../lib/updateClient";
import { useAppState } from "../state";

const TTBOX_APP_STORE_URL = "https://apps.apple.com/app/ttbox/id6757570385";
const TTBOX_GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.coding1024.ttbox";

export function OverviewPage() {
  const { volumes, busy, runDetect, chooseFolder, report, setPage } = useAppState();

  return (
    <div className="overview">
      <section className="hero">
        <UsbHero />
        <div className="hero-copy">
          <h1>{t.app.heroTitle}</h1>
          <p>{t.app.heroSubtitle}</p>
          <div className="hero-actions">
            <button type="button" className="primary pill" disabled={busy} onClick={() => void runDetect()}>
              <IconSparkle className="btn-icon" />
              {busy ? t.actions.scanning : t.actions.rescan}
            </button>
            <button type="button" className="ghost pill" onClick={() => void chooseFolder()}>
              <IconFolder className="btn-icon" />
              {t.actions.pickFolder}
            </button>
          </div>
        </div>
      </section>

      <section className="volumes-panel">
        <header className="volumes-head">
          <h2>{t.overview.volumesTitle}</h2>
          <span className="status-dot">
            <i />
            {interpolate(t.overview.volumesCount, { count: volumes.length })}
          </span>
        </header>
        <VolumeCards />
      </section>

      <section className="glass-card mobile-app">
        <img className="mobile-app-shot" src={ttboxShot} alt={t.overview.mobileAppAlt} />
        <div className="mobile-app-copy">
          <h2>{t.overview.mobileAppTitle}</h2>
          <p className="muted">{t.overview.mobileAppBody}</p>
          <div className="store-actions">
            <button type="button" className="ghost" onClick={() => void openReleasePage(TTBOX_APP_STORE_URL)}>
              <IconApple className="btn-icon" />
              {t.overview.appStore}
            </button>
            <button type="button" className="ghost" onClick={() => void openReleasePage(TTBOX_GOOGLE_PLAY_URL)}>
              <IconGooglePlay className="btn-icon" />
              {t.overview.googlePlay}
            </button>
          </div>
        </div>
      </section>

      <section className="scan-summary">
        <header className="page-head">
          <h2>{t.overview.scanTitle}</h2>
        </header>
        {report ? (
          <ReportView report={report} />
        ) : (
          <p className="muted">{busy ? t.content.scanning : t.overview.scanWaiting}</p>
        )}
        <p className="muted">
          <button type="button" className="linkish" onClick={() => setPage("settings")}>
            {t.overview.rulesHint}
          </button>
        </p>
      </section>
    </div>
  );
}
