// import Logo from "../../../assets/images/logo.svg";
// const HeadComp = () => {
//   return (
//     <div className="flex flex-row ">
//       <div className="bg-[#EEF7EB] pl-[29px] pt-[12px] h-[76px] w-full md:w-[349px]">
//         <img src={Logo} alt="logo" className="rounded-full h-[52px] w-[52px]" />
//       </div>
//     </div>
//   );
// };
// export default HeadComp;
import Logo from "../../../assets/images/logo.svg";
import CrossIcon from "../../../assets/images/CrossIcon.svg";
interface HeadCompProps {
  isMenuOpen?: boolean;
  toggleMenu?: () => void;
}
const HeadComp: React.FC<HeadCompProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <div className="flex flex-row ">
      <div className="bg-[#EEF7EB] pl-[29px] pt-[12px] h-[76px] w-full md:w-[349px] flex items-center justify-between">
        <img src={Logo} alt="logo" className="rounded-full h-[52px] w-[52px]" />

        <div className="lg:hidden px-1" onClick={toggleMenu}>
          <img src={CrossIcon} alt="Close Menu" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
export default HeadComp;
