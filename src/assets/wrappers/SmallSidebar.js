import styled from "styled-components";

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }
  .show-sidebar {
    visibility: visible;
    z-index: 99;
    /* while z-index pushes when show-sidebar is off, 
    only other elements are coming atop, 
    which are out of sidebar-container, 
    that is why visible is needed */
    opacity: 1;
    /* opcacity is only given to provide
     a visual effect of fading in/out */
  }
  .content {
  }
`;
export default Wrapper;
