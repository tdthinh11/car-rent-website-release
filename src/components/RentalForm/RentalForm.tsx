interface RentalFormProps {
  title: string;
  description: string;
  current: number;
  total: number;
  children: React.ReactNode;
}

export const RentalForm = ({ title, description, current, total, children }: RentalFormProps) => {
  return (
    <div className="rounded-[10px] bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="mb-4">
          <h1 className="leading-150 mb-1 text-base font-bold tracking-tight md:text-xl">
            {title}
          </h1>
          <p className="md:leading-150 text-grey text-sm font-medium leading-4 tracking-tight">
            {description}
          </p>
        </div>
        <p className="text-grey md:leading-150 text-xs font-medium leading-4 tracking-tight md:text-sm">
          Step {current} of {total}
        </p>
      </div>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};
