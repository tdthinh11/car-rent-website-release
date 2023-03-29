import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const About = ['How it works', 'Feature', 'Partnership', 'Business Relation'];
const Socials = ['How it works', 'Feature', 'Partnership', 'Business Relation'];
const Community = ['How it works', 'Feature', 'Partnership', 'Business Relation'];

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-bg md:bg-white">
      <div className="wrapper px-6 pb-6 md:px-16 md:pt-20 md:pb-14">
        <div className="lg:flex lg:items-start">
          <div className="mb-12 lg:grow lg:basis-0">
            <h1 className="text-primary pb-4 text-2xl font-bold leading-[150%] md:text-[32px]">
              MORENT
            </h1>
            <div className="text-grey max-w-[285px] text-xs font-medium leading-[200%] tracking-tight md:text-base">
              Our vision is to provide convenience and help increase your sales business.
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-12 lg:grow lg:basis-0 lg:gap-0">
            <div>
              <h2 className="text-black-2 mb-4 text-xl font-semibold leading-[150%]">
                {t('footer.about')}
              </h2>
              <div className="flex flex-col">
                {About.map((about, index) => {
                  return (
                    <Link
                      to="/"
                      key={index}
                      className="text-grey md:text-grey-2 mb-4 font-medium leading-[120%] hover:cursor-pointer"
                    >
                      {about}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <h2 className="text-black-2 mb-4 text-xl font-semibold leading-[150%]">
                {t('footer.socials')}
              </h2>
              <div className="flex flex-col">
                {Socials.map((about, index) => {
                  return (
                    <Link
                      to="/"
                      key={index}
                      className="text-grey md:text-grey-2 mb-4 font-medium leading-[120%] hover:cursor-pointer"
                    >
                      {about}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <h2 className="text-black-2 mb-4 text-xl font-semibold leading-[150%]">
                {t('footer.community')}
              </h2>
              <div className="flex flex-col">
                {Community.map((about, index) => {
                  return (
                    <Link
                      to="/"
                      key={index}
                      className="text-grey md:text-grey-2 mb-4 font-medium leading-[120%] hover:cursor-pointer"
                    >
                      {about}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="md:border-light pt-12 md:mt-8 md:border-t md:pt-8 lg:flex lg:items-center lg:justify-between">
          <div className="flex justify-between lg:order-2">
            <p className="text-black-2 text-xs font-semibold leading-[15px] tracking-tight">
              Privacy &#38; Policy
            </p>
            <p className="text-black-2 text-xs font-semibold leading-[15px] tracking-tight">
              Terms &#38; Condition
            </p>
          </div>
          <p className="text-black-2 mt-8 text-xs font-semibold leading-[15px] tracking-tight lg:order-1 lg:mt-0 lg:flex">
            &#64;2022 MORENT. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};
