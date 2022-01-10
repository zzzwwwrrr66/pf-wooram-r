import {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import './css/style.css';
import styled from "styled-components";

import { PfContainer, PfInner} from '../StyledComponents/index';



function AboutMe ({state}) {

  useEffect(()=>{
    return;
  }, [state.darkMod]);

  return (
    <PfContainer>
      <PfInner className={state.darkMod ? `with-title nes-container is-dark` : `with-title nes-container`}>
        <h3 className="title">About me</h3>
        <div className='about-me-wrap' >
          <div>
              <p>name: cho wooram チョ ウラム</p>
              <p>age: 30</p>
              <p>hobby: 読書、旅行、ゲーム、ＷＥＢ勉強</p>
              <p style={{marginBottom: '0'}}>career: </p>
              <ul className="nes-list is-disc" style={{margin:'0 1rem 10px'}}>
                <li>ＷＥＢ勉強１年半（就職前）</li>
                <li>トランス・コスモスコリア（ＷＥＢエンジニア２年）</li>
              </ul>
              <p>Education: 韓国外国語通信大学（４年） 日本語学部</p>
              <p>comment: コツコツ、繰り返すより新しい冒険</p>
              <p>LINE ID: pqpq777</p>
              <p style={{marginBottom: '0'}}>attitude at work: </p>
              <ul className="nes-list is-disc" style={{margin:'0 1rem 10px'}}>
                <li>とりあえずやってみるのが好き</li>
                <li>担当したものは最後まで投げ出さないことを心掛けている</li>
                <li>経験したことないことに興味を持ってコードに映してみる</li>
                <li>自分が作成したページの仕組みなど、文章で分かりやすく資料化した経験あり</li>
                <li>新しく知ったり、気付くことが好き</li>
              </ul>
              <div className="about-me-ico-wrap">
                <a href='https://github.com/zzzwwwrrr66' target='_blank' rel="noopener">
                  <i className="nes-icon github is-medium"></i>
                </a>
                <a href="mailto:zzzwwwrrr66@gmail.com" title='email' target='_blank' rel="noopener" style={{marginLeft: '15px'}}>
                  <i className="nes-icon gmail is-medium"></i>
                </a>
              </div>
          </div>
          <div className='profile-img-wrap'>
            <img alt='me' src={require('./me.png').default} style={{width: '200px'}} />
          </div>
        </div>
      </PfInner>
    </PfContainer>
  )
}



function mapStateToProps(state){
  return {state};
}


export default connect(mapStateToProps) (AboutMe);