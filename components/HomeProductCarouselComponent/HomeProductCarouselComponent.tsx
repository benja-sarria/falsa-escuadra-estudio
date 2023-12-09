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
import { ProductReceivedType } from "@/types/projectTypes";
import { ProductPhotos } from "@prisma/client";
import { SectionTitleComponent } from "../SectionTitleComponent/SectionTitleComponent";
import { usePathname, useRouter } from "next/navigation";

export const HomeProductCarouselComponent = ({
    products,
}: {
    products: ProductReceivedType[];
}) => {
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const [mainSwiper, setMainSwiper] = useState<any>(undefined);

    const swiperRef = useRef(null);
    const router = useRouter();

    const carouselSection =
        siteTexts &&
        siteTexts.messages &&
        siteTexts.messages.home.carouselSection;
    const prodDetailSection =
        siteTexts && siteTexts.messages && siteTexts.messages.projectDetail;

    const pathname = usePathname();

    useEffect(() => {
        console.log("STATE-SWIPER", mainSwiper, pathname);

        const enter = (evt: Event) => {
            if (mainSwiper) {
                console.log("[stopping]", mainSwiper, mainSwiper.translate);

                mainSwiper.autoplay.stop();
                /*   const target = evt.target as HTMLElement;
                mainSwiper.params.autoplay.delay = 0;
                mainSwiper.params.speed = 0; */
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
                /*       const target = evt.target as HTMLElement;
                mainSwiper.params.autoplay.delay = 5000; // Back to default
                mainSwiper.params.speed = 5000; // Back to default */
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
            <div className={styles["home-carousel-title-container"]}>
                <SectionTitleComponent
                    text={
                        pathname.includes("/projects")
                            ? `${prodDetailSection?.carouselTitle.text}`
                            : `${carouselSection?.title?.text}`
                    }
                    styleVariants={
                        pathname.includes("/projects") ? ["white-variant"] : []
                    }
                />
            </div>
            <div className={styles["home-carousel-carousel-container"]}>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={screen.availWidth < 768 ? 1 : 4}
                    //@ts-ignore
                    loopaddblankslides={"true"}
                    onSwiper={setMainSwiper}
                    loop={true}
                    ref={swiperRef}
                    autoplay={{
                        delay: 1,
                        waitForTransition: true,
                    }}
                    speed={3000}
                    freeMode={true}
                    modules={[Autoplay, FreeMode]}
                    className={styles["home-carousel-carousel"]}
                >
                    {products &&
                        products.length > 0 &&
                        products.map((swipe, index: number) => {
                            const baseOne = index + 1;
                            const portrait = swipe.photos.find(
                                (photo: ProductPhotos) => photo.isPortrait
                            );
                            if (baseOne % 3 === 0) {
                                return (
                                    <SwiperSlide
                                        key={swipe.id}
                                        className={`${styles["taller-slide"]} ${styles["swiper-slide"]}`}
                                        onClick={() => {
                                            router.push(
                                                `/projects/${swipe.productSlug}`
                                            );
                                        }}
                                    >
                                        <div className={styles["img-outer"]}>
                                            <AutoAdjustImgComponent
                                                alt="project slide"
                                                givenClassName={
                                                    styles["image-inner"]
                                                }
                                                src={`${
                                                    portrait?.src ||
                                                    "/static/placeholder.webp"
                                                }`}
                                                calculate="width"
                                                fixedParameter="--img-min-height"
                                            />
                                        </div>
                                        <div
                                            className={
                                                styles["card-title-container"]
                                            }
                                        >
                                            <h5>{swipe.title}</h5>
                                            <p>
                                                {swipe.content.length > 50
                                                    ? `${swipe.content.slice(
                                                          0,
                                                          50
                                                      )}...`
                                                    : `${swipe.content}`}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                );
                            } else if (baseOne % 2 === 0) {
                                return (
                                    <SwiperSlide
                                        className={`${styles["wider-slide"]} ${styles["swiper-slide"]}`}
                                        key={swipe.id}
                                        onClick={() => {
                                            router.push(
                                                `/projects/${swipe.productSlug}`
                                            );
                                        }}
                                    >
                                        <div className={styles["img-outer"]}>
                                            <AutoAdjustImgComponent
                                                alt="project slide"
                                                givenClassName={
                                                    styles["image-inner"]
                                                }
                                                src={`${
                                                    portrait?.src ||
                                                    "/static/placeholder.webp"
                                                }`}
                                                calculate="height"
                                                fixedParameter="--img-min-width"
                                            />
                                        </div>
                                        <div
                                            className={
                                                styles["card-title-container"]
                                            }
                                        >
                                            <h5>{swipe.title}</h5>
                                            <p>
                                                {swipe.content.length > 50
                                                    ? `${swipe.content.slice(
                                                          0,
                                                          50
                                                      )}...`
                                                    : `${swipe.content}`}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                );
                            }
                            return (
                                <SwiperSlide
                                    className={`${styles["squarer-slide"]} ${styles["swiper-slide"]}`}
                                    key={swipe.id}
                                    onClick={() => {
                                        router.push(
                                            `/projects/${swipe.productSlug}`
                                        );
                                    }}
                                >
                                    <div className={styles["img-outer"]}>
                                        <AutoAdjustImgComponent
                                            alt="project slide"
                                            givenClassName={
                                                styles["image-inner"]
                                            }
                                            src={`${
                                                portrait?.src ||
                                                "/static/placeholder.webp"
                                            }`}
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
                                    <div
                                        className={
                                            styles["card-title-container"]
                                        }
                                    >
                                        <h5>{swipe.title}</h5>
                                        <p>
                                            {swipe.content.length > 50
                                                ? `${swipe.content.slice(
                                                      0,
                                                      50
                                                  )}...`
                                                : `${swipe.content}`}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </div>
    );
};
