import { Single2 } from "@/components/records/Single";
import { Author, AuthorConnectionQuery } from "@/tina/__generated__/types";

interface Props {
  query: string;
  data: AuthorConnectionQuery;
}

const Many = ({
  data: {
    authorConnection: { edges },
  },
}: Props) => {
  const author = edges && edges[0]?.node;
  console.log("author", author);
  return (
    <div className="p-4 max-w-[428px] sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {new Array(11).fill(-1).map((item, i) => {
          return (
            <article
              key={i}
              className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
            >
              <img
                alt=""
                src={
                  author?.wallpaper ||
                  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                }
                className="h-56 w-full object-cover"
              />

              <div className="p-4 sm:p-6">
                <a href="#">
                  <h3 className="text-lg font-medium text-gray-900">
                    {author?.name_en}
                  </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Recusandae dolores, possimus pariatur animi temporibus
                  nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                  quidem, mollitia itaque minus soluta, voluptates neque
                  explicabo tempora nisi culpa eius atque dignissimos. Molestias
                  explicabo corporis voluptatem?
                </p>

                <a
                  href={author?.pdfLink || "https://lichess.org/"}
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                >
                  PDF Link
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Many;

