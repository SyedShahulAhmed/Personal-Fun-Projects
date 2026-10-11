export async function getCurrentlyReading() {
  const response = await fetch("https://api.hardcover.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HARDCOVER_API_KEY}`,
    },
    body: JSON.stringify({
      query: `
query CurrentBook {
  me {
    id
    username

    user_books(
      where: { status_id: { _eq: 2 } }
      limit: 1
    ) {
      id
      status_id

      user_book_reads {
        progress_pages
        edition {
          id
          title
          pages
          image {
            url
          }
        }
      }

      edition {
        id
        title
        pages
        image {
          url
        }
      }

      book {
        id
        title
        pages
        image {
          url
        }
        contributions {
          author {
            name
          }
        }
      }
    }
  }
}

        `,
    }),
    next: {
      revalidate: 21600, // 6 hours
    },
  });

  if (!response.ok) {
    throw new Error(`Hardcover API Error: ${response.status}`);
  }

  return response.json();
}

export function transformBook(data: any) {
  const user = data?.data?.me?.[0];
  const item = user?.user_books?.[0];

  if (!item) return null;

  const read = item.user_book_reads?.[0];

  const edition = read?.edition ?? item.edition;
  const book = item.book;

  const progress = Math.max(
    0,
    ...(item.user_book_reads?.map((read: any) => read.progress_pages ?? 0) ??
      []),
  );

  const totalPages = edition?.pages ?? book?.pages ?? 0;

  return {
    id: book.id,
    title: book.title,
    author: book.contributions?.[0]?.author?.name ?? "Unknown Author",

    coverImage: edition?.image?.url ?? book.image?.url ?? null,

    editionId: edition?.id ?? null,
    editionTitle: edition?.title ?? null,

    progress,
    totalPages,

    percentage:
      totalPages > 0
        ? Math.min(100, Math.round((progress / totalPages) * 100))
        : 0,
  };
}
