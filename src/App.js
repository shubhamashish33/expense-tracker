import styled from "styled-components";
import Homecomponent from "./components/home";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Outfit", sans-serif;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
  @media screen and (max-width: 478px) {
    align-items: center;
  }
`;

const Header = styled.span`
  color: black;
  font-size: 25px;
  font-weight: bold;
  @media screen and (max-width: 478px) {
    margin: 20px 0px;
  }
`;
function App() {
  return (
    <Container>
      <Header>Track Your Expenses 💰</Header>
      <Homecomponent/>
    </Container>
  );
}

export default App;
