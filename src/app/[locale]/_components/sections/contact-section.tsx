import {
  EnvelopeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionTitle } from "@/components/section-title";
import { SocialLink } from "@/components/social-links";
import { Avatar } from "@/components/ui/avatar";
import { ContributionGraph } from "@/components/ui/contribution-graph";
import { Tooltip } from "@/components/ui/tooltip";
import { ContactForm, type ContactSchema } from "@/forms/contact";
import { useFindOneUserById } from "@/hooks/queries/auth";
import { useGetContributions } from "@/hooks/queries/external";
import { useMessages } from "@/hooks/reactive/use-messages";
import { PROFILE_USER_VARS } from "../../queries";

export function ContactSection() {
  const t = useTranslations("homePage");
  const tCommons = useTranslations("common");
  const findOneUserById = useFindOneUserById(PROFILE_USER_VARS);
  const getMessages = useMessages();
  const getContributions = useGetContributions({ username: "yagrrusso" });

  const handleSendMail = useCallback(
    (data: ContactSchema) => {
      window.location.href = `mailto:yagrrusso@gmail.com?subject=${data.name}&body=${data.message}%0A%0A${data.phone}%0A${data.email}`;
      toast.success(tCommons("successTitle"));
    },
    [tCommons]
  );

  return (
    <div className="w-full">
      <div className="container relative flex w-full flex-col gap-8">
        <div className="flex gap-x-32 gap-y-8 max-lg:flex-col">
          <AnimateOnScroll
            className="flex min-w-0 flex-1 flex-col gap-8"
            x={-16}
          >
            <SectionTitle
              description={t("sections.getInTouch.description")}
              id="get-in-touch"
              title={t("sections.getInTouch.title")}
            />
            <div className="flex flex-col gap-4">
              <div className="flex gap-6 max-sm:flex-col">
                <Avatar.Root className="size-20">
                  <Avatar.Image
                    src={findOneUserById.data?.findOneUserById?.avatar ?? ""}
                  />
                  <Avatar.Fallback>
                    {findOneUserById.data?.findOneUserById?.name?.charAt(0)}
                  </Avatar.Fallback>
                </Avatar.Root>
                <div className="flex flex-col gap-2">
                  <strong className="text-4xl">Yago Russo</strong>
                  <span className="text-muted-foreground">
                    {getMessages(findOneUserById.data?.findOneUserById?.i18n)
                      ?.title ?? t("title")}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <SocialLink
                  href="https://github.com/yagrrusso"
                  icon={<GithubLogoIcon className="size-6" />}
                  title="GitHub"
                />
                <SocialLink
                  href="https://www.linkedin.com/in/yago-russo"
                  icon={<LinkedinLogoIcon className="size-6" />}
                />
                <SocialLink
                  href="https://wa.me/5551986824203"
                  icon={<WhatsappLogoIcon className="size-6" />}
                />
                <SocialLink
                  href="mailto:yagrrusso@gmail.com"
                  icon={<EnvelopeIcon className="size-6" />}
                />
                <SocialLink
                  href="tel:51986824203"
                  icon={<PhoneIcon className="size-6" />}
                />
              </div>
            </div>
            <span className="text-muted-foreground">
              {t("sections.getInTouch.message")}
            </span>
          </AnimateOnScroll>
          <AnimateOnScroll className="min-w-0 flex-1" x={16}>
            <ContactForm onSub={handleSendMail} />
          </AnimateOnScroll>
        </div>
        {getContributions.data && (
          <AnimateOnScroll y={16}>
            <ContributionGraph.Root
              data={getContributions.data.contributions}
              labels={{
                legend: {
                  less: t("sections.getInTouch.contributionGraph.less"),
                  more: t("sections.getInTouch.contributionGraph.more"),
                },
              }}
            >
              <ContributionGraph.Calendar>
                {({ activity, dayIndex, weekIndex }) => (
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <ContributionGraph.Block
                        activity={activity}
                        dayIndex={dayIndex}
                        weekIndex={weekIndex}
                      />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <p className="font-semibold">{activity.date}</p>
                      <p>
                        {tCommons("contributions", { count: activity.count })}
                      </p>
                    </Tooltip.Content>
                  </Tooltip.Root>
                )}
              </ContributionGraph.Calendar>
              <ContributionGraph.Footer>
                <ContributionGraph.TotalCount>
                  {({ totalCount, year }) => (
                    <div className="text-muted-foreground">
                      {t("sections.getInTouch.contributionGraph.totalCount", {
                        count: totalCount,
                        year,
                      })}
                    </div>
                  )}
                </ContributionGraph.TotalCount>
                <ContributionGraph.Legend />
              </ContributionGraph.Footer>
            </ContributionGraph.Root>
          </AnimateOnScroll>
        )}
      </div>
    </div>
  );
}
