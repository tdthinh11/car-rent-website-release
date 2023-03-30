import { Rating } from '../Rating/Rating';

interface ReviewItemProps {
  name: string;
  date: string;
  major: string;
  content: string;
  rated: number;
  imgUrl: string;
  totalDefault?: number;
}

export const ReviewItem = ({
  name,
  date,
  major,
  content,
  rated,
  totalDefault = 5,
  imgUrl,
}: ReviewItemProps) => {
  return (
    <div className="mb-5 flex items-start justify-between">
      <img
        src={imgUrl}
        alt="user"
        loading="lazy"
        className="mr-2 h-11 w-11 min-w-[44px] rounded-full"
      />
      <div className="grow basis-0">
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="leading-150 font-semibold tracking-tight">{name}</h2>
            <span className="text-grey text-xs font-medium leading-4 tracking-tight">{date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-grey text-xs font-medium leading-[15px] tracking-tight">
              {major}
            </span>
            <div className="s375:block hidden">
              <Rating total={totalDefault} rated={rated} />
            </div>
          </div>
          <div className="s375:hidden mt-2">
            <Rating total={totalDefault} rated={rated} />
          </div>
        </div>
        <p className="leading-200 text-grey text-xs tracking-tight">{content}</p>
      </div>
    </div>
  );
};
