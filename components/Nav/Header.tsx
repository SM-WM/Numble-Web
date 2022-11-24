import styles from "./Header.module.css";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import Image from "next/image";
import numble_logo from "../../public/numble_logo.svg";
import HowToPlay from "./HowToPlay";
import { useAppDispatch } from "../../store/hooks";
import { gameActions } from "../../store/game-slice";
import Link from "next/link";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import apiClient from "../../services/apiClient";

interface IHeaderProps {
  user: any;
  setUser: (params: any) => any;
}

export default function Header({ user, setUser }: IHeaderProps) {
  const dispatch = useAppDispatch();
  const resetGameHandler = () => {
    dispatch(gameActions.resetGame());
  };
  const showStatHandler = () => {
    dispatch(gameActions.showStat());
  };

  const handleLogout = async () => {
    await apiClient.logoutUser();
    setUser(null);
    // setError(null);
  };

  // console.log(user.id)

  return (
    <nav>
      <div className={styles.wrapper}>
        <ul className={styles.ul}>
          <li className={styles.leftAlign}>
            <Image src={numble_logo} alt="Numble_logo" height={35} width={35} />
            <div className={styles.title}> Numble </div>
          </li>
          <li className={styles.rightAlign}>
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <div className={styles.users}>
                <Link href="/Login">
                  <button>Login</button>
                </Link>
                <Link href="/Register">
                  <button>Register</button>
                </Link>{" "}
              </div>
            )}
            <button onClick={resetGameHandler}>
              <RefreshOutlinedIcon sx={{ color: "black" }} />
            </button>
            {/* <Link href="/settings"><a><SettingsIcon height={35} width={35} sx={{color: 'black'}} /></a></Link> */}
            <button onClick={showStatHandler}>
              <BarChartIcon sx={{ color: "black" }} />
            </button>
            <HowToPlay />
          </li>
        </ul>
      </div>
    </nav>
  );
}
