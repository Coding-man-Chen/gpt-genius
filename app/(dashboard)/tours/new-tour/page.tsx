import NewTour from "@/components/NewTour";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

const NewTourPage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <NewTour/>
    </HydrationBoundary>
  );
};

export default NewTourPage;
