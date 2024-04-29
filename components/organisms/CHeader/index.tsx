import styles from "./CHeader.module.css";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import MNavigation from "@/components/molecules/MNavigation";
import classNames from "classnames";
import { IData } from "@/interfaces";

const getHeaderData = async () => {
  const res = await fetch(`${process.env.API_URL}globals/navigation`, {
    next: {
      tags: ["navigation"],
    },
  });
  const data: IData = await res.json();
  return data;
};

const CHeader = async () => {

  const { page, pages } = await getHeaderData();

  return (
    <header
      className={classNames(
        styles.wrapperComponent,
        "dark:bg-dark-bg-window bg-theme-bg-window dark:text-dark-font-primary text-theme-font-primary"
      )}
    >
      <div className={styles.content}>
        <Link href={"/"}>
          <Logo className={classNames(styles.logo, "dark:fill-white")} />
        </Link>
        <MNavigation nav={[...page, ...pages]} />
      </div>
    </header>
  );
};

export default CHeader;
