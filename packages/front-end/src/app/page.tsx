import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// COMPONENTS
import { Card, ICard } from "./components/Card/Card";
import { Counter } from "./components/Counter/Counter";
import { Form } from "./components/Form/Form";
import { Hero } from "./components/Hero/Hero";
import { Metrics } from "./components/Metrics/Metrics";

// HOME PAGE
export default function Home() {
  /* Utils */
  const cards: ICard[] = [
    {
      title: "A beautiful shortened link to share",
      description: "Enter your original link and a shortening code, for example 'MYCODE' and create your shortened link.",
      large: true,
      component: <Form />
    },
    {
      title: 'Links',
      description: 'This is the number of links we have registered in our database.',
      large: false,
      component: <Counter />
    },
  ];

  /* Renders */
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center py-12">
      <div className="z-10 flex flex-col justify-center items-center mt-24 px-5 xl:px-0">
        <Hero />

        <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-4 xl:grid-cols-3">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              large={card.large}
              component={card.component}
            />
          ))}
        </div>

        <Metrics />
      </div>

      {/* Toast Notification */}
      <div className="z-30">
        <ToastContainer />
      </div>
    </main>
  );
}
