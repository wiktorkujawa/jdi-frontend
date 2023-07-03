import classNames from "classnames";
import Link from "next/link";
import React, { FC, useEffect, useMemo, useState } from "react";
import styles from "@/theme/components/molecules/MNavigation.module.css";
import SunIcon from "@/public/assets/svg/sun.svg";
import MoonIcon from "@/public/assets/svg/moon.svg";
import { useRouter } from "next/router";

interface Props {
  nav: INav[];
}
interface INav {
  id: string;
  name: string;
  slug: string;
  subpages?: INav[];
}

const relativeLink = (link: string) => link[0] == "/" ? link : `/${link}`;

const MNavigation: FC<Props> = ({ nav }) => {
  const router = useRouter();
  const [openNav, setOpenNav] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const pathname = useMemo(() => {
    const hashIndex = router.asPath.indexOf("#");
    if(hashIndex!=-1) {
      return router.asPath.substring(0, hashIndex)
    }
    return router.asPath
  },[router.asPath]);

  useEffect(() => {
    if (localStorage?.getItem("jdi-dark-mode")) {
      setDarkMode(localStorage.getItem("jdi-dark-mode") == "true");
    } else {
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
        aria-label="Toggle Menu"
        className={classNames(
          styles.button,
          { [styles.openButton]: openNav },
          "dark:border-dark-font-primary border-theme-font-primary"
        )}
        onClick={() => setOpenNav((prev) => !prev)}
      >
        <div
          className={classNames(
            styles.icon,
            "dark:bg-dark-font-primary bg-theme-font-primary"
          )}
        />
      </button>
      <nav
        className={classNames(
          styles.nav,
          { [styles.openNav]: openNav },
          "dark:bg-dark-bg-window bg-theme-bg-window"
        )}
      >
        {nav.map((page) => (
          <div
            className="lg:child:hidden lg:child:hover:block relative"
            key={page.id}
          >
            <Link
              onClick={() => setOpenNav(false)}
              className={classNames(styles.link, pathname == relativeLink(page.slug) ? "text-pink-500" : "")}
              href={relativeLink(page.slug)}
            >
              {page.name}
            </Link>

            {page?.subpages && (
              <div className="lg:absolute min-w-full lg:text-center lg:pl-0 pl-5 right-0 top-full lg:mt-4 z-50 dark:bg-dark-bg-window bg-theme-bg-window">
                {page?.subpages?.map((subpage) => {
                  return (
                    <Link
                      key={subpage.id}
                      onClick={() => setOpenNav(false)}
                      className={classNames(styles.sublink, pathname == relativeLink(subpage.slug) ? "text-pink-500" : "")}
                      href={relativeLink(subpage.slug)}
                    >
                      {subpage.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
      <button
        aria-label="Change Theme"
        className="w-5 h-5 fixed right-4 top-20"
        onClick={() => {
          setDarkMode((prev) => {
            localStorage.setItem("jdi-dark-mode", (!prev).toString());
            return !prev;
          });
        }}
      >
        {darkMode ? (
          <SunIcon className="fill-white-smoke" />
        ) : (
          <MoonIcon className="text-eerie-black" />
        )}
      </button>
    </>
  );
};

export default MNavigation;
