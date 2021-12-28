import TweenOne from 'rc-tween-one';
import React, { } from 'react';
import logoImg from './images/wooram_logo.png';
import styled from 'styled-components';

const StyledImg = styled.img.attrs({src: logoImg, alt: 'logo'})`
  object-fit: contain;
  max-width: 230px;
  @media screen and (max-width: 768px) {
    max-width: 180px;
  }
`

const p0 = 'M0,100 L25,100 C34,20 40,0 100,0';
const p1 = 'M0,100 C5,120 25,130 25,100 C30,60 40,75 58,90 C69,98.5 83,99.5 100,100';
const ease0 = TweenOne.easing.path(p0);
const ease1 = TweenOne.easing.path(p1);

class AniLogoImg extends React.Component {
  constructor(props) {
    super(props);
    this.animation = [
      {
        repeatDelay: 300,
        y: -30,
        repeat: 1,
        yoyo: true,
        ease: ease0,
        duration: 700
      },
      {
        repeatDelay: 300,
        appearTo: 0,
        scaleX: 0,
        scaleY: 2,
        repeat: 1,
        yoyo: true,
        ease: ease1,
        duration: 700,
      }
    ];
  }

  render() {
    return (
      <div>
        <TweenOne
          animation={this.animation}
          paused={this.props.paused}
          className="code-box-shape"
          style={{
            transformOrigin: 'center bottom',
            height: '100%',
          }}
        >
          <StyledImg></StyledImg>
          {/* <img src={logoImg} alt='logo' style={{maxWidth: '230px', objectFit:'contain'}} /> */}
        </TweenOne>
      </div>
    );
  }
}

export default AniLogoImg;