import React, { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useCompanyStore } from "../../store/useCompanyStore";

// Import your steps...
import { Step1CompanyInfo } from "./steps/Step1CompanyInfo";
import { Step2ShareCapital } from "./steps/Step2ShareCapital";
import { Step3Shareholders } from "./steps/Step3Shareholders";
import { Step4Directors } from "./steps/Step4Directors";
import { Step5Services } from "./steps/Step5Services";
import { Step7Billing } from "./steps/Step7Billing";
import { Step8Review } from "./steps/Step8Review";

const steps = [
  { number: 1, label: "Information" },
  { number: 2, label: "Shareholders" },
  { number: 3, label: "Share Capital" },
  { number: 4, label: "Directors" },
  { number: 5, label: "Services" },
  { number: 6, label: "Billing" },
  { number: 7, label: "Review" },
];

const MOBILE_STEP_WIDTH = 80;
const MOBILE_STEP_GAP = 8;
const CONNECTOR_WIDTH = 32;

const getMobileTrackTransform = (step: number) => {
  const stepSpacing = MOBILE_STEP_WIDTH + CONNECTOR_WIDTH + MOBILE_STEP_GAP;
  if (step === 1 || step === 2) return "translateX(8px)";
  const offsetFromStart = (step - 1) * stepSpacing;
  const centeringOffset = MOBILE_STEP_WIDTH / 2;
  const leftShift = 30;
  return `translateX(calc(50% - ${offsetFromStart + centeringOffset + leftShift}px))`;
};

export const CompanyFormation: React.FC = () => {
  // Use the store directly - all step components now consume store internally
  const {
    currentStep,
    formData,
    nextStep,
    prevStep,
    submitApplication,
    isLoading,
    isSuccess,
    validateStep,
    clearStepErrors,
  } = useCompanyStore();

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Handle Success State
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Application Submitted!
          </h2>
          <p className="text-gray-600">
            Our team will contact you soon regarding your company formation.
          </p>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      clearStepErrors();
      nextStep();
    }
  };

  const canProceed = () => {
    if (currentStep === 7) {
      return formData.complianceAccepted.isAccepted;
    }
    return true;
  };

  const progressPercentage = Math.round((currentStep / 7) * 100);

  // Simplified renderStep - components now use store directly
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1CompanyInfo />;
      case 2:
        return <Step3Shareholders />;
      case 3:
        return <Step2ShareCapital />;
      case 4:
        return <Step4Directors />;
      case 5:
        return <Step5Services />;
      case 6:
        return <Step7Billing />;
      case 7:
        return <Step8Review />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f8ff] via-[#ffffff] to-[#f0f4ff]">
      <div className="max-w-5xl mx-auto px-2 md:px-6 xl:px-2 py-8 md:py-12">
        {/* Header */}
        <div className="text-center lg:text-start mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#212833] mb-3">
            Hong Kong Company Formation
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Complete all sections to register your Private Limited Company
          </p>
        </div>

        {/* Progress Bar & Step Indicators */}
        <div className="sticky top-0 z-10 backdrop-blur-lg rounded-2xl py-2 px-2 md:px-4 md:py-4 md:pb-6 ">
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[#212833]">
                Step {currentStep} of 7
              </span>
              <span className="text-sm font-semibold text-[#004eff]">
                Progress: {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#6896ff] to-[#004eff] h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Render Step Indicators */}
          <div className="py-2">
            {/* Mobile Carousel */}
            <div className="md:hidden overflow-hidden px-2">
              <div
                className="flex items-center transition-transform duration-500 ease-out"
                style={{
                  transform: getMobileTrackTransform(currentStep),
                  gap: `${MOBILE_STEP_GAP}px`,
                }}
              >
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div
                      className="flex flex-col items-center py-1 flex-shrink-0"
                      style={{ width: `${MOBILE_STEP_WIDTH}px` }}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                          currentStep > step.number
                            ? "bg-green-500 text-white"
                            : currentStep === step.number
                              ? "bg-[#004eff] text-white ring-4 ring-[#004eff]/20"
                              : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {currentStep > step.number ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          step.number
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 font-medium whitespace-nowrap ${
                          currentStep === step.number
                            ? "text-[#004eff]"
                            : currentStep > step.number
                              ? "text-green-600"
                              : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 w-8 mb-6 transition-all duration-300 flex-shrink-0 ${
                          step.number < currentStep
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Desktop Steps */}
            <div className="hidden md:block">
              <div className="flex items-center gap-2 lg:gap-3 justify-center">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center py-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                          currentStep > step.number
                            ? "bg-green-500 text-white"
                            : currentStep === step.number
                              ? "bg-[#004eff] text-white ring-4 ring-[#004eff]/20"
                              : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {currentStep > step.number ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          step.number
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 font-medium whitespace-nowrap ${
                          currentStep === step.number
                            ? "text-[#004eff]"
                            : currentStep > step.number
                              ? "text-green-600"
                              : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 w-16 mb-6 transition-all duration-300 ${
                          currentStep > step.number
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 md:p-10 mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#212833] mb-1">
              {steps[currentStep - 1]?.label}
            </h2>
            <p className="text-sm text-gray-500">Step {currentStep} of 7</p>
          </div>
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1 || isLoading}
            variant="outline"
            className="h-12 px-6 rounded-full border-2 border-gray-300 hover:border-[#004eff] hover:bg-[#004eff] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          {currentStep < 7 ? (
            <Button
              onClick={handleNext}
              className="h-12 px-8 rounded-full bg-gradient-to-r from-[#6896ff] to-[#004eff] hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={submitApplication}
              disabled={!canProceed() || isLoading}
              className="h-12 px-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Check className="w-5 h-5 mr-2" />
              )}
              {isLoading ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
