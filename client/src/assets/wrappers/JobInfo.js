import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .job-icon {
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin-right: 1rem;
    svg {
      color: var(--text-secondary-color);
    }
  }
  .job-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
`;
export default Wrapper;
