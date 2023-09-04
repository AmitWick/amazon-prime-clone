import { images } from "../assets/images/_images";

const Footer = () => {
  const { logo } = images;
  return (
    <div className="flex flex-col items-center justify-between gap-6 py-6">
      <div className="w-20 bg-transparent">
        <img src={logo} alt="logo" className="w-full h-full bg-transparent" />
      </div>
      <div>
        <p>Terms and Condition @{new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Footer;
