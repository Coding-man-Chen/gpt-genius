import ToursForm from "@/components/ToursForm";
import { getAllTours } from "@/utils/action";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

const ToursPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey:['tasks'],
    queryFn:() => getAllTours()
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToursForm/>
    </HydrationBoundary>
  );
};

export default ToursPage;
