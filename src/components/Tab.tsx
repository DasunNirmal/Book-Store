import {PropsWithChildren, useRef} from "react";

interface SetPositionProps {
    (position: { top: number; height: number; opacity: number }): void;
}

export const Tab = ({ children, setPosition }: PropsWithChildren<{ setPosition: SetPositionProps }>) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={ref}
            onMouseEnter={() => {
                if (!ref?.current) return;

                const { height } = ref.current.getBoundingClientRect();

                setPosition({
                    top: ref.current.offsetTop,
                    height,
                    opacity: 1,
                });
            }}
            className="relative z-10 block cursor-pointer px-3 py-1.5 text-white mix-blend-difference md:px-5 md:py-3 md:text-base">
            {children}
        </div>
    );
};