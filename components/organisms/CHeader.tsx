import React, { FC } from "react";
import styles from "theme/components/organisms/CHeader.module.css";
import Link from "next/link";
import Logo from "public/logo.svg";
import MNavigation from "../molecules/MNavigation";
import classNames from "classnames";
import { IData } from "@/interfaces";
// import useSWR from 'swr'
// const getNavData = (url: string) => fetch(url).then((res) => res.json());

type IProps = {
  data: IData
}

const CHeader:FC<IProps> = ({ data: { page, pages } }) => {
  
  // const { data, error, isLoading } = useSWR('/api/globals/navigation', getNavData)
 
  // if (error) return <div>failed to load</div>
  // if (isLoading) return <div>loading...</div>

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
