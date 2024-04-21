import SwiftlyLogo from '@/assets/Swiftly.logo.svg';
import { ALT_TEXT, SWIFTLY_WEBPAGE_URL } from './constants';
import { Img, LogoContainer } from './styled';

const Logo = () => {
  return (
    <LogoContainer className="grow-0">
      <a href={SWIFTLY_WEBPAGE_URL} target="_blank">
        <Img src={SwiftlyLogo} className="logo" alt={ALT_TEXT} />
      </a>
    </LogoContainer>
  );
};

export default Logo;
