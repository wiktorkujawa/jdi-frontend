// import dynamic from "next/dynamic";
// import Image from "next/image";
import React from "react";
import LinkedinIcon from "/public/assets/svg/linkedin.svg";
import GithubIcon from "/public/assets/svg/github.svg";

// import AButton from "../atoms/AButton";
// const Asvg = dynamic(() =>  import("../atoms/ASvg"));

interface IAddress {
  street: string;
  city: string;
  country: string;
}
interface IPhone {
  id: string;
  number: number;
}
interface IEmail {
  id: string;
  email: number;
}
interface ISocial {
  id: string;
  name: string;
  url: string;
}

interface IFooterData {
  address: IAddress;
  phone: IPhone[];
  emails: IEmail[];
  socials?: ISocial[];
}

const getFooterData = async () => {
  const res = await fetch(`${process.env.API_URL}globals/footer`);
  const data: IFooterData = await res.json();
  return data;
};

const CFooter = async () => {
  const data = await getFooterData();
  return (
    <footer className="c-footer dark:bg-dark-bg-window bg-theme-bg-window dark:text-dark-font-primary text-theme-font-primary">
      <div className="o-container o-container--lg child:py-8 child:border-b-1 dark:child:border-dark-border child:border-theme-border last:child:border-none">
        <div className="flex">
          <p className="font-bold w-28 text-p1">ADDRESS</p>
          <address className="text-p1">
            {data.address.street} <br />
            {data.address.city} <br />
            {data.address.country}
          </address>
        </div>

        <div className="flex items-center">
          <p className="font-bold w-28 text-p1">PHONE</p>
          <address>
            {data.phone.map(({ id, number }) => (
              <a
                className="block hover:text-red-hover text-p1"
                href={`tel:+${number}`}
                key={id}
              >
                +{number}
              </a>
            ))}
          </address>
        </div>

        <div className="flex items-center">
          <p className="font-bold w-28 text-p1">EMAIL</p>
          <address>
            {data.emails.map(({ id, email }) => (
              <a
                className="block hover:text-red-hover text-p1"
                href={`mailto:${email}`}
                key={id}
              >
                {email}
              </a>
            ))}
          </address>
        </div>

        <div className="flex">
          <p className="font-bold w-28 text-p1">SOCIAL</p>
          <address className="flex gap-x-4">
            <a href="https://www.linkedin.com/in/wiktor-kujawa-110bb2194/" className="block hover:opacity-70">
              <LinkedinIcon className="fill-linkedin"/>
            </a>
            <a href="https://github.com/wiktorkujawa" className="block hover:opacity-70">
              <GithubIcon className="dark:fill-white"/>
            </a>
          </address>
        </div>
      </div>
    </footer>
  );
};

export default CFooter;


// {data?.socials?.map(({ id, name, url }) => (
//   // <AButton key={id} href={url} iconName={name} />
//   <a className="block" key={id} target="_blank" href={url}>
//     {/* <Image src={`/assets/svg/${name}.svg`} width={24} height={24} alt={name} /> */}
//     {/* <Asvg name={name} /> */}
//   </a>
// ))}