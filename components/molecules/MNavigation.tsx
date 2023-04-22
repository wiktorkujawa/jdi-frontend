import classNames from "classnames";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import styles from "theme/components/molecules/MNavigation.module.css";
import SunIcon from "/public/assets/svg/sun.svg";
import MoonIcon from "/public/assets/svg/moon.svg";

interface Props {
  nav: INav[];
}
interface INav {
  id: string;
  name: string;
  slug: string;
}

const MNavigation: FC<Props> = ({ nav }) => {
  const [openNav, setOpenNav] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if(localStorage?.getItem('jdi-dark-mode')){
      setDarkMode(localStorage.getItem('jdi-dark-mode') == 'true');
    }
    else {
      setDarkMode(window.matchMedia("(prefers-color-schema: dark)").matches);
    }
  }, []);

  useEffect(() => {
    darkMode
      ? document.body?.classList.add("dark")
      : document.body?.classList.remove("dark");
  }, [darkMode]);
  return (
    <>
      <button
        className={classNames(styles.button, { [styles.openButton]: openNav }, 'dark:border-dark-font-primary border-theme-font-primary')}
        onClick={() => setOpenNav((prev) => !prev)}
      >
        <div className={classNames(styles.icon,'dark:bg-dark-font-primary bg-theme-font-primary')} />
      </button>
      <nav
        className={classNames(
          styles.nav,
          { [styles.openNav]: openNav },
          'dark:bg-dark-bg-window bg-theme-bg-window'
        )}
      >
        {nav.map((item) => (
          <Link onClick={() => setOpenNav(false)} className={styles.link} key={item.id} href={item.slug}>
            {item.name}
          </Link>
        ))}
      </nav>
      <button className="w-5 h-5 fixed right-4 top-20" onClick={() => {
        setDarkMode((prev) => {
          localStorage.setItem('jdi-dark-mode', (!prev).toString());
          return !prev
        })
        }}>
        {darkMode ? <SunIcon className="fill-white-smoke" /> : <MoonIcon className="text-eerie-black" />}
      </button>
    </>
  );
};

export default MNavigation;
