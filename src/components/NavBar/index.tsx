import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { NavBarContainer, NavBarItem } from "@/components/NavBar/index.styles";

export function NavBar() {
  return (
    <NavBarContainer>
      <div>
        <NavBarItem>
          <AccountTreeIcon />
          <span>{"Roadmappr"}</span>
        </NavBarItem>
        <div style={{ display: "flex", height: "100%" }}>
          <NavBarItem>{"Let's started"}</NavBarItem>
          <NavBarItem>{"Pricing"}</NavBarItem>
        </div>
      </div>
    </NavBarContainer>
  );
}
