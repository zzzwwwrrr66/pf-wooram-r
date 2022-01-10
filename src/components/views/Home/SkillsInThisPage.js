import { PfInner, PfContainer } from "../StyledComponents";
import { connect } from 'react-redux';
import styled from 'styled-components';

const SkillsWrap = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
`;
const SkillsList = styled.li`
  text-align: center;
  margin: 0 20px;
  img {
    max-width: 100px;
    height: 100px;
    object-fit: contain;
  }
`

const skillsImg = [
  'react', 'redux', 'firebase',
]

function SkillsInThisPage({state}) {
  return (
  <>
  <PfContainer style={{ margin: "30px auto" }}>
      <PfInner 
        className={state.darkMod ? `with-title nes-container is-dark` : `with-title nes-container`}
        >
        <h3 className="title">Skills On This Page</h3>
        <SkillsWrap>
        {
          skillsImg.map((v,i)=>{
            return((
              <SkillsList key={v+i}>
              <div>
                <img src={require(`../../images/${v}-logo.${v==='firebase' ? 'svg':'png'}`).default} alt={v}/>
                <p>{v}</p>
              </div>
            </SkillsList>
            ))
          })
        }
        </SkillsWrap>
        <div className="lists" style={{margin:'10px 20px 0'}}>
        <ul className="nes-list is-disc">
          <li>styled components</li>
          <li>Material-UI</li>
          <li>NES.css</li>
          <li>uuid</li>
          <li>moment</li>
        </ul>
      </div>
      </PfInner>
  </PfContainer>
  </>
  )
}

function mapStateToProps(state){
  return {state};
}

export default connect(mapStateToProps) (SkillsInThisPage);