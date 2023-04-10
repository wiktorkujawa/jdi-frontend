import classNames from "classnames";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
// import styles from 'theme/components/organisms/ORichText.module.css'

const types = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li"];

// type upload:
// value -> mimeType: if includes image sizes [ thumbnail card or tablet -> url and filename] else url

// type relationship:
// realtionTo and value -> dynamic component

// children or value

interface ICopy {
  type?: string;
  text?: string;
  value?: any;
  children?: ICopy[];
  indent: number;
  doc?: any;
  url?: string;
  relationTo?: string;
  newTab?: boolean;
}

type Props = {
  copy: ICopy[];
};

const Children: FC<ICopy> = ({
  type,
  children,
  value,
  text,
  indent,
  url,
  doc,
  newTab,
  relationTo,
  ...rest
}) => {
  if (text?.length == 0) {
    return <br />;
  }
  if (text) {
    const tags = Object.keys(rest);
    return tags.length ? (
      <span className={tags.join(" ")}>{text}</span>
    ) : (
      <>{text}</>
    );
  }
  if (type == "upload") {
    const {
      mimeType,
      sizes: { thumbnail, tablet, card },
    } = value;
    if (mimeType.includes("image")) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="object-cover"
          loading="lazy"
          srcSet={`${thumbnail.url} ${thumbnail.width}w ${thumbnail.height}h, ${tablet.url} ${tablet.width}w ${tablet.height}h, ${card.url} ${card.width}w ${card.height}h`}
          sizes={`(max-width: 640px) ${thumbnail.width}px,
                (max-width: 1024px) ${tablet.width}px
                ${card.width}px
                `}
          alt={thumbnail.filename}
        />
      );
    } else {
      return (
        <video
          controls
          className="object-cover"
          width="auto"
          height="auto"
          src={value.url}
        />
      );
    }
  }
  if (type == "link") {
    return (
      <a
        target={newTab ? "_blank" : "_self"}
        href={url || doc?.value?.slug}
        rel="noreferrer"
      >
        {children?.map((item, index) => (
          <Children key={index} {...item} />
        ))}
      </a>
      // <Link
      //   target={newTab ? "_blank" : "_self"}
      //   href={url || doc?.value?.slug}
      //   rel="noreferrer"
      // >
      //   {children?.map((item, index) => (
      //     <Children key={index} {...item} />
      //   ))}
      // </Link>
    );
  }
  let newIndent = indent;
  if (type == "indent") {
    newIndent += 10;
    return (
      <>
        {children?.map((item: any, childrenIndex: number) => {
          let newItem = { ...item, indent: newIndent };
          return <Children key={childrenIndex} {...newItem} />;
        })}
      </>
    );
  }

  if (!type || types.includes(type as string)) {
    return React.createElement(
      type || "p",
      {
        style: {
          marginLeft: indent + "px",
        },
      },

      children?.map((item: any, childrenIndex: number) => {
        let newItem = { ...item, indent: newIndent };
        return <Children key={childrenIndex} {...newItem} />;
      })
    );
  } else return <div>Dynamic component {relationTo}</div>;
};

const ORichText: FC<Props> = ({ copy }) => {
  return (
    <>
      {copy.map((item, index) => {
        const newItem = { ...item, indent: 0 };
        return <Children key={index} {...newItem} />;
      })}
    </>
  );
};

export default ORichText;

// <CldImage
//   // className="object-cover"
//   width={sizes.thumbnail.width}
//   height={sizes.thumbnail.height}
//   src={'media/dixllxld7fxy7ugirjhj'}
//   alt={sizes.thumbnail.filename}
// />
// <Image
//   className="object-cover"
//   width={sizes.thumbnail.width}
//   height={sizes.thumbnail.height}
//   src={'media/dixllxld7fxy7ugirjhj'}
//   alt={sizes.thumbnail.filename}
// />
// media/dixllxld7fxy7ugirjhj
