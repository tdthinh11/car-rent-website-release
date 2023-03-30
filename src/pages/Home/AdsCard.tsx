import React from 'react';

import Button from '@/components/Button/Button';

type AdsProps = {
  bgUrl: string;
  btnVariant: 'primary' | 'secondary';
  btnText: string;
  title: string;
  description: string;
  classNames?: string;
};

const AdsCard = ({ bgUrl, btnVariant, title, description, btnText, classNames = '' }: AdsProps) => {
  return (
    <div className={`relative rounded-[10px] ${classNames}`}>
      <div
        style={{ backgroundImage: `url(${bgUrl})` }}
        className="min-h-[250px] bg-cover bg-bottom bg-no-repeat p-4"
      >
        <div>
          <h1 className="pb-3 font-semibold leading-[150%] tracking-tight text-white">{title}</h1>
          <p className="pb-4 text-xs font-medium leading-[160%] text-white">{description}</p>
          <Button variant={btnVariant} className="!px-7 !py-3">
            {btnText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdsCard;
