const Icon = ({ image }: { image: string }) => {
  return <img src={`/icons/${image}.svg`} alt="icon" />;
};

export default Icon;
