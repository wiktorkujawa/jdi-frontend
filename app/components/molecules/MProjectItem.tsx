import { ProjectContent } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AButton from "../atoms/AButton";
import styles from 'theme/components/molecules/MProjectItem.module.css'
import classNames from "classnames";

type Props = {
  field: ProjectContent;
  main?: boolean;
};

const MProjectItem = ({
  field: { media, description, name, button },
  main,
}: Props) => {

  return (
    <article className={classNames(styles['m-project-item'],'text-center lg:w-1/2 px-2 w-full')}>
      <figure>
        <Link href={'/'}>
          <h3 className={classNames(styles['m-project-item--header'])}>Project </h3>
          <h3 className="text-h3">{name}</h3>
        {media.mimeType.includes("video") ? (
          <video
            className="object-cover h-64 text-center mx-auto"
            width="auto"
            height="auto"
            src={media.url}
            autoPlay
            muted
            loop
          />
        ) : (
          <Image
            className="h-64 object-contain mx-auto"
            src={media.sizes.card.url}
            width={media.sizes.card.width}
            height={media.sizes.card.height}
            alt={media.sizes.card.filename}
          />
        )}
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
