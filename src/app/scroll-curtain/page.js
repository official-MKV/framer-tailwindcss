"use client";
import React from "react";
import { useEffect, useState } from "react";

const page = () => {
  return (
    <div className="w-full h-fit relative" id="curtain">
      <ScrollWrapper>
        <section
          id="section-1"
          className="w-full h-screen bg-purple-300 flex items-center justify-center "
        >
          Section 1
        </section>

        <section
          id="section-2"
          className="w-full h-screen bg-green-300 flex items-center justify-center "
        >
          Section 2
        </section>
        <section
          id="section-3"
          className="w-full h-screen bg-blue-300 flex items-center justify-center "
        >
          Section 3
        </section>
        <section
          id="section-4"
          className="w-full h-screen bg-pink-300 flex items-center justify-center "
        >
          Section 4
        </section>
      </ScrollWrapper>
    </div>
  );
};

export default page;

const ScrollWrapper = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const numberOfChildren = React.Children.count(children);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ height: `${numberOfChildren * 100}vh` }}
      className="w-full relative"
    >
      <div className="w-full h-screen sticky top-0">
        {React.Children.map(children, (child, index) => {
          const sectionStart = index * window.innerHeight;
          const sectionEnd = (index + 1) * window.innerHeight;
          const sectionTranslate =
            scrollPosition < sectionStart
              ? 0
              : Math.min(scrollPosition - sectionStart, window.innerHeight);

          console.log(`scection-${index + 1}:${sectionTranslate}`);
          return (
            <section
              key={index}
              className={`w-full h-screen absolute top-0`}
              style={{
                transform: `translateY(-${sectionTranslate}px)`,
                zIndex: 100 - index * 20,
              }}
            >
              {child}
            </section>
          );
        })}
      </div>
    </div>
  );
};
