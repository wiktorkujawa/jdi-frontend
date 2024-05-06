import { Project } from "@/interfaces";
import Link from "next/link";
import AButton from "@/components/atoms/AButton";
import styles from "./MProjectItem.module.css";
import clsx from "clsx";
import Image from "next/image";
import { TABLET_WIDTH } from "@/consts";

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
    buttons,
    button,
    mediaUrl,
  },
  main,
}: Props) => {
  return (
    <article
      className={clsx(
        styles["m-project-item"],
        `text-center ${main ? "" : "lg:w-1/2"} px-2 w-full`
      )}
    >
      <figure>
        <Link target="_blank" href={mediaUrl || "#"}>
          {!main && (
            <>
              <h3 className={clsx(styles["m-project-item--header"])}>
                Project{" "}
              </h3>
              <h4 className="text-h3 font-bold mb-4">{name}</h4>
            </>
          )}

          {resource_type === "video" ? (
            <div className="o-aspect-ratio o-aspect-ratio--2:1 overflow-hidden">
              <video
                poster="logowhite.svg"
                className="lazy o-aspect-ratio__content object-contain mx-auto hover:scale-150 transition-transform"
                autoPlay
                muted
                loop
                playsInline
                src={url}
              />
            </div>
          ) : (
            <div className="o-aspect-ratio o-aspect-ratio--2:1 overflow-hidden">
              <Image
                fill
                src={filename}
                sizes={`(max-width: ${TABLET_WIDTH}px) 100vw, 50vw`}
                className="o-aspect-ratio__content object-contain mx-auto hover:scale-150 transition-transform"
                alt={original_filename}
              />
            </div>
          )}
        </Link>
      </figure>

      <div className="flex flex-col justify-between">
        {!main && <p className="mt-4">{description}</p>}

        <div className="flex flex-wrap justify-between">
          {
            buttons?.map(({ button }) => {
              return (
                <AButton aria-label={button.text} key={button.url} className="w-full flex justify-center lg:w-auto" href={button.url} target="_blank">
                  {button.text}
                </AButton>
              );
            })
          }
        </div>
        {main && <AButton aria-label={button.text} href={button.url} target="_blank">
          {button.text}
        </AButton>}
      </div>
    </article>
  );
};

export default MProjectItem;
