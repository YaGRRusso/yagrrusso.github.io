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
        <div className="flex flex-1 flex-wrap justify-between gap-8">
          <SectionTitle
            description={t("sections.network.description")}
            id="my-network"
            title={t("sections.network.title")}
          />
          <div className="flex h-fit items-center gap-4">
            <Carousel.Previous />
            <Carousel.Next />
          </div>
        </div>
        <AnimateOnScroll y={16}>
          <Carousel.Content>
            <NetworkCard
              avatar={getNetwork("aeciobrumel")?.avatar}
              name={getNetwork("aeciobrumel")?.name}
              role={getNetwork("aeciobrumel")?.role}
              urls={getNetwork("aeciobrumel")?.urls}
            />
            <NetworkCard
              avatar={getNetwork("lucas-fulber")?.avatar}
              name={getNetwork("lucas-fulber")?.name}
              role={getNetwork("lucas-fulber")?.role}
              urls={getNetwork("lucas-fulber")?.urls}
            />
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
              avatar={getNetwork("kbuczynski")?.avatar}
              name={getNetwork("kbuczynski")?.name}
              role={getNetwork("kbuczynski")?.role}
              urls={getNetwork("kbuczynski")?.urls}
            />
            <NetworkCard
              avatar={getNetwork("gabrielh-silvestre")?.avatar}
              name={getNetwork("gabrielh-silvestre")?.name}
              role={getNetwork("gabrielh-silvestre")?.role}
              urls={getNetwork("gabrielh-silvestre")?.urls}
            />
            <NetworkCard
              avatar={getNetwork("tvinacio")?.avatar}
              name={getNetwork("tvinacio")?.name}
              role={getNetwork("tvinacio")?.role}
              urls={getNetwork("tvinacio")?.urls}
            />
          </Carousel.Content>
        </AnimateOnScroll>
      </Carousel.Root>
    </div>
  );
}
