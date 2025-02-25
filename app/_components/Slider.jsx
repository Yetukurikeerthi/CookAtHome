import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Slider({ sliderList }) {
  return (
    <div className="w-full max-w-screen-lg mx-auto"> {/* Limits max width */}
      <Carousel className="w-full h-[400px]"> {/* Fixed height */}
        <CarouselContent className="w-full h-full">
          {sliderList.map((slider, index) => {
            const imageUrl = slider.image?.[0]?.url
              ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${slider.image[0].url}`
              : "/fallback-image.jpg"; // Add a fallback image

            return (
              <CarouselItem key={index} className="w-full h-full">
                <Image
                  src={imageUrl}
                  width={1000}
                  height={400}
                  alt={slider.name || "slider"}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Slider;
