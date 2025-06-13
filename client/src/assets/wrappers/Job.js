import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  header {
    padding: 1rem 1.5rem;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    border-bottom: 1px solid var(--grey-100);
  }
  .main-icon {
    width: 60px;
    height: 60px;
    color: var(--white);
    background: var(--primary-500);
    display: grid;
    place-items: center;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 700;
    border-radius: var(--border-radius);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      color: var(--text-secondary-color);
      letter-spacing: var(--letter-spacing);
      text-transform: capitalize;
      margin: 0;
    }
  }
  .content {
    padding: 1rem 1.5rem 0 1.5rem;
    /* background-color: blue; */
  }
  .content-center {
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    align-items: center;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;
    align-items: center;
  }
  .actions {
    margin-bottom: 1rem;
    margin-left: 1.5rem;
    display: flex;
    align-items: center;
  }
  .edit-btn,
  .delete-btn {
    display: flex;
    align-items: center;
    height: 30px;
    font-size: 0.85rem;
  }
  .edit-btn {
    margin-right: 0.5rem;
  }
`;

export default Wrapper;
