import Image from "next/image";
import type { ReactNode } from "react";

const SIZE_CLASS = "size-[1em]";
const AWS_ICONS_BASE =
  "https://cdn.jsdelivr.net/npm/aws-icons@latest/icons/architecture-service";

const AWS_ICON_SLUGS = {
  cloudformation: "AWSCloudFormation.svg",
  cloudfront: "AmazonCloudFront.svg",
  cloudwatch: "AmazonCloudWatch.svg",
  dynamodb: "AmazonDynamoDB.svg",
  ec2: "AmazonEC2.svg",
  lambda: "AWSLambda.svg",
  lightsail: "AmazonLightsail.svg",
  rds: "AmazonRDS.svg",
  route53: "AmazonRoute53.svg",
  s3: "AmazonS3onOutposts.svg",
} as const;

type AwsIconSlug = keyof typeof AWS_ICON_SLUGS;

function AwsServiceIcon({ file }: { file: string }) {
  return (
    <Image
      alt=""
      className={SIZE_CLASS}
      height={32}
      src={`${AWS_ICONS_BASE}/${file}`}
      width={32}
    />
  );
}

export function resolveAwsIcon(slug: string): ReactNode | null {
  if (!(slug in AWS_ICON_SLUGS)) {
    return null;
  }

  const file = AWS_ICON_SLUGS[slug as AwsIconSlug];

  return <AwsServiceIcon file={file} />;
}
