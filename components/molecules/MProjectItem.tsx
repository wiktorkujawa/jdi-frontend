import { Project } from "@/interfaces";
import Link from "next/link";
import React from "react";
import AButton from "../atoms/AButton";
import styles from "theme/components/molecules/MProjectItem.module.css";
import classNames from "classnames";
import Image from "next/image";

type Props = {
  field: Project;
  main?: boolean;
};

const MProjectItem = ({
  field: {
    media: {
      cloudinary: { resource_type, original_filename },
      url,
      filename
    },
    description,
    name,
    button,
    mediaUrl,
  },
  main,
}: Props) => {
  return (
    <article
      className={classNames(
        styles["m-project-item"],
        `text-center ${main ? "" : "lg:w-1/2"} px-2 w-full`
      )}
    >
      <figure>
        <Link href={mediaUrl || button.url}>
          {!main && (
            <>
              <h3 className={classNames(styles["m-project-item--header"])}>
                Project{" "}
              </h3>
              <h3 className="text-h3">{name}</h3>
            </>
          )}

          {resource_type === "video" ? (
            <div className="o-aspect-ratio o-aspect-ratio--2:1">      
              <video
                poster="logowhite.svg"
                className="lazy o-aspect-ratio__content object-contain mx-auto"
                autoPlay
                muted
                loop
                playsInline 
                src={url}
              />
            </div>
          ) : (
            <div className="o-aspect-ratio o-aspect-ratio--2:1">
              <Image
                unoptimized
                fill
                src={url}
                // sizes={`(max-width: 1024px) 100vw,
                // 50vw
                // `}
                className="o-aspect-ratio__content object-contain mx-auto"
                alt={filename}
              />
            </div>
          )}
        </Link>
      </figure>

      {!main && <p className="mt-4">{description}</p>}

      <AButton href={button.url} target="_blank">
        {button.text}
      </AButton>
    </article>
  );
};

export default MProjectItem;
