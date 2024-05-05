import { IData } from "@/interfaces";
import MNavigation from "@/components/molecules/MNavigation";

const getHeaderData = async () => {
  const res = await fetch(`${process.env.API_URL}globals/navigation`, {
    next: {
      tags: ["navigation"],
    },
  });
  const data: IData = await res.json();
  return data;
};

const CHeader = async () => {

  const { page, pages } = await getHeaderData();
  return <MNavigation nav={[...page, ...pages]} />;
};

export default CHeader;
