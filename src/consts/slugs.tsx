import { SiGraphql } from "@icons-pack/react-simple-icons";
import {
  CloudIcon,
  DatabaseIcon,
  ListMagnifyingGlassIcon,
  PackageIcon,
  PawPrintIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/avatar";
import { simpleIconsCdn } from "@/lib/cdn";

export type SlugType = {
  icon: ReactNode;
};

export const SLUGS = {
  other: { icon: <PackageIcon /> },
  codegen: { icon: <SiGraphql /> },
  typesense: { icon: <DatabaseIcon /> },
  nuqs: { icon: <ListMagnifyingGlassIcon /> },
  zustand: { icon: <PawPrintIcon /> },
  aws: { icon: <CloudIcon /> },
  lightsail: {
    icon: (
      <Image
        alt="Lightsail"
        className="size-[1em]"
        height={30}
        src="https://cdn.jsdelivr.net/npm/aws-icons@latest/icons/architecture-service/AmazonLightsail.svg"
        width={30}
      />
    ),
  },
  ec2: {
    icon: (
      <Image
        alt="EC2"
        className="size-[1em]"
        height={30}
        src="https://cdn.jsdelivr.net/npm/aws-icons@latest/icons/architecture-service/AmazonEC2.svg"
        width={30}
      />
    ),
  },
  s3: {
    icon: (
      <Image
        alt="S3"
        className="size-[1em]"
        height={30}
        src="https://cdn.jsdelivr.net/npm/aws-icons@latest/icons/architecture-service/AmazonS3onOutposts.svg"
        width={30}
      />
    ),
  },
  lambda: {
    icon: (
      <Image
        alt="Lambda"
        className="size-[1em]"
        height={30}
        src="https://cdn.jsdelivr.net/npm/aws-icons@latest/icons/architecture-service/AWSLambda.svg"
        width={30}
      />
    ),
  },
  dynamodb: {
    icon: (
      <Image
        alt="DynamoDB"
        className="size-[1em]"
        height={30}
        src="https://cdn.jsdelivr.net/npm/aws-icons@latest/icons/architecture-service/AmazonDynamoDB.svg"
        width={30}
      />
    ),
  },
  rds: {
    icon: (
      <Image
        alt="RDS"
        className="size-[1em]"
        height={30}
        src="https://cdn.jsdelivr.net/npm/aws-icons@latest/icons/architecture-service/AmazonRDS.svg"
        width={30}
      />
    ),
  },
  route53: {
    icon: (
      <Image
        alt="Route 53"
        className="size-[1em]"
        height={30}
        src="https://cdn.jsdelivr.net/npm/aws-icons@latest/icons/architecture-service/AmazonRoute53.svg"
        width={30}
      />
    ),
  },
  cloudfront: {
    icon: (
      <Image
        alt="CloudFront"
        className="size-[1em]"
        height={30}
        src="https://cdn.jsdelivr.net/npm/aws-icons@latest/icons/architecture-service/AmazonCloudFront.svg"
        width={30}
      />
    ),
  },
  cloudwatch: {
    icon: (
      <Image
        alt="CloudWatch"
        className="size-[1em]"
        height={30}
        src="https://cdn.jsdelivr.net/npm/aws-icons@latest/icons/architecture-service/AmazonCloudWatch.svg"
        width={30}
      />
    ),
  },
  cloudformation: {
    icon: (
      <Image
        alt="CloudFormation"
        className="size-[1em]"
        height={30}
        src="https://cdn.jsdelivr.net/npm/aws-icons@latest/icons/architecture-service/AWSCloudFormation.svg"
        width={30}
      />
    ),
  },
} as const satisfies Record<string, SlugType>;

export function getSlug(value: keyof typeof SLUGS | (string & {})) {
  const slug = SLUGS[value as keyof typeof SLUGS];
  if (slug) return slug;

  return {
    icon: (
      <Avatar.Root className="size-[1em] rounded-none">
        <Avatar.Image alt={value} src={simpleIconsCdn(value)} />
        <Avatar.Fallback className="bg-transparent">
          {SLUGS.other.icon}
        </Avatar.Fallback>
      </Avatar.Root>
    ),
  };
}
