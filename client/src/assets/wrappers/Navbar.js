import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
  height: var(--nav-height);
  align-items: center;
  justify-content: center;
  background: var(--background-secondary-color);
  box-shadow: 0px 1px 0 0 rgba(0, 0, 0, 0.1);
  .nav-center {
    display: flex;
    width: 90vw;
    justify-content: space-between;
    align-items: center;
  }
  .toggle-btn {
    background-color: transparent;
    border: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .logo-text {
    display: none;
  }
  .logo {
    width: 100px;
    display: flex;
    align-items: center;
  }
  .btn-container {
    display: flex;
    align-items: center;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }
    .logo-text {
      display: block;
    }
    .logo {
      display: none;
    }
  }
`;
export default Wrapper;
