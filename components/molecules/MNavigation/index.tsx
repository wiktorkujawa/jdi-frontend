'use client';
import clsx from "clsx";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import styles from "./MNavigation.module.css";
import SunIcon from "@/public/assets/svg/sun.svg";
import MoonIcon from "@/public/assets/svg/moon.svg";
import { usePathname } from 'next/navigation'
import useScrollDetect from "@/hooks/useScrollDetect";
import Logo from "@/public/logo.svg";
import useRWD from "@/hooks/useRWD";

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
  const pathname = usePathname();
  const scrolling = useScrollDetect();
  const { isDesktop } = useRWD();
  const [openNav, setOpenNav] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

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
    <header
      className={clsx(
        styles.wrapperComponent,
        " dark:text-dark-font-primary text-theme-font-primary"
      )}
    >
      <div className={clsx("absolute transition-transform left-0 top-0 h-full w-full -translate-y-full bg-theme-bg-window dark:bg-dark-bg-window", (scrolling || (openNav && !isDesktop)) && "translate-y-0 shadow-menu")} />
      <div className={styles.content}>
        <Link aria-label="Homepage" className='z-10' href={"/"}>
          <Logo className={clsx(styles.logo, "dark:fill-white")} />
        </Link>
        <button
          aria-label="Toggle Menu"
          className={clsx(
            styles.button,
            { [styles.openButton]: openNav },
            "dark:border-dark-font-primary border-theme-font-primary"
          )}
          onClick={() => setOpenNav((prev) => !prev)}
        >
          <div
            className={clsx(
              styles.icon,
              "dark:bg-dark-font-primary bg-theme-font-primary"
            )}
          />
        </button>
        <nav
          className={clsx(
            styles.nav,
            { [styles.openNav]: openNav },
            "lg:bg-transparent dark:lg:bg-transparent dark:bg-dark-bg-window bg-theme-bg-window"
          )}
        >
          {nav.map((page) => (
            <div
              className="lg:child:hidden lg:child:hover:block relative"
              key={page.id}
            >
              <Link
                onClick={() => setOpenNav(false)}
                className={clsx(styles.link, pathname == relativeLink(page.slug) ? "text-pink-500" : "")}
                href={relativeLink(page.slug)}
              >
                {page.name}
              </Link>

              {page?.subpages && (
                <div className="lg:absolute min-w-full lg:text-center lg:pl-0 pl-5 right-0 top-full lg:pt-4 z-50 dark:bg-dark-bg-window bg-theme-bg-window">
                  {page?.subpages?.map((subpage) => {
                    return (
                      <Link
                        key={subpage.id}
                        onClick={() => setOpenNav(false)}
                        className={clsx(styles.sublink, pathname == relativeLink(subpage.slug) ? "text-pink-500" : "")}
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
      </div>
    </header>
  );
};

export default MNavigation;
