import { Icon } from './Icon';

const Menu = ({ className }: Icon) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 7H21" stroke="#90A3BF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12H21" stroke="#90A3BF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 17H21" stroke="#90A3BF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default Menu;
