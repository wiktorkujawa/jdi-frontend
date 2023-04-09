import { ProjectContent } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AButton from "../atoms/AButton";
import styles from "theme/components/molecules/MProjectItem.module.css";
import classNames from "classnames";

type Props = {
  field: ProjectContent;
  main?: boolean;
};

const MProjectItem = ({
  field: {
    media: {
      mimeType,
      url,
      original_doc: { filename }
    },
    description,
    name,
    button,
  },
  main,
}: Props) => {
  return (
    <article
      className={classNames(
        styles["m-project-item"],
        "text-center lg:w-1/2 px-2 w-full"
      )}
    >
      <figure>
        <Link href={"/"}>
          <h3 className={classNames(styles["m-project-item--header"])}>
            Project{" "}
          </h3>
          <h3 className="text-h3">{name}</h3>
          <div className="o-aspect-ratio o-aspect-ratio--2:1">
            {mimeType.includes("video") ? (
              <video
                className="o-aspect-ratio--content object-contain text-center mx-auto"
                width="auto"
                height="auto"
                src={url}
                autoPlay
                muted
                loop
              />
            ) : (
              <Image
                className="o-aspect-ratio__content object-contain mx-auto sm:w-96"
                src={url}
                fill
                alt={filename}
              />
            )}
          </div>
        </Link>
      </figure>

      <p className="mt-4">{description}</p>

      <AButton href={button.url} target="_blank">
        {button.text}
      </AButton>
    </article>
  );
};

export default MProjectItem;
