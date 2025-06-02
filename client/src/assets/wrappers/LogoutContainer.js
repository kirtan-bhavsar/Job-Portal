import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  .dropdown {
    position: absolute;
    top: 45px;
    width: 100%;
    text-align: center;
    box-shadow: var(--shadow-2);
    visibility: hidden;
    background-color: var(--primary-500);
    border-radius: var(--border-radius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    background: transparent;
    border-color: transparent;
    color: var(--white);
    cursor: pointer;
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    border-radius: var(--border-radius);
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
`;

export default Wrapper;
