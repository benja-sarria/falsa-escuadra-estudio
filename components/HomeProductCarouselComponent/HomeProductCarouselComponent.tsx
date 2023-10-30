"use client";
import styles from "@/components/HomeProductCarouselComponent/HomeProductCarouselComponent.module.scss";
import { useAppSelector } from "@/redux/store";
import { parseTags } from "@/utils/text/parseTags";
import { Autoplay, Navigation, Pagination, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { autoFigureItOutMeasureLimit } from "@/utils/img/proportions";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "swiper/scss/free-mode";
import "swiper/scss/autoplay";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { useEffect, useRef, useState } from "react";

export const HomeProductCarouselComponent = () => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const [mainSwiper, setMainSwiper] = useState<any>(undefined);

    const swiperRef = useRef(null);

    const carouselSection =
        siteTexts &&
        siteTexts.messages &&
        siteTexts.messages.home.carouselSection;

    useEffect(() => {
        console.log("STATE-SWIPER", mainSwiper);

        const enter = (evt: Event) => {
            if (mainSwiper) {
                console.log("[stopping]", mainSwiper, mainSwiper.translate);

                mainSwiper.autoplay.stop();
                const target = evt.target as HTMLElement;
                mainSwiper.params.autoplay.delay = 0;
                mainSwiper.params.speed = 0;
            }
        };
        const leave = (evt: Event) => {
            if (mainSwiper) {
                console.log(
                    "[stopping]",
                    mainSwiper,
                    mainSwiper.autoplay.start
                );
                mainSwiper.autoplay.start();
                const target = evt.target as HTMLElement;
                mainSwiper.params.autoplay.delay = 5000; // Back to default
                mainSwiper.params.speed = 5000; // Back to default
            }
        };
        if (mainSwiper && swiperRef.current) {
            const wrapper = (swiperRef.current as any).querySelector(
                ".swiper-wrapper"
            );
            if (wrapper) {
                wrapper.addEventListener("mouseenter", enter);
                wrapper.addEventListener("mouseleave", leave);
            }
        }
        return () => {
            if (mainSwiper && swiperRef.current) {
                const wrapper = (swiperRef.current as any).querySelector(
                    ".swiper-wrapper"
                );
                if (wrapper) {
                    wrapper.removeEventListener("mouseenter", enter);
                    wrapper.removeEventListener("mouseleave", leave);
                }
            }
        };
    }, [mainSwiper, swiperRef.current]);

    return (
        <div className={styles["home-carousel-container"]}>
            <h2 className={styles["home-carousel-title"]}>
                {carouselSection && parseTags(carouselSection.title.text)}
            </h2>
            <div className={styles["home-carousel-carousel-container"]}>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={3}
                    slidesPerGroup={1}
                    //@ts-ignore
                    loopaddblankslides="true"
                    loopfillgroupwithblank="false"
                    onSwiper={setMainSwiper}
                    loop={true}
                    ref={swiperRef}
                    freeMode={true}
                    autoplay={{
                        delay: 1,
                        waitForTransition: false,
                    }}
                    speed={6000}
                    modules={[Autoplay, FreeMode]}
                    className={styles["home-carousel-carousel"]}
                >
                    {[
                        "Slide 1",
                        "Slide 2",
                        "Slide 3",
                        "Slide 4",
                        "Slide 5",
                        "Slide 6",
                        "Slide 7",
                        "Slide 8",
                    ].map((swipe: string, index: number) => {
                        const baseOne = index + 1;
                        if (baseOne % 3 === 0) {
                            return (
                                <SwiperSlide
                                    key={swipe}
                                    className={`${styles["taller-slide"]}`}
                                >
                                    <div className={styles["img-outer"]}>
                                        <AutoAdjustImgComponent
                                            alt="project slide"
                                            givenClassName={
                                                styles["image-inner"]
                                            }
                                            src="/static/placeholder.webp"
                                            calculate="width"
                                            fixedParameter="--img-min-height"
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        } else if (baseOne % 2 === 0) {
                            return (
                                <SwiperSlide
                                    className={`${styles["wider-slide"]}`}
                                    key={swipe}
                                >
                                    <div className={styles["img-outer"]}>
                                        <AutoAdjustImgComponent
                                            alt="project slide"
                                            givenClassName={
                                                styles["image-inner"]
                                            }
                                            src="/static/placeholder.webp"
                                            calculate="height"
                                            fixedParameter="--img-min-width"
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        }
                        return (
                            <SwiperSlide
                                className={`${styles["squarer-slide"]}`}
                                key={swipe}
                            >
                                <div className={styles["img-outer"]}>
                                    <AutoAdjustImgComponent
                                        alt="project slide"
                                        givenClassName={styles["image-inner"]}
                                        src="/static/placeholder.webp"
                                        customCallback={(
                                            imgNode: HTMLImageElement
                                        ) => {
                                            autoFigureItOutMeasureLimit(
                                                imgNode,
                                                "--squarer-min-width",
                                                "--squarer-min-height",
                                                true
                                            );
                                        }}
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};
