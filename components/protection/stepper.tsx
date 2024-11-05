import React from "react";

interface StepperProps {
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              {/* Borders for the steps */}
              <div
                className="w-1/2 border-t-2"
                style={{
                  borderColor: currentStep >= 1 ? "#6445E8" : "var(--border-muted-foreground)",
                  opacity: currentStep >= 1 ? 1 : 0.1,
                }}
              ></div>
              <div
                className="w-1/2 border-t-2"
                style={{
                  borderColor: currentStep >= 2 ? "#6445E8" : "var(--border-muted-foreground)",
                  opacity: currentStep >= 2 ? 1 : 0.1,
                }}
              ></div>
              <div
                className="w-1/2 border-t-2"
                style={{
                  borderColor: currentStep === 3 ? "#6445E8" : "var(--border-muted-foreground)",
                  opacity: currentStep === 3 ? 1 : 0.1,
                }}
              ></div>
            </div>
            <div className="relative flex justify-between">
              {/* First dot */}
              <div className="flex items-center">
                <span className="flex items-center justify-center w-4 h-4 bg-[#6445E8] rounded-full">
                  <span className="text-white"></span>
                </span>
              </div>
              {/* Second dot */}
              <div className="flex items-center">
                <span
                  className={`flex items-center justify-center w-4 h-4 ${
                    currentStep >= 2 ? "bg-[#6445E8]" : "bg-gray-300"
                  } rounded-full`}
                  style={{
                    cursor: currentStep >= 2 ? "pointer" : "not-allowed",
                    opacity: currentStep >= 2 ? 1 : 1,
                  }}
                >
                  <span className={`${currentStep >= 2 ? "text-white" : "text-muted-foreground"}`}></span>
                </span>
              </div>
              {/* Third dot */}
              <div className="flex items-center">
                <span
                  className={`flex items-center justify-center w-4 h-4 ${
                    currentStep === 3 ? "bg-[#6445E8]" : "bg-gray-300"
                  } rounded-full`}
                  style={{
                    cursor: currentStep === 3 ? "pointer" : "not-allowed",
                    opacity: currentStep === 3 ? 1 : 1,
                  }}
                >
                  <span className={`${currentStep === 3 ? "text-white" : "text-muted-foreground"}`}></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-sm mt-2">
        <span className={`${currentStep >= 1 ? "text-[#6445E8] text-base font-semibold" : "text-muted-foreground"}`}>Choose plan</span>
        <span className={`${currentStep >= 2 ? "text-[#6445E8] text-base font-semibold" : "text-muted-foreground"}`}>Checkout</span>
        <span className={`${currentStep === 3 ? "text-[#6445E8] text-base font-semibold" : "text-muted-foreground"}`}>Receipt</span>
      </div>
    </div>
  );
};
