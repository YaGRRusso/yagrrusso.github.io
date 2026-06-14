import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetContributionsQuery = {
  contributions: {
    date: string;
    count: number;
    level: number;
  }[];
  total: number;
};

type GetContributionsQueryVariables = {
  username: string;
};

const getContributions = async ({
  username,
}: GetContributionsQueryVariables): Promise<GetContributionsQuery> => {
  const url = new URL(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
  );
  const response = await fetch(url);
  const data = await response.json();
  const total = data.total[new Date().getFullYear()];
  return { contributions: data.contributions, total };
};

export const useGetContributions = (
  data: GetContributionsQueryVariables,
  options?: Omit<UseQueryOptions<GetContributionsQuery>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["getContributions", data],
    queryFn: async () => await getContributions(data),
    ...options,
  });
