import ProfileIcon from "../Profile/Icon";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300 shadow">
      <h1 className="text-xl font-bold">Form Builder</h1>
      <ProfileIcon />
    </header>
  );
};

export default Header;
