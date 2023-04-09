import React from "react";
import styles from 'theme/components/organisms/CHeader.module.css'
import Link from "next/link";
import Logo from "public/logo.svg";
import MNavigation from "../molecules/MNavigation";
import classNames from "classnames";

const getNavData = async () => {
  const res = await fetch(`${process.env.API_URL}globals/navigation`, {
    next: {
      revalidate: 600
    }
  });
  return res.json();
}

const CHeader = async () => {

  const { page, pages } = await getNavData();
  return (
    <header className={classNames(styles.wrapperComponent, 'dark:bg-dark-bg-window bg-theme-bg-window dark:text-dark-font-primary text-theme-font-primary')}>
      <div className={styles.content}>
        <Link href={''}><Logo className={classNames(styles.logo, 'dark:fill-white')} /></Link>
        <MNavigation nav={[...pages, ...page]}/>
      </div>
    </header>
  );
};

export default CHeader;
