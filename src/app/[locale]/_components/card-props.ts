export type OrganizationProps = {
  name: string;
  website?: string;
  logo?: string;
};

export function mapOrganization(org: {
  name: string;
  website?: string | null;
  logo?: string | null;
}): OrganizationProps {
  return {
    name: org.name,
    website: org.website ?? undefined,
    logo: org.logo ?? undefined,
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
