import './styles.scss';
interface Props {
  title?: string;
}

const Header = ({ title }: Props) => {
  return (
    <header className="Header">
      <h2>{title}</h2>
    </header>
  );
};

export default Header;
