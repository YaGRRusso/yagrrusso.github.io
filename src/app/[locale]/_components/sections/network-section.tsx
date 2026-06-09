import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionTitle } from "@/components/section-title";
import { Carousel } from "@/components/ui/carousel";
import { getNetwork } from "@/consts/network";
import { NetworkCard } from "../network-card";

export function NetworkSection() {
  const t = useTranslations("homePage");

  return (
    <div className="w-full">
      <Carousel.Root
        className="container relative flex w-full flex-col justify-center gap-8"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <AnimateOnScroll
          className="flex flex-1 flex-wrap justify-between gap-8"
          y={16}
        >
          <SectionTitle
            description={t("sections.network.description")}
            id="my-network"
            title={t("sections.network.title")}
          />
          <div className="flex h-fit items-center gap-4">
            <Carousel.Previous />
            <Carousel.Next />
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll y={16}>
          <Carousel.Content>
            <NetworkCard
              avatar={getNetwork("ftarganski")?.avatar}
              name={getNetwork("ftarganski")?.name}
              role={getNetwork("ftarganski")?.role}
              urls={getNetwork("ftarganski")?.urls}
            />
            <NetworkCard
              avatar={getNetwork("andre94cavalcante")?.avatar}
              name={getNetwork("andre94cavalcante")?.name}
              role={getNetwork("andre94cavalcante")?.role}
              urls={getNetwork("andre94cavalcante")?.urls}
            />
            <NetworkCard
              avatar={getNetwork("aeciobrumel")?.avatar}
              name={getNetwork("aeciobrumel")?.name}
              role={getNetwork("aeciobrumel")?.role}
              urls={getNetwork("aeciobrumel")?.urls}
            />
            <NetworkCard
              avatar={getNetwork("gabrielh-silvestre")?.avatar}
              name={getNetwork("gabrielh-silvestre")?.name}
              role={getNetwork("gabrielh-silvestre")?.role}
              urls={getNetwork("gabrielh-silvestre")?.urls}
            />
            <NetworkCard
              avatar={getNetwork("TVInacio")?.avatar}
              name={getNetwork("TVInacio")?.name}
              role={getNetwork("TVInacio")?.role}
              urls={getNetwork("TVInacio")?.urls}
            />
          </Carousel.Content>
        </AnimateOnScroll>
      </Carousel.Root>
    </div>
  );
}
