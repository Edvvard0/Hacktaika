import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import './css/hero.css';
import FadeInSection from './FadeInSections';
import ClientForm from './ClientForm';

export const Hero = ({ sectionRefs }) => {
  const { t } = useTranslation();
  const [isClientFormOpen, setIsClientFormOpen] = useState(false);

  return (
    <div className='heroContainer'>
      <FadeInSection animation="fade-scale" duration={1.2}>
        <span className='heroTitle animated-title'>{t('brand-name')}</span>
        <div className="contact-banner" onClick={() => setIsClientFormOpen(true)}>
          <div className="contact-banner-content">
            <span className="contact-banner-title">{t('contact-us-banner')}</span>
            <span className="contact-banner-subtitle">{t('contact-us-subtitle')}</span>
          </div>
          <div className="contact-banner-arrow">→</div>
        </div>
        <h3 className='heroSubline'>{t('hero-description')}</h3>
      </FadeInSection>

      {isClientFormOpen && ReactDOM.createPortal(
        <ClientForm onClose={() => setIsClientFormOpen(false)} />,
        document.body
      )}
    </div>
  );
};