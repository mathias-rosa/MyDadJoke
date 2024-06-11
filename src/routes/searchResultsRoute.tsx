import { useEffect, useState } from "react";

import SearchResult from "../pages/SearchResult";
import { useInfiniteQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { JokeResponse } from "../types/api";
import { Header } from "../layouts/Header";
import styled from "styled-components";
import Stack from "@mui/material/Stack";


export default function SearchResultRoute() {
  const defaultSearch =
    new URLSearchParams(window.location.search).get("term") ?? "";
  const [search, setSearch] = useState(defaultSearch);

  useEffect(() => {
    if (search) {
      document.title = `Search Results - ${search}`;
    }
    document.title = "Search Results";
  }, [search]);

  function handleSearch(text: string) {
    setSearch(text);
  }

  const query = useInfiniteQuery({
    queryKey: ["jokes", search],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `https://icanhazdadjoke.com/search?term=${search}&page=${pageParam}`,
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
          {Array.from({ length: 1}).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={60} />
          ))}
        </Stack>
      );
    }

    if (query.isError) {
      return <div>Error: {query.error.message}</div>;
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

    const NoJokes = styled.div`
      width: 100%;
      text-align: center;
    `;

    return <NoJokes>No jokes found :(</NoJokes>;
  }

  return (
    <>
      <Header
        isLoading={query.isLoading}
        setSearch={handleSearch}
        search={search}
      />
      <div
        style={{
          padding: "1.5em",
          flex: 1,
          overflowY: "auto",
        }}
      >
        {searchResults()}
      </div>
    </>
  );
}
