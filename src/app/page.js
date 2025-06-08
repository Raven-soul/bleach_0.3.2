import Image from "next/image";
import styles from "./../../public/css/page.module.css";
import { getAllUsers } from "../lib/ControllerDB/crud";

export function UsersGrid({ users }) {
  return (
    <p>
      
    </p> 
  );
}

export async function Users() {
  const users = await getAllUsers();
  console.log(users[0].id);
  return <UsersGrid meals={users} />;
}

export default function Home(param) {
  const { data } = param;

  return (
    <div className={styles.page}>
      <Users />
    </div>
  );
}
