import { FunctionComponent } from "react";
import { dateToReadableTextDate } from "src/lib/functions";
import Link from "next/link";

interface INewTitleProps {
  title: string;
  slug: string;
  date: string;
}

const NewTitle: FunctionComponent<INewTitleProps> = ({ title, slug, date }) => {
  return (
    <>
      <li>
        <h3>{dateToReadableTextDate(date.toString())}</h3>
        <Link href={`/news_blogs/${slug}`}>
          <a>{title}</a>
        </Link>
      </li>
    </>
  );
};

export default NewTitle;
