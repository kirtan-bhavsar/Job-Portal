import styled from "styled-components";

const Wrapper = styled.button`
  background-color: transparent;
  border-color: transparent;
  height: 2rem;
  width: 3.5rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  .toggle-icon {
    font-size: 1.15rem;
    color: var(--text-color);
  }
`;
export default Wrapper;
