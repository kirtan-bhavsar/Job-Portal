import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
  }
  .sidebar-container {
    background: var(--background-secondary-color);
    /* background: red; */
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    min-height: 100vh;
    height: 100%;
    width: 250px;
    /* position: sticky; */
    margin-left: -250px;
    transition: margin-left 0.3s ease-in-out;
  }
  .content {
    position: sticky;
    top: 0;
  }
  .show-sidebar {
    /* background-color: red; */
    margin-left: 0;
  }
  header {
    /* background-color: red; */
    height: 6rem;
    display: flex;
    align-items: center;
    padding-left: 2.5rem;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    /* background-color: red; */
    /* padding: 1rem 0; */
    /* padding-left: 2.5rem; */
  }
  .nav-link {
    display: flex;
    align-items: center;
    padding: 1rem 0;
    padding-left: 2.5rem;
    color: var(--text-secondary-color);
    transition: padding-left 0.3s ease-in-out;
    text-transform: capitalize;
  }
  .nav-link:hover {
    padding-left: 3rem;
    color: var(--primary-500);
    transition: var(--transition);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    align-items: center;
  }
  .active {
    color: var(--primary-500);
  }
  .pending {
    background: var(--background-color);
  }
`;
export default Wrapper;
