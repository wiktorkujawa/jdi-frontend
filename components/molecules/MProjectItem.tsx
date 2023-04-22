import { Project } from "@/interfaces";
import Link from "next/link";
import React from "react";
import AButton from "../atoms/AButton";
import styles from "theme/components/molecules/MProjectItem.module.css";
import classNames from "classnames";
import { CldImage, CldVideoPlayer } from "next-cloudinary";

type Props = {
  field: Project;
  main?: boolean;
};

const MProjectItem = ({
  field: {
    media: {
      cloudinary: {
        public_id,
        resource_type,
        original_filename
      },
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
            <CldVideoPlayer
              width={2}
              height={1}
              src={public_id}
              autoPlay="on-scroll"
              muted
              loop
              controls={false}
            />
          ) : (
            <div className="bg-dark-bg o-aspect-ratio o-aspect-ratio--2:1">
              <CldImage
                fill
                loading="lazy"
                src={public_id}
                sizes={`(max-width: 1024px) 100vw,
                50vw
                `}
                className="o-aspect-ratio__content object-contain mx-auto"
                alt={original_filename}
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
