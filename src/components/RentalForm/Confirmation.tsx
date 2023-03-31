import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SAFETY from '@/assets/images/Layer_Safe.png';
import Button from '@/components/Button/Button';
import CheckBox from '@/components/CheckBox/CheckBox';
import { IFormUpdate } from '@/model/interface';

interface IConfirmation {
  id: string;
  label: string;
  isConfirm: boolean;
}

interface IConfirmationProps extends IFormUpdate {
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

const confirmationList: IConfirmation[] = [
  {
    id: 'confirmOne',
    label: 'rental.confirmation.confirmOne',
    isConfirm: false,
  },
  {
    id: 'confirmTwo',
    label: 'rental.confirmation.confirmTwo',
    isConfirm: false,
  },
];

export const Confirmation = ({ updateFields, onSubmit, errors }: IConfirmationProps) => {
  const { t } = useTranslation();
  const [confirmList, setConfirmList] = useState<IConfirmation[]>([...confirmationList]);
  useEffect(() => {
    const countConfirmed = confirmList.filter((item) => item.isConfirm === true).length;
    countConfirmed === confirmList.length
      ? updateFields({ confirmation: true })
      : updateFields({ confirmation: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmList]);
  return (
    <div>
      {confirmList.map((confirmItem, index) => {
        return (
          <div
            key={confirmItem.id}
            className={`bg-bg mt-5 flex items-center justify-between rounded-[10px] p-4 ${
              index === confirmationList.length - 1 ? '' : ''
            }`}
          >
            <CheckBox
              id={confirmItem.id}
              label={`${t(confirmItem.label)}`}
              onChange={(e) => {
                const updateList = [...confirmList];
                updateList[index] = { ...updateList[index], isConfirm: e.currentTarget.checked };
                setConfirmList(updateList);
              }}
              name="confirmation"
              checked={confirmItem.isConfirm}
              classLabel="lg:leading-150 leading-160 text-color-bold ml-2 text-xs font-medium tracking-tight lg:ml-5 lg:text-base lg:font-semibold"
              variant="square"
            />
          </div>
        );
      })}
      <p className="mt-1 mb-6 text-xs text-red-400">{errors?.confirmation?.message}</p>
      <Button type="submit" variant="primary" className="py-[10px] px-[16px]" onClick={onSubmit}>
        Rental Now
      </Button>
      <img src={SAFETY} alt="safety" className="mt-[34px]" />
      <div className="mt-[14px]">
        <h3 className="leading-150 text-color-bold font-bold tracking-tight">
          All your data are safe
        </h3>
        <p className="text-grey mt-1 text-xs font-medium tracking-tight">
          We are using the most advanced security to provide you the best experience ever.
        </p>
      </div>
    </div>
  );
};
