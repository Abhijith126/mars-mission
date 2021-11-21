import PropTypes from 'prop-types';
import { FC } from 'react';

interface Props {
  title?: string;
}

const Header: FC<Props> = ({ title }) => {
  return (
    <header className="App__Header">
      <h1>{title}</h1>
    </header>
  );
};

Header.defaultProps = {
  title: 'Journey to Mars',
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
