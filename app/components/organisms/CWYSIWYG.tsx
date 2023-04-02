import ORichText from "@/app/features/ORichText";
import classNames from "classnames";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import Link from "next/link";
import React, { FC } from "react";
import LContainer from "../templates/LContainer";
// import styles from 'theme/components/organisms/CWYSIWYG.module.css'

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
  field: {
    copy: ICopy[];
  };
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
    const { mimeType, sizes } = value;
    if (mimeType.includes("image")) {
      return (
        <CldImage
          className="object-cover"
          width={sizes.thumbnail.width}
          height={sizes.thumbnail.height}
          src={sizes.thumbnail.url}
          alt={sizes.thumbnail.filename}
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

const CWYSIWYG: FC<Props> = ({ field: { copy } }) => {
  return (
    <section className={"s-wysiwyg my-16 o-container o-container--lg"}>
      <LContainer>
        <ORichText copy={copy} />
      </LContainer>
    </section>
  );
};

export default CWYSIWYG;

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
