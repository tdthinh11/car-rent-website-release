import { useEffect } from 'react';

import CheckBox from '@/components/CheckBox/CheckBox';
import Slider from '@/components/Slider/Slider';
import { categoryType } from '@/service/carServices';
import { carActionThunk } from '@/store/carSlice';
import { toggleIsShow } from '@/store/drawerSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { CapacityCategory } from '@/utils/constant';

type CategorySidebarType = {
  variant?: 'lg' | 'sm';
};

export const CategorySidebar = ({ variant = 'lg' }: CategorySidebarType) => {
  const dispatch = useAppDispatch();
  const { categoryValue } = useAppSelector((state) => state.carReducer);

  useEffect(() => {
    dispatch(carActionThunk.getListLocation());
    return () => {
      dispatch(toggleIsShow('reset'));
    };
  }, [dispatch]);

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>, itemCheckBox: categoryType) => {
    dispatch(carActionThunk.updateUpdateCategoryValue(e.target.checked, itemCheckBox));
  };

  const onChangeSlider = (value: number) => {
    const pricePayload: categoryType = {
      name: 'Price',
      section: 'PRICE',
      isSelected: true,
      value: value,
    };
    dispatch(carActionThunk.updateUpdateCategoryValue(true, pricePayload));
  };

  return (
    <div className="">
      {variant === 'sm' ? (
        <div className="flex flex-wrap justify-between gap-4 p-8 lg:hidden">
          <div className="grow basis-0">
            <p className="text-grey mb-4 text-xs font-semibold leading-[15px] tracking-tight">
              TYPE
            </p>
            <div>
              {categoryValue
                .filter((item) => item.section === 'TYPE')
                .map((item: categoryType) => {
                  return (
                    <div key={item.name} className="mb-4 flex items-center md:mb-8">
                      <CheckBox
                        type="square"
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
              CAPACITY
            </p>
            <div>
              {categoryValue
                ?.filter((item) => item.section === 'CAPACITY')
                .map((item: categoryType, index) => {
                  return (
                    <div key={item.name} className="mb-4 flex items-center md:mb-8">
                      <CheckBox
                        type="square"
                        id={item.name}
                        checked={item.isSelected}
                        label={`${CapacityCategory[item.name as keyof typeof CapacityCategory]} ${
                          categoryValue.filter((item) => item.section === 'CAPACITY').length - 1 !==
                          index
                            ? 'Person'
                            : 'or More'
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
              PRICE
            </p>
            <div>
              <Slider
                id="price-slider"
                max={100}
                step={10}
                value={categoryValue.find((item) => item.section === 'PRICE')?.value}
                onInput={onChangeSlider}
              />
              <span className="leading-150 text-second mt-4 text-xl font-semibold tracking-tight">
                Max.&#36;100.00
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden flex-wrap justify-between gap-4 p-8 lg:flex">
          <div className="grow basis-0">
            <p className="text-grey mb-4 text-xs font-semibold leading-[15px] tracking-tight">
              TYPE
            </p>
            <div>
              {categoryValue
                .filter((item) => item.section === 'TYPE')
                .map((item: categoryType) => {
                  return (
                    <div key={item.name} className="mb-4 flex items-center md:mb-8">
                      <CheckBox
                        type="square"
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
              CAPACITY
            </p>
            <div>
              {categoryValue
                ?.filter((item) => item.section === 'CAPACITY')
                .map((item: categoryType, index) => {
                  return (
                    <div key={item.name} className="mb-4 flex items-center md:mb-8">
                      <CheckBox
                        type="square"
                        id={item.name}
                        checked={item.isSelected}
                        label={`${CapacityCategory[item.name as keyof typeof CapacityCategory]} ${
                          categoryValue.filter((item) => item.section === 'CAPACITY').length - 1 !==
                          index
                            ? 'Person'
                            : 'or More'
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
              PRICE
            </p>
            <div>
              <Slider
                id="price-slider"
                max={100}
                step={10}
                value={categoryValue.find((item) => item.section === 'PRICE')?.value}
                onInput={onChangeSlider}
              />
              <span className="leading-150 text-second mt-4 text-xl font-semibold tracking-tight">
                Max.&#36;100.00
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// categoryValue.find(item => item.section === "PRICE")?.value
