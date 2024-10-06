import Image from "next/image";
import logo from "../../../public/logo.png";

const Sidebar = () => {
  return (
    <div className="h-full pt-10 pl-6 pr-28 border-r">
      <Image src={logo} alt="인스타그램 로고" width={100} />
    </div>
  );
};

export default Sidebar;
