import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CheckBox from '@/components/CheckBox/CheckBox';
import Slider from '@/components/Slider/Slider';
import { categoryType } from '@/service/carServices';
import { carActionThunk } from '@/store/carSlice';
import { toggleIsShow } from '@/store/drawerSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { CapacityCategory, MAX_PRICE } from '@/utils/constant';

type CategorySidebarType = {
  variant?: 'lg' | 'sm';
};

export const CategorySidebar = ({ variant = 'lg' }: CategorySidebarType) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { categoryValue, searchKey } = useAppSelector((state) => state.carReducer);

  useEffect(() => {
    dispatch(carActionThunk.getListLocation());
    dispatch(carActionThunk.getCategoryData());
    navigate({ search: '' });

    return () => {
      dispatch(toggleIsShow('reset'));
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(carActionThunk.filterByCategory(searchParams.toString()));
  }, [dispatch, navigate, searchParams, searchKey, categoryValue]);

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>, itemCheckBox: categoryType) => {
    // Remove query with item has value is false
    const queryUpdate = Object.entries({
      ...Object.fromEntries([...searchParams]),
      [itemCheckBox.name]: `${e.currentTarget.checked}`,
    }).filter((item) => {
      return item[1] === 'true';
    });
    navigate({ search: '?' + new URLSearchParams(queryUpdate).toString() });
    dispatch(carActionThunk.changeCategoryValue(e.target.checked, itemCheckBox));
  };

  const onChangeSlider = (value: number) => {
    const pricePayload: categoryType = {
      name: 'Price',
      section: 'PRICE',
      isSelected: true,
      value: value,
    };

    navigate({
      search:
        '?' +
        new URLSearchParams({
          ...Object.fromEntries([...searchParams]),
          price: `${value}`,
        }).toString(),
    });
    dispatch(carActionThunk.changeCategoryValue(true, pricePayload));
  };

  return (
    <div className="">
      {variant === 'sm' ? (
        <div className="flex flex-wrap justify-between gap-4 p-8 lg:hidden">
          <div className="grow basis-0">
            <p className="text-grey mb-4 text-xs font-semibold leading-[15px] tracking-tight">
              {t('common.type')}
            </p>
            <div>
              {categoryValue
                .filter((item) => item.section === 'TYPE')
                .map((item: categoryType) => {
                  return (
                    <div key={item.name} className="mb-4 flex items-center md:mb-8">
                      <CheckBox
                        variant="square"
                        id={item.name}
                        label={item.name}
                        checked={item.isSelected}
                        classLabel="text-xl leading-150 text-second tracking-tight"
                        onChange={(e) => onChangeCheckbox(e, item)}
                      />
                      <span className="leading-150 text-grey ml-1 text-xl tracking-tight">
                        ({item.value})
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="grow basis-0">
            <p className="text-grey mb-4 text-xs font-semibold leading-[15px] tracking-tight">
              {t('common.capacity')}
            </p>
            <div>
              {categoryValue
                ?.filter((item) => item.section === 'CAPACITY')
                .map((item: categoryType, index) => {
                  return (
                    <div key={item.name} className="mb-4 flex items-center md:mb-8">
                      <CheckBox
                        variant="square"
                        id={item.name}
                        checked={item.isSelected}
                        label={`${CapacityCategory[item.name as keyof typeof CapacityCategory]} ${
                          categoryValue.filter((item) => item.section === 'CAPACITY').length - 1 !==
                          index
                            ? t('common.person')
                            : t('common.orMore')
                        }`}
                        classLabel="text-xl leading-150 text-second tracking-tight"
                        onChange={(e) => onChangeCheckbox(e, item)}
                      />
                      <span className="leading-150 text-grey ml-1 text-xl tracking-tight">
                        ({item.value})
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="w-full grow basis-0">
            <p className="text-grey mb-4 text-xs font-semibold leading-[15px] tracking-tight">
              {t('common.price')}
            </p>
            <div>
              <Slider
                id="price-slider"
                max={MAX_PRICE}
                step={10}
                value={categoryValue.find((item) => item.section === 'PRICE')?.value}
                onInput={onChangeSlider}
              />
              <span className="leading-150 text-second mt-4 text-xl font-semibold tracking-tight">
                Max.&#36;{`${MAX_PRICE}`}.00
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden flex-wrap justify-between gap-4 p-8 lg:flex">
          <div className="grow basis-0">
            <p className="text-grey mb-4 text-xs font-semibold leading-[15px] tracking-tight">
              {t('common.type')}
            </p>
            <div>
              {categoryValue
                .filter((item) => item.section === 'TYPE')
                .map((item: categoryType) => {
                  return (
                    <div key={item.name} className="mb-4 flex items-center md:mb-8">
                      <CheckBox
                        variant="square"
                        id={item.name}
                        label={item.name}
                        checked={item.isSelected}
                        classLabel="text-xl leading-150 text-second tracking-tight"
                        onChange={(e) => onChangeCheckbox(e, item)}
                      />
                      <span className="leading-150 text-grey ml-1 text-xl tracking-tight">
                        ({item.value})
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="grow basis-0">
            <p className="text-grey mb-4 text-xs font-semibold leading-[15px] tracking-tight">
              {t('common.capacity')}
            </p>
            <div>
              {categoryValue
                ?.filter((item) => item.section === 'CAPACITY')
                .map((item: categoryType, index) => {
                  return (
                    <div key={item.name} className="mb-4 flex items-center md:mb-8">
                      <CheckBox
                        variant="square"
                        id={item.name}
                        checked={item.isSelected}
                        label={`${CapacityCategory[item.name as keyof typeof CapacityCategory]} ${
                          categoryValue.filter((item) => item.section === 'CAPACITY').length - 1 !==
                          index
                            ? t('common.person')
                            : t('common.orMore')
                        }`}
                        classLabel="text-xl leading-150 text-second tracking-tight"
                        onChange={(e) => onChangeCheckbox(e, item)}
                      />
                      <span className="leading-150 text-grey ml-1 text-xl tracking-tight">
                        ({item.value})
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="w-full grow basis-0">
            <p className="text-grey mb-4 text-xs font-semibold leading-[15px] tracking-tight">
              {t('common.price')}
            </p>
            <div>
              <Slider
                id="price-slider"
                max={MAX_PRICE}
                step={10}
                value={categoryValue.find((item) => item.section === 'PRICE')?.value}
                onInput={onChangeSlider}
              />
              <span className="leading-150 text-second mt-4 text-xl font-semibold tracking-tight">
                Max.&#36;{`${MAX_PRICE}`}.00
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
