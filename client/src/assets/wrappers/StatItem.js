import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  padding: 2rem;
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: red; */
  }
  .count {
    font-weight: 700;
    font-size: 50px;
    display: block;
    line-height: 2;
    color: ${(props) => props.color};
  }
  .title {
    /* background-color: blue; */
    font-size: 1.25rem;
    text-transform: capitalize;
    margin-top: 0.5rem;
    text-align: left;
    margin: 0;
    letter-spacing: var(--letter-spacing);
  }
  .icon {
    width: 70px;
    height: 60px;
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.bcg};
    border-radius: var(--border-radius);
    svg {
      color: ${(props) => props.color};
      font-size: 2rem;
    }
  }
`;

export default Wrapper;
