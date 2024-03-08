interface SearchButtonProps {
  text: string;
}
const HeroButton: React.FC<SearchButtonProps> = ({ text }) => {
  return (
    <div className="rounded-[1px] border-[#52AE32]">
      <button>{text}</button>
    </div>
  );
};

export default HeroButton;
