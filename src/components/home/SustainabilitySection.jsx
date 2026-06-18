import { Button } from "@heroui/react";
import {
  Snowflake,
  ArrowsRotateRight,
} from "@gravity-ui/icons";
import SustainabilityImg from "@/../public/sustainability.png";
import Image from "next/image";
const features = [
  {
    title: "Carbon Footprint Neutrality",
    description:
      "We offset 100% of marketplace shipping emissions.",
    icon: Snowflake,
  },
  {
    title: "Zero-Waste Network",
    description:
      "Prevented 850k items from reaching landfill this year.",
    icon: ArrowsRotateRight,
  },
];

export default function SustainabilitySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-3 py-1 rounded-lg bg-green-100 text-green-700 text-sm mb-4">
            Eco Mission
          </span>

          <h2 className="text-4xl font-bold mb-6">
            Our Planet-First Impact Commitment
          </h2>

          <p className="text-default-500 text-lg mb-8">
            Every second-hand purchase avoids new production
            emissions and diverts functional items from
            landfills.
          </p>

          <div className="space-y-6">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      {item.title}
                    </h4>

                    <p className="text-default-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            variant="bordered"
            className="mt-8"
          >
            Download Impact Report
          </Button>
        </div>

        <div>
          <Image
            src={SustainabilityImg}
            alt="Sustainability"
            className="rounded-3xl w-full"
          />
        </div>
      </div>
    </section>
  );
}