import { CheckIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { ORDER_STEPS, OrderStatus } from "../utils/orderStatus.ts";

export const OrderTracker = ({ status }: { status: OrderStatus }) => {

    if (status === 'cancelled') {
        return (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <XCircleIcon className="w-6 h-6 text-red-600 shrink-0" />
                <div>
                    <p className="text-sm font-semibold text-red-800">This order was cancelled</p>
                    <p className="text-xs text-red-700">If you didn't ask for this, please contact us.</p>
                </div>
            </div>
        );
    }

    const currentIndex = ORDER_STEPS.findIndex(step => step.status === status);
    const currentStep = ORDER_STEPS[currentIndex];

    return (
        <div>
            <ol className="flex w-full">
                {ORDER_STEPS.map((step, index) => {
                    const isDone = index < currentIndex || status === 'delivered';
                    const isCurrent = index === currentIndex && status !== 'delivered';

                    return (
                        <li key={step.status} className="relative flex-1 flex flex-col items-center text-center">
                            {/* Connecting line to the previous step */}
                            {index > 0 && (
                                <span
                                    className={`absolute top-4 right-1/2 w-full h-0.5 transition-colors ${
                                        index <= currentIndex ? 'bg-rose-500' : 'bg-stone-200'
                                    }`}
                                />
                            )}

                            <span
                                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                    isDone
                                        ? 'bg-rose-500 text-white'
                                        : isCurrent
                                            ? 'bg-rose-50 border-2 border-rose-500'
                                            : 'bg-stone-200'
                                }`}
                            >
                                {isDone && <CheckIcon className="w-5 h-5" />}
                                {isCurrent && <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />}
                            </span>

                            <span
                                className={`mt-2 text-xs sm:text-sm ${
                                    isDone || isCurrent ? 'font-semibold text-slate-800' : 'text-stone-500'
                                }`}
                            >
                                {step.label}
                            </span>
                        </li>
                    );
                })}
            </ol>

            <p className="text-sm text-stone-600 text-center mt-4">{currentStep.description}</p>
        </div>
    );
};
