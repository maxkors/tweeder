import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "./getQueryClient";
import getAllTweets from "./tweetsClient";
import Feed from "@/components/Feed";

export default async function HydratedFeed() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Feed />
    </HydrationBoundary>
  );
}
