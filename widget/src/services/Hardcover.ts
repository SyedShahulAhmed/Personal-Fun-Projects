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

  if (!user?.user_books?.length) {
    return null;
  }

  const item = user.user_books[0];

  const progress = Math.max(
    ...(item.user_book_reads?.map((read: any) => read.progress_pages ?? 0) ?? [
      0,
    ]),
  );

  const totalPages = item.book?.pages ?? 0;

  return {
    id: item.book.id,

    title: item.book.title,

    author: item.book.contributions?.[0]?.author?.name ?? "Unknown Author",

    coverImage: item.book.image?.url ?? null,

    progress,

    totalPages,

    percentage: totalPages > 0 ? Math.round((progress / totalPages) * 100) : 0,
  };
}
