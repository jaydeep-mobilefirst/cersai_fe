interface SearchButtonProps {
  text: string;
}
const HeroButton: React.FC<SearchButtonProps> = ({ text }) => {
  return (
    <div className="">
      <button className="rounded-[8px] border-[#1C468E] text-[#1C468E] border px-4 py-2">
        {text}
      </button>
    </div>
  );
};

export default HeroButton;
