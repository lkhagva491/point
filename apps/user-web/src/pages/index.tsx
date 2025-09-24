import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useState, useEffect } from 'react' // Import useState and useEffect

export default function Home() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>{t('home_page_title')}</title>
        <meta name="description" content={t('home_meta_description')} />
      </Head>
      
      <div className="min-h-screen bg-background-secondary">
        {/* Header */}
        <header className="bg-background-secondary shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-text-primary">Point</h1>
              <nav className="flex items-center space-x-4">
                <LanguageSwitcher />
                <Link href="/login" className="text-text-primary hover:text-text-primary">
                  {mounted ? t('login_nav_link') : 'Login'}
                </Link>
                <Link href="/register" className="text-text-primary hover:text-text-primary">
                  {mounted ? t('signup_nav_link') : 'Sign Up'}
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main>
          <div className="hero-gradient">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-4xl font-extrabold text-text-secondary sm:text-5xl md:text-6xl">
                  {t('hero_title')}
                </h2>
                <p className="mt-3 max-w-md mx-auto text-base text-text-secondary sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  {t('hero_subtitle')}
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <Link href="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-text-primary bg-background-secondary hover:bg-background-secondary/80 md:py-4 md:text-lg md:px-10">
                      {t('get_started_button')}
                    </Link>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <Link href="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-text-primary bg-background-primary hover:bg-background-primary/80 md:py-4 md:text-lg md:px-10">
                      {t('signin_button')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </main>

        {/* AI Capabilities Section */}
        <div className="py-12 bg-background-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-text-primary font-semibold tracking-wide uppercase">{t('ai_capabilities_title')}</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-primary sm:text-4xl">
                {t('ai_capabilities_subtitle')}
              </p>
              <p className="mt-4 max-w-2xl text-xl text-text-primary lg:mx-auto">
                {t('ai_capabilities_description')}
              </p>
            </div>
            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <div className="card bg-background-secondary">
                    <h3 className="text-lg leading-6 font-medium text-text-primary">{t('feature_pfa_title')}</h3>
                    <p className="mt-2 text-base text-text-primary">
                      {t('feature_pfa_description')}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="card bg-background-secondary">
                    <h3 className="text-lg leading-6 font-medium text-text-primary">{t('feature_rfd_title')}</h3>
                    <p className="mt-2 text-base text-text-primary">
                      {t('feature_rfd_description')}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="card bg-background-secondary">
                    <h3 className="text-lg leading-6 font-medium text-text-primary">{t('feature_sbf_title')}</h3>
                    <p className="mt-2 text-base text-text-primary">
                      {t('feature_sbf_description')}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="card bg-background-secondary">
                    <h3 className="text-lg leading-6 font-medium text-text-primary">{t('feature_spr_title')}</h3>
                    <p className="mt-2 text-base text-text-primary">
                      {t('feature_spr_description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Used Section */}
        <div className="py-12 bg-background-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-text-primary font-semibold tracking-wide uppercase">{t('technologies_title')}</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-primary sm:text-4xl">
                {t('technologies_subtitle')}
              </p>
              <p className="mt-4 max-w-2xl text-xl text-text-primary lg:mx-auto">
                {t('technologies_description')}
              </p>
            </div>
            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <div className="card bg-background-primary">
                    <h3 className="text-lg leading-6 font-medium text-text-primary">{t('tech_frontend_title')}</h3>
                    <p className="mt-2 text-base text-text-primary">
                      {t('tech_frontend_description')}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="card bg-background-primary">
                    <h3 className="text-lg leading-6 font-medium text-text-primary">{t('tech_backend_title')}</h3>
                    <p className="mt-2 text-base text-text-primary">
                      {t('tech_backend_description')}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="card bg-background-primary">
                    <h3 className="text-lg leading-6 font-medium text-text-primary">{t('tech_database_title')}</h3>
                    <p className="mt-2 text-base text-text-primary">
                      {t('tech_database_description')}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="card bg-background-primary">
                    <h3 className="text-lg leading-6 font-medium text-text-primary">{t('tech_ai_ml_title')}</h3>
                    <p className="mt-2 text-base text-text-primary">
                      {t('tech_ai_ml_description')}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="card bg-background-primary">
                    <h3 className="text-lg leading-6 font-medium text-text-primary">{t('tech_i18n_figma_title')}</h3>
                    <p className="mt-2 text-base text-text-primary">
                      {t('tech_i18n_figma_description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-text-primary">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-text-secondary">
                {t('footer_text')}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}