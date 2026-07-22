export type OrganizationProps = {
  name: string;
  website?: string;
  logo?: string;
};

export function mapOrganization(
  org?: {
    name: string;
    website?: string | null;
    logo?: string | null;
  } | null
): OrganizationProps {
  return {
    logo: org?.logo ?? undefined,
    name: org ? org.name : "Unknown",
    website: org?.website ?? undefined,
  };
}

export type PeriodProps = {
  from?: Date;
  to?: Date;
};

export function mapPeriod(
  period?: { from?: Date | null; to?: Date | null } | null
): PeriodProps | undefined {
  if (!period) return;

  return {
    from: period.from ?? undefined,
    to: period.to ?? undefined,
  };
}
