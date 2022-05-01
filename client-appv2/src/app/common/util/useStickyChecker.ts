import { useEffect, useState } from "react";

export const useStickyChecker = (
  elementClass: string,
  callback: (value: boolean) => void
) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isReadyForSticky, setIsReadyForSticky] = useState(false);
  let originalElDistanceToTop = 0;

  useEffect(() => {
    const onScroll = () => {
      setTimeout(
        () =>
          onScrollHandler(
            setScrollPosition,
            scrollPosition,
            elementClass,
            originalElDistanceToTop,
            setIsReadyForSticky,
            callback
          ),
        3000
      );
      //   originalElDistanceToTop = ;
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return isReadyForSticky;
};

function onScrollHandler(
  setScrollPosition: any,
  scrollPosition: number,
  elementClass: string,
  originalElDistanceToTop: number,
  setIsReadyForSticky: any,
  callback: (value: boolean) => void
) {
  //   setScrollPosition(window.pageYOffset);
  //   console.log("window.pageYOffset");
  //   console.log(window.pageYOffset);
  //   console.log("scrollPosition");

  //   console.log(scrollPosition);

  var el = document.querySelector(elementClass);
  if (el !== null) {
    var elDistanceToTop =
      window.pageYOffset + el!.getBoundingClientRect().bottom;
    if (originalElDistanceToTop === 0) {
      originalElDistanceToTop = elDistanceToTop;
    }
    // console.log("distance to top");
    // console.log(elDistanceToTop);
    // window.pageYOffset >= originalElDistanceToTop
    //   ? console.log("sticky is true")
    //   : console.log("sticky is false");
    setIsReadyForSticky(window.pageYOffset >= originalElDistanceToTop);
    callback(window.pageYOffset >= originalElDistanceToTop);
  }
  return originalElDistanceToTop;
}
// export default useScrollPosition;
