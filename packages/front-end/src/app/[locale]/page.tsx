import { useTranslations } from 'next-intl';
import { ArrowBigDownDash } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// COMPONENTS
import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { Card, ICard } from "@/components/Card/Card";
import { MetricsLink } from "@/components/MetricsLink/MetricsLink";
import { Metrics } from "@/components/Metrics/Metrics";
import { AboutUs } from "@/components/AboutUs/AboutUs";
import { Form } from "@/components/Form/Form";
import { Counter } from "@/components/Counter/Counter";

// HOME PAGE
export default function Home() {
  /* Hooks */
  const translateNavbar = useTranslations("Navbar");
  const translateHero = useTranslations("Hero");
  const translateForm = useTranslations("Form");
  const translateCouter = useTranslations("Counter");
  const translateMetricsLink = useTranslations("MetricsLink");
  const translateMetrics = useTranslations("Metrics");
  const translateAbout = useTranslations("About");
  const translateContactUs = useTranslations("ContactUs");

  /* Vars */
  const createLinkValidationMessages = {
    url: {
      stringBase: translateForm("urlFieldValidationMessages.stringBase"),
      stringEmpty: translateForm("urlFieldValidationMessages.stringEmpty"),
      stringMin: translateForm("urlFieldValidationMessages.stringMin"),
      stringUri: translateForm("urlFieldValidationMessages.stringUri"),
      anyRequired: translateForm("urlFieldValidationMessages.anyRequired"),
    },
    code: {
      stringBase: translateForm("codeFieldValidationMessages.stringBase"),
      stringEmpty: translateForm("codeFieldValidationMessages.stringEmpty"),
      stringMin: translateForm("codeFieldValidationMessages.stringMin"),
      stringMax: translateForm("codeFieldValidationMessages.stringMax"),
      anyRequired: translateForm("codeFieldValidationMessages.anyRequired"),
    },
  };

  /* Utils */
  const cards: ICard[] = [
    {
      title: translateForm("title"),
      description: translateForm("description"),
      large: true,
      component: (
        <Form
          inputUrlPlaceholder={translateForm("inputUrlPlaceholder")}
          inputCodePlaceholder={translateForm("inputCodePlaceholder")}
          buttonText={translateForm("buttonText")}
          successMessage={translateForm("successMessage")}
          copyMessage={translateForm("copyMessage")}
          fieldsValidationMessages={createLinkValidationMessages}
        />
      )
    },
    {
      title: 'Links',
      description: translateCouter("description"),
      large: false,
      component: <Counter />
    },
  ];

  /* Renders */
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center py-12">
      <Navbar
        text={translateNavbar("about")}
      />

      {/* Page Content */}
      <div className="z-10 flex flex-col justify-center items-center mt-24 px-5 xl:px-0">
        {/* Hero */}
        <section id="hero">
          <Hero
            title={translateHero("title")}
            description={translateHero("description")}
            developer={translateHero("developer")}
          />
        </section>

        {/* Create Link & Counter */}
        <section id="create" className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-4 xl:grid-cols-3">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              large={card.large}
              component={card.component}
            />
          ))}
        </section>

        {/* Metrics */}
        <section id="metrics" className="my-1 md:my-10 w-full max-w-screen-xl animate-fade-up gap-4 md:grid md:grid-cols-1 xl:grid-cols-3 flex flex-col-reverse">
          <MetricsLink
            title={translateMetricsLink('title')}
            description={translateMetricsLink('description')}
            buttonText={translateMetricsLink('buttonText')}
            buttonText2={translateMetricsLink('buttonText2')}
            createdAt={translateMetricsLink('createdAt')}
            clicks={translateMetricsLink('clicks')}
            code={translateMetricsLink('code')}
            originalUrl={translateMetricsLink('originalUrl')}
          />
          <Metrics
            title={translateMetrics("title")}
            description={translateMetrics("description")}
            tableHeader={translateMetrics("tableHeader")}
            tableHeader2={translateMetrics("tableHeader2")}
            emptyMessage={translateMetrics("emptyMessage")}
          />
        </section>

        {/* About */}
        <section id="about">
          <AboutUs
            title={translateAbout("title")}
            description={translateAbout("description")}
            description2={translateAbout("description2")}
            description3={translateAbout("description3")}
          />
        </section>

         {/* Get in touch */}
         <section id="getintouch" className="my-1 md:my-10 w-full max-w-screen-xl animate-fade-up gap-4">
          <Card
            title={translateContactUs("title")}
            large
            description={translateContactUs("description")}
            component={(
              <div className="flex flex-col items-center justify-center gap-2">
                <ArrowBigDownDash className="size-12 text-cyan-600 animate-pulse"/>
                <a
                  className="text-2xl text-cyan-600 hover:text-cyan-900 outline-none rounded-md ring-zinc-500 focus-visible:ring-2 transition-all duration-300"
                  href="https://links.soaresdev.com"
                  target="_blank"
                >
                  links.soaresdev.com
                </a>
              </div>
            )}
          />
        </section>
      </div>

      {/* Toast Notification */}
      <div className="z-30">
        <ToastContainer />
      </div>
    </main>
  );
}
