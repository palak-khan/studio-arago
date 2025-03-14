function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();
const tl = gsap.timeline();

function page1Gsap() {
  tl.from(
    ".line",
    0.5,
    {
      opacity: 0,
      width: 0,
    },
    0.5,
  );

  tl.from(
    ".top-left",
    0.5,
    {
      opacity: 0,
    },
    1,
  );

  tl.from(
    ".bottom-right",
    0.5,
    {
      opacity: 0,
    },
    1,
  );

  tl.to(
    ".line",
    0.7,
    {
      width: "100%",
    },
    1.5,
  )
    .to(
      ".top-left",
      0.7,
      {
        top: "-2%",
        left: "2%",
        fontSize: "6vw",
      },
      1.5,
    )
    .to(
      ".bottom-right",
      0.7,
      {
        top: "82%",
        left: "80%",
        fontSize: "6vw",
      },
      1.5,
    )
    .to(
      ".page1-overlay",
      0.7,
      {
        opacity: 0,
      },
      1.5,
    );

  tl.from(".stagger,.stagger>h1", {
    opacity: 0,
    stagger: 0.1,
    y: 50,
  });
}

page1Gsap();

function page6Animation() {
  const allTopH1 = document.querySelectorAll(".scroller-plus-elem>h1");
  const scrollerPlus = document.querySelectorAll(".scroller-plus-elem");
  let page6Img = document.querySelector(".page6-img-container>img");
  const imgSrc = [
    "https://studioarago.ca/wp-content/uploads/2023/08/arago_publicitaire-1200x1799.webp",
    "https://studioarago.ca/wp-content/uploads/2023/08/arago_architecture-1200x800.webp",
    "https://studioarago.ca/wp-content/uploads/2023/06/arago_bradorf-origa-2-1200x1800.webp",
    "https://studioarago.ca/wp-content/uploads/2023/08/arago_publicitaire-1200x1799.webp",
    "https://studioarago.ca/wp-content/uploads/2023/08/arago_architecture-1200x800.webp",
    "https://studioarago.ca/wp-content/uploads/2023/06/arago_bradorf-origa-2-1200x1800.webp",
  ];

  allTopH1.forEach((h1, index) => {
    h1.addEventListener("mouseenter", (dets) => {
      for (let i = 0; i < allTopH1.length; i++) {
        if (i < 2) {
          scrollerPlus[i].classList.add("paused");
        }
        if (index === i) {
          gsap.to(h1, {
            opacity: 1,
          });
          gsap.to(".page6-img-container>img", {
            opacity: 1,
          });
          page6Img.src = imgSrc[index];
        } else {
          gsap.to(allTopH1[i], {
            opacity: 0.2,
          });
        }
      }
    });
    h1.addEventListener("mouseleave", () => {
      gsap.to(".page6-img-container>img", {
        opacity: 0,
      });
      for (let i = 0; i < allTopH1.length; i++) {
        if (i < 2) {
          scrollerPlus[i].classList.remove("paused");
        }
        gsap.to(allTopH1[i], {
          opacity: 1,
        });
      }
    });
  });

  const allBottomH1 = document.querySelectorAll(".scroller-minus-elem>h1");
  const scrollerMinus = document.querySelectorAll(".scroller-minus-elem");
  const imgSrc2 = [
    "https://studioarago.ca/wp-content/uploads/2023/08/arago_nature-morte-1200x800.webp",
    "https://studioarago.ca/wp-content/uploads/2023/08/arago_corporatif-1200x1800.webp",
    "https://studioarago.ca/wp-content/uploads/2023/08/arago_design-1200x1803.webp",
    "https://studioarago.ca/wp-content/uploads/2023/08/arago_nature-morte-1200x800.webp",
    "https://studioarago.ca/wp-content/uploads/2023/08/arago_corporatif-1200x1800.webp",
    "https://studioarago.ca/wp-content/uploads/2023/08/arago_design-1200x1803.webp",
  ];

  allBottomH1.forEach((h1, index) => {
    h1.addEventListener("mouseenter", (dets) => {
      for (let i = 0; i < allBottomH1.length; i++) {
        if (i < 2) {
          scrollerMinus[i].classList.add("paused");
        }
        if (index === i) {
          gsap.to(h1, {
            opacity: 1,
          });
          gsap.to(".page6-img-container>img", {
            opacity: 1,
          });
          page6Img.src = imgSrc2[index];
        } else {
          gsap.to(allBottomH1[i], {
            opacity: 0.2,
          });
        }
      }
    });
    h1.addEventListener("mouseleave", () => {
      gsap.to(".page6-img-container>img", {
        opacity: 0,
      });
      for (let i = 0; i < allBottomH1.length; i++) {
        if (i < 2) {
          scrollerMinus[i].classList.remove("paused");
        }
        gsap.to(allBottomH1[i], {
          opacity: 1,
        });
      }
    });
  });
}

page6Animation();
