"use client";

import styles from "@/components/AboutUsCarouselComponent/AboutUsCarouselComponent.module.scss";
import { useState } from "react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionTitleComponent } from "../SectionTitleComponent/SectionTitleComponent";

import "react-multi-carousel/lib/styles.css";
import "swiper/scss/free-mode";
import "swiper/scss/autoplay";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { useAppSelector } from "@/redux/store";

export const AboutUsCarouselComponent = () => {
    const [links, setLinks] = useState<string[]>([
        "<b>Escuchamos</b>",
        "<b>Diseñamos</b>",
        "<b>Acompañamos</b>",
        "<b>Co-creamos</b>",
        "<b>Proyectamos</b>",
        "<b>Experimentamos</b>",
        "<b>Instalamos</b>",
        "<b>Creamos experiencias</b>",
    ]);
    const globalTexts = useAppSelector((state) => state.globalLanguage.value);
    const carouselTexts = globalTexts.messages?.aboutUs;
    return (
        <div className={styles["carousel-section"]}>
            <div className={styles["title-section"]}>
                <SectionTitleComponent
                    styleVariants={["white-variant", "s"]}
                    text={carouselTexts?.carouselTitle.text}
                />
            </div>
            <Swiper
                spaceBetween={1}
                slidesPerView={
                    typeof window !== "undefined"
                        ? screen.availWidth < 768
                            ? 1
                            : 4
                        : 4
                }
                //@ts-ignore
                loopaddblankslides={"true"}
                loop={true}
                autoplay={{
                    delay: 1,
                    waitForTransition: true,
                }}
                speed={5000}
                freeMode={true}
                modules={[Autoplay, FreeMode]}
                className={styles["about-us-carousel"]}
            >
                {links.map((link) => (
                    <SwiperSlide
                        key={link}
                        className={`${styles["taller-slide"]} ${styles["swiper-slide"]}`}
                        /*  onClick={() => {
                    router.push(`/projects/${swipe.productSlug}`);
                }} */
                    >
                        <SectionTitleComponent
                            styleVariants={["white-variant", "m"]}
                            text={link}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
