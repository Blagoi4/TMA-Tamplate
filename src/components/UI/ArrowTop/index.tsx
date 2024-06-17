interface ArrowTopIconProps {
  isActive: boolean;
}

const ArrowTopIcon: React.FC<ArrowTopIconProps> = ({ isActive }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={isActive ? "#86efac" : "currentColor"}
    viewBox="0 0 24 24"
    stroke="currentColor"
    width='9px'
    height='9px'
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

export default ArrowTopIcon;