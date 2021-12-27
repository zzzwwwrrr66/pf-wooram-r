import styled from 'styled-components';

export const PfInner = styled.div`
  position: relative; 
  width: 100%; 
  max-width: 860px; 
  margin: 0 auto;
  padding: 1.5rem 1rem; 
  box-sizing: border-box ;
`;
export const PfContainer = styled.div`
  padding: 0 10px 0;
`;

export const PfProjectListWrap = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  background-color: ${props => props.backgroundColor};
  margin-bottom: 15px;
  border: 4px solid;
  border-color: ${props => props.borderColor};
  @media screen and (max-width: 768px) {
    & {
      flex-direction: column-reverse;
    }
`;