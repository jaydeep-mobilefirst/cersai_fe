interface SearchButtonProps {
  text: string;
}
const HeroButton: React.FC<SearchButtonProps> = ({ text }) => {
  return (
    <div className="">
      <button className="rounded-[8px] border-[#52AE32] text-[#52AE32] border px-4 py-2">
        {text}
      </button>
    </div>
  );
};

export default HeroButton;
