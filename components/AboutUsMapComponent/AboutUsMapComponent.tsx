import styles from "@/components/AboutUsMapComponent/AboutUsMapComponent.module.scss";
import { ProductReceivedType } from "@/types/projectTypes";
import { useEffect } from "react";

import { Loader } from "@googlemaps/js-api-loader";

export const AboutUsMapComponent = ({
    products,
    gmapsKey,
}: {
    products: ProductReceivedType[];
    gmapsKey?: string;
}) => {
    //     useEffect(() => {
    //     const mapDiv = document.querySelector("#map") as HTMLElement;
    //     console.log("[CURRENT]", mapDiv);
    //     if (/* googlemap.current !== null */ mapDiv) {
    //         const loader = new Loader({
    //             apiKey: `${gmapsKey}`,
    //             version: "weekly",
    //             libraries: ["places"],
    //         });
    //         let map: any;
    //         loader.load().then(async () => {
    //             //@ts-ignore
    //             const google = window.google;
    //             map = new google.maps.Map(mapDiv, {
    //                 center: center,
    //                 zoom: zoom,
    //                 gestureHandling: gestureHandling
    //                     ? gestureHandling
    //                     : "greedy",
    //                 zoomControl: false,
    //                 mapTypeControl: false,
    //                 scaleControl: false,
    //                 styles: styleOptions,

    //                 rotateControl: false,
    //                 fullscreenControl: true,
    //             });
    //             setMapMethods(map);
    //             setGoogleInstance(google);
    //             console.log("[DATASET]", mapItems);
    //             const infoWindowArray: any[] = [];
    //             setTimeout(() => {
    //                 console.log("[ASSETS]", assets.locations);

    //                 const lineSymbol = {
    //                     path: "M 0,1 0,1",
    //                     strokeOpacity: 1,
    //                     scale: 4,
    //                     fillColor: "#00a0af",
    //                     strokeColor: "#00a0af",
    //                 };

    //                 const boatPolylineLine =
    //                     screen.width > 1265
    //                         ? new google.maps.Polyline({
    //                               path: boatLine,
    //                               strokeOpacity: 0,
    //                               icons: [
    //                                   {
    //                                       icon: lineSymbol,
    //                                       offset: "100%",
    //                                       repeat: "20px",
    //                                   },
    //                               ],
    //                               map: map,
    //                           })
    //                         : undefined;

    //                 const planePolylineLine =
    //                     screen.width > 1265
    //                         ? new google.maps.Polyline({
    //                               path: planeLine,
    //                               strokeOpacity: 0,
    //                               icons: [
    //                                   {
    //                                       icon: lineSymbol,
    //                                       offset: "100%",
    //                                       repeat: "20px",
    //                                   },
    //                               ],
    //                               map: map,
    //                           })
    //                         : undefined;

    //                 const truckPolylineLine =
    //                     screen.width > 1265
    //                         ? new google.maps.Polyline({
    //                               path: truckLine,
    //                               strokeOpacity: 0,
    //                               icons: [
    //                                   {
    //                                       icon: lineSymbol,
    //                                       offset: "100%",
    //                                       repeat: "20px",
    //                                   },
    //                               ],
    //                               map: map,
    //                           })
    //                         : undefined;

    //                 const polylinesArray =
    //                     screen.width > 1265
    //                         ? [
    //                               boatPolylineLine,

    //                               planePolylineLine,

    //                               truckPolylineLine,
    //                           ]
    //                         : undefined;

    //                 const markersArray: any[] = [];
    //                 assets &&
    //                     assets.locations &&
    //                     Object.keys(assets.locations).forEach(
    //                         (mapKey: string, index: number) => {
    //                             const marker = new google.maps.Marker({
    //                                 //@ts-ignore
    //                                 position: {
    //                                     lat: assets.locations[mapKey]
    //                                         .location_latitude,
    //                                     lng: assets.locations[mapKey]
    //                                         .location_longitude,
    //                                 },
    //                                 icon: `/favicon-inverted-shadow.webp#${mapKey}#marker-item`,
    //                                 map: map as any,
    //                                 store_id: mapKey,
    //                                 animation: google.maps.Animation.DROP,
    //                             });
    //                             marker.set("id", `${mapKey}`);
    //                             const contentString = LocationDotInfoPanel({
    //                                 dotAssets: assets.locations[mapKey],
    //                                 dotid: mapKey,
    //                                 panelBckgImg:
    //                                     "/assets/img/about-us-portrait.webp",
    //                             });
    //                             const infowindow = new google.maps.InfoWindow({
    //                                 content: contentString,
    //                                 ariaLabel: `${assets.locations[mapKey].location_name}`,
    //                                 title: `${assets.locations[mapKey].location_name}`,
    //                                 optimized: true,
    //                             });
    //                             infoWindowArray.push(infowindow);
    //                             markersArray.push({
    //                                 infoWindow: infowindow,
    //                                 slug: mapKey,
    //                                 marker: marker,
    //                                 map: map,
    //                             });

    //                             marker.addListener("click", () => {
    //                                 polylinesArray &&
    //                                     polylinesArray.forEach((polyLine) => {
    //                                         polyLine.setVisible(false);
    //                                     });

    //                                 setActiveMarker(true);
    //                                 dotIdHandler({
    //                                     target: {
    //                                         dataset: {
    //                                             id: `${mapKey}`,
    //                                         },
    //                                     },
    //                                     markerElement: "map-marker",
    //                                 });
    //                                 const markerBtn = document.querySelector(
    //                                     `[src*="#${mapKey}"]`
    //                                 ) as HTMLElement;

    //                                 console.log(markerBtn);
    //                                 const markerBtns = Array.from(
    //                                     document.querySelectorAll(
    //                                         `[src*="marker-item"]`
    //                                     )
    //                                 ) as HTMLElement[];

    //                                 if (markerBtns.length > 0) {
    //                                     markerBtns.forEach(
    //                                         (marker: HTMLElement) => {
    //                                             marker.parentElement?.classList.remove(
    //                                                 styles["active-dot"]
    //                                             );
    //                                         }
    //                                     );
    //                                 }
    //                                 if (markerBtn) {
    //                                     const outerWave =
    //                                         document.createElement("div");
    //                                     outerWave.classList.add(
    //                                         styles[
    //                                             "location-dot-outer-expansive"
    //                                         ]
    //                                     );
    //                                     outerWave.setAttribute(
    //                                         "id",
    //                                         `marker-icon-outer-wave-${mapKey}`
    //                                     );
    //                                     const innerWave =
    //                                         document.createElement("div");
    //                                     innerWave.classList.add(
    //                                         styles[
    //                                             "location-dot-inner-expansive"
    //                                         ]
    //                                     );
    //                                     innerWave.setAttribute(
    //                                         "id",
    //                                         `marker-icon-inner-wave-${mapKey}`
    //                                     );

    //                                     const existsOuter =
    //                                         markerBtn.parentElement?.querySelector(
    //                                             `#marker-icon-outer-wave-${mapKey}`
    //                                         );
    //                                     const existsInner =
    //                                         markerBtn.parentElement?.querySelector(
    //                                             `#marker-icon-inner-wave-${mapKey}`
    //                                         );
    //                                     if (!existsInner) {
    //                                         console.log(
    //                                             "[agregando]",
    //                                             !markerBtn.parentElement?.contains(
    //                                                 innerWave
    //                                             )
    //                                         );

    //                                         markerBtn.parentElement?.appendChild(
    //                                             innerWave
    //                                         );
    //                                     }
    //                                     if (!existsOuter) {
    //                                         markerBtn.parentElement?.appendChild(
    //                                             outerWave
    //                                         );
    //                                     }

    //                                     (
    //                                         markerBtn.parentElement as HTMLElement
    //                                     ).classList.add(styles["active-dot"]);
    //                                     map.setCenter(marker.getPosition());
    //                                     setTimeout(() => {
    //                                         map.setZoom(8);
    //                                         map.setCenter(marker.getPosition());
    //                                     }, 200);
    //                                     setTimeout(() => {
    //                                         map.setZoom(10);
    //                                     }, 800);
    //                                     setTimeout(() => {
    //                                         map.setZoom(11);
    //                                         map.setCenter(marker.getPosition());
    //                                     }, 1200);
    //                                     setTimeout(() => {
    //                                         map.setZoom(13);
    //                                     }, 1700);
    //                                     setTimeout(() => {
    //                                         map.setZoom(15);
    //                                     }, 2000);
    //                                     setTimeout(() => {
    //                                         map.setCenter(marker.getPosition());
    //                                     }, 2600);

    //                                     markerBtn.parentElement?.setAttribute(
    //                                         "data-active",
    //                                         "true"
    //                                     );
    //                                     setTimeout(() => {
    //                                         const openGmapsBtn =
    //                                             document.querySelector(
    //                                                 `#${mapKey}-maps-button`
    //                                             );
    //                                         console.log(
    //                                             "[REDIRECT-BTN]",
    //                                             openGmapsBtn,
    //                                             `#${mapKey}-maps-button`
    //                                         );

    //                                         if (openGmapsBtn) {
    //                                             openGmapsBtn.addEventListener(
    //                                                 "click",
    //                                                 (evt: any) => {
    //                                                     handleOpenGmaps(
    //                                                         evt,
    //                                                         assets.locations[
    //                                                             mapKey
    //                                                         ]
    //                                                     );
    //                                                 }
    //                                             );
    //                                         }
    //                                     }, 1000);
    //                                     // markerBtn.style.opacity = "0";
    //                                 }
    //                                 /*  infowindow.open({
    //                                         anchor: marker,
    //                                         map,
    //                                     }); */
    //                             });
    //                             marker.addListener(
    //                                 "mouseover",
    //                                 ({
    //                                     domEvent,
    //                                     latLng,
    //                                 }: {
    //                                     domEvent: any;
    //                                     latLng: any;
    //                                 }) => {
    //                                     const markerBtn =
    //                                         document.querySelector(
    //                                             `[src*="#${mapKey}"]`
    //                                         ) as HTMLElement;

    //                                     console.log(markerBtn);
    //                                     const markerBtns = Array.from(
    //                                         document.querySelectorAll(
    //                                             `[src*="marker-item"]`
    //                                         )
    //                                     ) as HTMLElement[];
    //                                     if (markerBtns.length > 0) {
    //                                         markerBtns.forEach(
    //                                             (marker: HTMLElement) => {
    //                                                 marker.parentElement?.classList.remove(
    //                                                     styles["active-dot"]
    //                                                 );
    //                                             }
    //                                         );
    //                                     }
    //                                     if (markerBtn) {
    //                                         const outerWave =
    //                                             document.createElement("div");
    //                                         outerWave.classList.add(
    //                                             styles[
    //                                                 "location-dot-outer-expansive"
    //                                             ]
    //                                         );
    //                                         outerWave.setAttribute(
    //                                             "id",
    //                                             `marker-icon-outer-wave-${mapKey}`
    //                                         );
    //                                         const innerWave =
    //                                             document.createElement("div");
    //                                         innerWave.classList.add(
    //                                             styles[
    //                                                 "location-dot-inner-expansive"
    //                                             ]
    //                                         );
    //                                         innerWave.setAttribute(
    //                                             "id",
    //                                             `marker-icon-inner-wave-${mapKey}`
    //                                         );

    //                                         const existsOuter =
    //                                             markerBtn.parentElement?.querySelector(
    //                                                 `#marker-icon-outer-wave-${mapKey}`
    //                                             );
    //                                         const existsInner =
    //                                             markerBtn.parentElement?.querySelector(
    //                                                 `#marker-icon-inner-wave-${mapKey}`
    //                                             );
    //                                         if (!existsInner) {
    //                                             console.log(
    //                                                 "[agregando]",
    //                                                 !markerBtn.parentElement?.contains(
    //                                                     innerWave
    //                                                 )
    //                                             );

    //                                             markerBtn.parentElement?.appendChild(
    //                                                 innerWave
    //                                             );
    //                                         }
    //                                         if (!existsOuter) {
    //                                             markerBtn.parentElement?.appendChild(
    //                                                 outerWave
    //                                             );
    //                                         }
    //                                         !(
    //                                             markerBtn.parentElement as HTMLElement
    //                                         ).classList.contains(
    //                                             styles["transition-dot"]
    //                                         ) &&
    //                                             (
    //                                                 markerBtn.parentElement as HTMLElement
    //                                             ).classList.add(
    //                                                 styles["transition-dot"]
    //                                             );
    //                                         (
    //                                             markerBtn.parentElement as HTMLElement
    //                                         ).classList.add(
    //                                             styles["active-dot"]
    //                                         );
    //                                     }
    //                                     /*  infowindow.open({
    //                                         anchor: marker,
    //                                         map,
    //                                     }); */
    //                                 }
    //                             );

    //                             marker.addListener(
    //                                 "mouseout",
    //                                 ({
    //                                     domEvent,
    //                                     latLng,
    //                                 }: {
    //                                     domEvent: any;
    //                                     latLng: any;
    //                                 }) => {
    //                                     console.log(
    //                                         "[ACTIVE-MARKER]",
    //                                         activeMarker
    //                                     );

    //                                     const markerBtn =
    //                                         document.querySelector(
    //                                             `[src*="#${mapKey}"]`
    //                                         ) as HTMLElement;

    //                                     console.log(
    //                                         "[active]",
    //                                         markerBtn.parentElement?.dataset
    //                                             .active
    //                                     );

    //                                     if (
    //                                         markerBtn &&
    //                                         !markerBtn.parentElement?.dataset
    //                                             .active
    //                                     ) {
    //                                         (
    //                                             markerBtn.parentElement as HTMLElement
    //                                         ).classList.remove(
    //                                             styles["active-dot"]
    //                                         );
    //                                     }
    //                                     /*  infowindow.open({
    //                                         anchor: marker,
    //                                         map,
    //                                     }); */
    //                                 }
    //                             );
    //                             console.log(marker.get("store_id"));
    //                             google.maps.event.addListener(
    //                                 infowindow,
    //                                 "closeclick",
    //                                 function () {
    //                                     console.log(event);
    //                                     console.log("[active]", "clickedMap");
    //                                     setActiveMarker(false);
    //                                     clearActiveStyles();
    //                                     polylinesArray &&
    //                                         polylinesArray.forEach(
    //                                             (polyLine) => {
    //                                                 polyLine.setVisible(true);
    //                                             }
    //                                         );
    //                                     setSelectedLocationId("");
    //                                     infoWindowArray.forEach(
    //                                         (infoWindow: any) => {
    //                                             infoWindow.close();
    //                                         }
    //                                     );
    //                                     const markerBtns = Array.from(
    //                                         document.querySelectorAll(
    //                                             `[src*="marker-item"]`
    //                                         )
    //                                     ) as HTMLElement[];
    //                                     if (markerBtns.length > 0) {
    //                                         markerBtns.forEach(
    //                                             (marker: HTMLElement) => {
    //                                                 marker.parentElement?.classList.remove(
    //                                                     styles["active-dot"]
    //                                                 );
    //                                                 marker.parentElement?.removeAttribute(
    //                                                     "data-active"
    //                                                 );
    //                                             }
    //                                         );
    //                                     }
    //                                     setTimeout(() => {
    //                                         map.setZoom(15);
    //                                     }, 200);
    //                                     setTimeout(() => {
    //                                         map.setZoom(11);
    //                                     }, 400);
    //                                     setTimeout(() => {
    //                                         map.setZoom(10);
    //                                     }, 800);
    //                                     setTimeout(() => {
    //                                         map.setZoom(8);
    //                                     }, 1450);
    //                                     setTimeout(() => {
    //                                         map.setZoom(5);
    //                                     }, 1800);
    //                                     setTimeout(() => {
    //                                         map.setCenter(center);
    //                                         map.setZoom(zoom);
    //                                     }, 2400);
    //                                 }
    //                             );
    //                         }
    //                     );

    //                 google.maps.event.addListener(
    //                     map,
    //                     "click",
    //                     function (event: any) {
    //                         console.log(event);

    //                         console.log(
    //                             "[active]",
    //                             "clickedMap",
    //                             map.getZoom()
    //                         );
    //                         if (map.getZoom() > 5) {
    //                             polylinesArray &&
    //                                 polylinesArray.forEach((polyLine) => {
    //                                     polyLine.setVisible(true);
    //                                 });
    //                             clearActiveStyles();
    //                             setActiveMarker(false);
    //                             setSelectedLocationId("");
    //                             infoWindowArray.forEach((infoWindow: any) => {
    //                                 infoWindow.close();
    //                             });
    //                             const markerBtns = Array.from(
    //                                 document.querySelectorAll(
    //                                     `[src*="marker-item"]`
    //                                 )
    //                             ) as HTMLElement[];
    //                             if (markerBtns.length > 0) {
    //                                 markerBtns.forEach(
    //                                     (marker: HTMLElement) => {
    //                                         marker.parentElement?.classList.remove(
    //                                             styles["active-dot"]
    //                                         );
    //                                         marker.parentElement?.removeAttribute(
    //                                             "data-active"
    //                                         );
    //                                     }
    //                                 );
    //                             }
    //                             setTimeout(() => {
    //                                 map.setZoom(15);
    //                             }, 200);
    //                             setTimeout(() => {
    //                                 map.setZoom(11);
    //                             }, 400);
    //                             setTimeout(() => {
    //                                 map.setZoom(10);
    //                             }, 800);
    //                             setTimeout(() => {
    //                                 map.setZoom(8);
    //                             }, 1450);
    //                             setTimeout(() => {
    //                                 map.setZoom(5);
    //                             }, 1800);
    //                             setTimeout(() => {
    //                                 map.setCenter(center);
    //                                 map.setZoom(zoom);
    //                             }, 2400);
    //                         }
    //                     }
    //                 );

    //                 setMarkerArrayState([...markersArray]);
    //             }, 200);
    //         });
    //     }
    //     return () => {};
    // }, [
    //     assets,
    //     /* googlemap.current */
    // ]);
    return <div>AboutUsMapComponent</div>;
};
