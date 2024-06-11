import { useState } from "react";

import SearchResult from "../pages/SearchResult";
import { useInfiniteQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { JokeResponse } from "../types/api";
import { Header } from "../layouts/Header";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useDebounce from "../utils/useDebounce";

export default function SearchResultRoute() {
  const defaultSearch =
    new URLSearchParams(window.location.search).get("term") ?? "";
  const [search, setSearch] = useState(defaultSearch);
  const debouncedSearch = useDebounce(search, 500);


  function handleSearch(text: string) {
    setSearch(text);
  }

  const query = useInfiniteQuery({
    queryKey: ["jokes", debouncedSearch],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `https://icanhazdadjoke.com/search?term=${debouncedSearch}&page=${pageParam}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      return response.json();
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) =>
      firstPage.previous_page &&
        firstPage.previous_page !== firstPage.current_page
        ? firstPage.previous_page
        : undefined,
    getNextPageParam: (lastPage) =>
      lastPage.next_page && lastPage.next_page !== lastPage.current_page
        ? lastPage.next_page
        : undefined,
  });

  const jokes = query.data?.pages.map(
    (page) => page.results
  ) as JokeResponse["results"][];

  function searchResults() {
    if (query.isLoading) {
      return (
        <Stack>
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={60} />
          ))}
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} variant="text" height={60} />
          ))}
          {Array.from({ length: 1 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={60} />
          ))}
        </Stack>
      );
    }

    if (query.isError) {
      return <Box>Error: {query.error.message}</Box>;
    }

    if (query.isSuccess && jokes[0].length > 0) {
      return (
        <Stack>
          <SearchResult jokes={jokes} />
          <Button
            variant="outlined"
            onClick={() => {
              query.fetchNextPage();
            }}
            disabled={!query.hasNextPage || query.isFetchingNextPage}
          >
            Load more results
          </Button>
        </Stack>
      );
    }

    return <Stack sx={{ textAlign: "center" }}>No jokes found :(</Stack>;
  }

  return (
    <>
      <Header
        isLoading={query.isLoading}
        setSearch={handleSearch}
        search={search}
      />
      <Box
        sx={{
          padding: "1.5em",
          flex: 1,
          overflowY: "auto",
        }}
      >
        {searchResults()}
      </Box>
    </>
  );
}
