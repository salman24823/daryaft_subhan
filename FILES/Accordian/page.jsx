import { Accordion, AccordionItem } from "@heroui/react";

export default function Accordian() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="custom_bg min-h-screen items-center flex justify-center w-full">
      <div className="px-[5%] w-4/5">
      <h2 className="text-center text-blue-600 text-lg font-semibold mt-10 mb-2">Questions</h2>
      <h2 className="text-center text-gray-800 text-3xl font-semibold mb-10">Frequently Ask Question</h2>
        <Accordion variant="splitted">
          <AccordionItem
            className="border border-slate-200 shadow-sm"
            key="1"
            aria-label="Accordion 1"
            title="Accordion 1"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            className="border border-slate-200 shadow-sm"
            key="2"
            aria-label="Accordion 2"
            title="Accordion 2"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            className="border border-slate-200 shadow-sm"
            key="3"
            aria-label="Accordion 3"
            title="Accordion 3"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            className="border border-slate-200 shadow-sm"
            key="3"
            aria-label="Accordion 3"
            title="Accordion 4"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            className="border border-slate-200 shadow-sm"
            key="3"
            aria-label="Accordion 3"
            title="Accordion 5"
          >
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
