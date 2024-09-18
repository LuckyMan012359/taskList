import React, { useRef, useState } from "react";
import { useOutsideAlerter } from "../../../hooks/useOutsideAlerter";
import styles from "./ColorPicker.module.css";

const presetColors = [
  "0, 208, 132",
  "6, 147, 227",
  "205, 105, 0",
  "153, 0, 239",
  "235, 20, 76",
  "96, 125, 139",
  "46, 125, 50",
  "239, 108, 0",
];

export const ColorPicker = ({ color = presetColors[0], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const onClose = () => setIsOpen(false);

  useOutsideAlerter(wrapperRef, onClose, [onClose]);

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{palleteIcon}</div>
      {isOpen && (
        <div
          className={styles.popover}
          ref={wrapperRef}
        >
          {presetColors.map((presetColor) => (
            <button
              key={presetColor}
              className={styles.pickerItem}
              style={{ background: `rgb(${presetColor})` }}
              onClick={() => {
                onChange(presetColor);
                onClose();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const palleteIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.655 3.81002C13.9031 3.06333 13.0095 2.47437 12.0268 2.0777C11.0442 1.68102 9.99214 1.48462 8.93253 1.50002C6.94341 1.49504 5.03378 2.28045 3.62374 3.68346C2.2137 5.08646 1.41875 6.99214 1.41378 8.98127C1.40881 10.9704 2.19422 12.88 3.59722 14.2901C5.00023 15.7001 6.90591 16.495 8.89503 16.5C9.32365 16.5073 9.74256 16.3721 10.086 16.1155C10.4294 15.8589 10.6779 15.4956 10.7925 15.0825C10.8656 14.7842 10.8648 14.4726 10.7903 14.1746C10.7158 13.8767 10.5699 13.6014 10.365 13.3725C10.3177 13.3186 10.2868 13.2523 10.276 13.1813C10.2652 13.1104 10.275 13.0378 10.3042 12.9723C10.3334 12.9068 10.3808 12.851 10.4408 12.8116C10.5008 12.7722 10.5708 12.7508 10.6425 12.75H11.88C13.0447 12.7555 14.1684 12.3201 15.0254 11.5313C15.8823 10.7425 16.4091 9.65869 16.5 8.49752C16.5279 7.63173 16.3787 6.76936 16.0614 5.96331C15.7442 5.15726 15.2656 4.42452 14.655 3.81002ZM11.91 11.25H10.6725C10.3111 11.248 9.95689 11.3508 9.6528 11.5461C9.3487 11.7414 9.1078 12.0208 8.95933 12.3503C8.81085 12.6798 8.76118 13.0453 8.81633 13.4025C8.87148 13.7596 9.02909 14.0931 9.27003 14.3625C9.31695 14.4099 9.35011 14.4691 9.36596 14.5338C9.38181 14.5985 9.37976 14.6664 9.36003 14.73C9.32253 14.8875 9.15003 14.985 8.91753 15C8.06577 14.9891 7.2261 14.7969 6.45437 14.4363C5.68264 14.0757 4.99654 13.5549 4.44171 12.9085C3.88688 12.2622 3.47604 11.5051 3.23651 10.6876C2.99699 9.87019 2.93427 9.0111 3.05253 8.16752C3.26641 6.74998 3.9747 5.45374 5.05213 4.50807C6.12957 3.56239 7.50672 3.02822 8.94003 3.00002H9.00003C9.84816 2.98891 10.6899 3.14777 11.4757 3.46722C12.2614 3.78668 12.9753 4.26025 13.575 4.86002C14.043 5.32831 14.4107 5.88703 14.6557 6.5021C14.9007 7.11717 15.0179 7.77569 15 8.43752C14.9224 9.20481 14.564 9.91636 13.9936 10.4355C13.4233 10.9546 12.6812 11.2447 11.91 11.25Z" fill="black" fill-opacity="0.3"/>
    <path d="M9 6C9.62132 6 10.125 5.49632 10.125 4.875C10.125 4.25368 9.62132 3.75 9 3.75C8.37868 3.75 7.875 4.25368 7.875 4.875C7.875 5.49632 8.37868 6 9 6Z" fill="black" fill-opacity="0.3"/>
    <path d="M11.4375 5.4C11.2449 5.51127 11.0896 5.67715 10.9912 5.87667C10.8928 6.07619 10.8558 6.30039 10.8849 6.52094C10.9139 6.74149 11.0076 6.94848 11.1543 7.11576C11.3009 7.28303 11.4939 7.40308 11.7087 7.46072C11.9236 7.51836 12.1507 7.51102 12.3614 7.43961C12.5721 7.3682 12.7568 7.23594 12.8924 7.05954C13.0279 6.88314 13.1081 6.67052 13.1228 6.44855C13.1375 6.22659 13.0861 6.00524 12.975 5.8125C12.9012 5.6844 12.8029 5.5721 12.6856 5.48203C12.5684 5.39196 12.4346 5.32588 12.2918 5.28757C12.149 5.24926 12 5.23947 11.8535 5.25876C11.7069 5.27805 11.5655 5.32605 11.4375 5.4Z" fill="black" fill-opacity="0.3"/>
    <path d="M6.5625 5.39999C6.36976 5.28893 6.14841 5.23751 5.92645 5.25222C5.70448 5.26693 5.49187 5.34712 5.31546 5.48264C5.13906 5.61817 5.0068 5.80295 4.93539 6.01363C4.86398 6.2243 4.85664 6.45142 4.91428 6.66628C4.97192 6.88113 5.09197 7.07407 5.25924 7.22071C5.42652 7.36735 5.63351 7.46111 5.85406 7.49014C6.07461 7.51916 6.29881 7.48216 6.49833 7.38379C6.69785 7.28542 6.86373 7.13011 6.975 6.93749C7.04895 6.80947 7.09695 6.66813 7.11624 6.52155C7.13553 6.37497 7.12574 6.22603 7.08743 6.08324C7.04912 5.94044 6.98304 5.8066 6.89297 5.68937C6.8029 5.57213 6.6906 5.47379 6.5625 5.39999Z" fill="black" fill-opacity="0.3"/>
    <path d="M4.62 8.44503C4.43547 8.56962 4.29207 8.74616 4.20794 8.95231C4.12381 9.15845 4.10275 9.38492 4.14741 9.60304C4.19207 9.82117 4.30045 10.0211 4.45882 10.1776C4.6172 10.3341 4.81845 10.4401 5.03709 10.4821C5.25573 10.5242 5.48193 10.5004 5.68706 10.4138C5.89218 10.3272 6.06699 10.1817 6.18937 9.99573C6.31175 9.80973 6.37618 9.5916 6.37451 9.36895C6.37284 9.14631 6.30515 8.92917 6.18 8.74502C6.09778 8.62229 5.99204 8.51707 5.8689 8.43546C5.74576 8.35384 5.60766 8.29746 5.46259 8.26956C5.31751 8.24166 5.16835 8.2428 5.02372 8.27292C4.87909 8.30304 4.74187 8.36154 4.62 8.44503Z" fill="black" fill-opacity="0.3"/>
  </svg>
)