"use client";
import { animate, motion } from "framer-motion";

import { ReactNode, useEffect, useState } from "react";

export const AnimatedLogoComponent = ({
    children,
    styles,
}: {
    children: ReactNode;
    styles?: any;
}) => {
    const [stopAnimating, setStopAnimating] = useState<Boolean>(false);
    // useEffect(() => {}, [stopAnimating]);

    return (
        <motion.div
            onClick={
                !stopAnimating
                    ? () => {
                          setStopAnimating(true);
                          animate(
                              `.${styles["log-in-btn-container"]}`,
                              {
                                  opacity: 1,
                              },
                              { duration: 1 }
                          );
                          animate(
                              `.${styles["page-container"]}`,
                              {
                                  rowGap: "2rem",
                              },
                              { duration: 1 }
                          );
                          animate(`.${styles["logo-outer-container"]}`, {
                              transform: "scale(.75)",
                              cursor: "none",
                          });
                      }
                    : () => {}
            }
            onHoverStart={
                !stopAnimating
                    ? () => {
                          animate(`.${styles["ring-inner-container"]}`, {
                              opacity: 1,
                              transform: "scale(1.25)",
                          });
                      }
                    : () => {}
            }
            onHoverEnd={
                !stopAnimating
                    ? () => {
                          animate(`.${styles["ring-inner-container"]}`, {
                              opacity: 0,
                              transform: "scale(1)",
                          });
                      }
                    : () => {}
            }
            whileHover={!stopAnimating ? { rotate: 360 } : {}}
        >
            {children}{" "}
        </motion.div>
    );
};
