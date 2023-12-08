import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 24.4824C18.6274 24.4824 24 19.1098 24 12.4824C24 5.855 18.6274 0.482422 12 0.482422C5.37258 0.482422 0 5.855 0 12.4824C0 19.1098 5.37258 24.4824 12 24.4824ZM13.9157 13.7623C14.1689 13.3836 14.304 12.938 14.304 12.4824C14.3021 11.8719 14.0588 11.2871 13.6271 10.8554C13.1954 10.4237 12.6105 10.1804 12 10.1785C11.5443 10.1785 11.0989 10.3135 10.72 10.5666C10.3411 10.82 10.0458 11.1798 9.87138 11.6007C9.697 12.0216 9.65136 12.485 9.74027 12.932C9.82916 13.3789 10.0486 13.7893 10.3708 14.1116C10.693 14.4338 11.1036 14.6532 11.5505 14.7423C11.9975 14.8311 12.4607 14.7854 12.8817 14.611C13.3027 14.4366 13.6625 14.1413 13.9157 13.7623ZM19.2 15.6505V9.31437C19.2 8.24516 18.7752 7.21953 18.019 6.46344C17.2629 5.70711 16.2374 5.28242 15.168 5.28242H8.83201C7.76265 5.28242 6.73708 5.70711 5.98096 6.46344C5.2248 7.21953 4.8 8.24516 4.8 9.31437V15.6505C4.8 16.7197 5.2248 17.7453 5.98096 18.5014C6.73708 19.2577 7.76265 19.6824 8.83201 19.6824H15.168C16.2374 19.6824 17.2629 19.2577 18.019 18.5014C18.7752 17.7453 19.2 16.7197 19.2 15.6505ZM14.8736 10.5624C15.2533 11.1308 15.456 11.799 15.456 12.4824C15.456 13.3991 15.0919 14.278 14.4438 14.9262C13.7956 15.5743 12.9166 15.9385 12 15.9385C11.3165 15.9385 10.6483 15.7358 10.0799 15.3561C9.51161 14.9762 9.06864 14.4364 8.80708 13.805C8.54549 13.1734 8.47705 12.4787 8.61041 11.8081C8.74377 11.1378 9.07292 10.5219 9.55623 10.0386C10.0396 9.55531 10.6554 9.22625 11.3258 9.09289C11.9962 8.95953 12.6911 9.02797 13.3225 9.28953C13.954 9.55109 14.4938 9.99406 14.8736 10.5624ZM16.5689 8.48164C16.5947 8.56437 16.608 8.65086 16.608 8.73852C16.608 8.9675 16.517 9.18734 16.3549 9.3493C16.1929 9.51148 15.9732 9.60242 15.744 9.60242C15.5731 9.60242 15.4061 9.5518 15.264 9.45687C15.1219 9.36195 15.0112 9.22695 14.9458 9.06898C14.8804 8.91125 14.8633 8.73758 14.8966 8.56977C14.93 8.40219 15.0122 8.2482 15.1331 8.1275C15.2539 8.00656 15.4078 7.9243 15.5754 7.89102C15.7431 7.85773 15.9168 7.87484 16.0746 7.94023C16.2325 8.00562 16.3675 8.11625 16.4624 8.25852C16.5087 8.32766 16.5444 8.40289 16.5689 8.48164Z" fill="#E6E6E6"/>
    </Svg>
  );
};

export default Icon;
