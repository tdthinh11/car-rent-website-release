import Swap from '@/assets/icons/Swap';

type SwapButtonType = {
  handleSwap: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SwapButton = ({ handleSwap }: SwapButtonType) => {
  const changeStatus = () => {
    handleSwap((prev) => !prev);
  };

  return (
    <button
      className="bg-primary flex h-[60px] w-[60px] items-center justify-center rounded-[10px] text-white transition-all duration-300"
      onClick={changeStatus}
    >
      <Swap />
    </button>
  );
};
