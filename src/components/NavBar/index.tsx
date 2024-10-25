import { NavBarContainer, NavBarItem } from "@/components/NavBar/index.styles";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

export function NavBar() {
  return (
    <NavBarContainer>
      <div>
        <NavBarItem to="/">
          <AccountTreeIcon />
          <span>{"Roadmappr"}</span>
        </NavBarItem>
        <div style={{ display: "flex", height: "100%" }}>
          <NavBarItem to="/create">{"Let's start"}</NavBarItem>
          <NavBarItem to="/">{"Pricing"}</NavBarItem>
        </div>
      </div>
    </NavBarContainer>
  );
}
