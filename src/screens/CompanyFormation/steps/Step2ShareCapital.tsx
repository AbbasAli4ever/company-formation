import React, { useMemo, useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import {
  useCompanyStore,
  useShareholders,
} from "../../../store/useCompanyStore";
import { getCurrencyForCountry } from "../../../lib/countryUtils";

export const Step2ShareCapital: React.FC = () => {
  const {
    formData,
    stepErrors,
    updateShareCapital,
    updateShareholderDistribution,
  } = useCompanyStore();

  const shareholders = useShareholders();
  const { shareCapital, company } = formData;
  const errors = stepErrors;

  const currency = getCurrencyForCountry(company.countryOfIncorporation);

  useEffect(() => {
    if (shareCapital.currency !== currency) {
      updateShareCapital({ currency });
    }
  }, [currency, shareCapital.currency, updateShareCapital]);

  const [percentageErrors, setPercentageErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const totalShares = shareCapital.totalShares || 0;

    shareholders.forEach((shareholder) => {
      const percentage = shareholder.shareholding?.percentage || 0;
      const calculatedShares =
        totalShares > 0 ? Math.round((percentage / 100) * totalShares) : 0;

      if ((shareholder.shareholding?.shares || 0) !== calculatedShares) {
        updateShareholderDistribution(
          shareholder.id,
          calculatedShares,
          percentage,
        );
      }
    });
  }, [shareCapital.totalShares, shareholders, updateShareholderDistribution]);

  const allocationStats = useMemo(() => {
    const totalShares = shareCapital.totalShares || 0;

    const totalPercentageAllocated = shareholders.reduce((sum, s) => {
      const pct = s.shareholding?.percentage || 0;
      return sum + pct;
    }, 0);

    const allocatedShares = shareholders.reduce(
      (sum, s) => sum + (s.shareholding?.shares || 0),
      0,
    );

    const remainingPercentage = Math.max(0, 100 - totalPercentageAllocated);
    const allocationPercentage = Math.min(100, totalPercentageAllocated);
    const isComplete = totalPercentageAllocated === 100;
    const isOverAllocated = totalPercentageAllocated > 100;

    return {
      totalShares,
      allocatedShares,
      allocationPercentage,
      remainingPercentage,
      isComplete,
      isOverAllocated,
    };
  }, [shareCapital.totalShares, shareholders]);

  const isNomineeFullyAllocated =
    shareholders.length === 1 &&
    shareholders[0].shareholderSelection === "nominee" &&
    (shareholders[0].shareholding?.percentage || 0) === 100;

  const handlePercentageChange = (id: string, inputValue: string) => {
    const cleanedValue = inputValue.replace(/[^0-9.]/g, "");
    const parts = cleanedValue.split(".");
    const percentage =
      parts.length > 2
        ? parts[0] + "." + parts.slice(1).join("")
        : cleanedValue;

    const percentageNum = parseFloat(percentage) || 0;
    const totalSharesNum = shareCapital.totalShares || 0;

    const otherPercentageAllocated = shareholders
      .filter((s) => s.id !== id)
      .reduce((sum, s) => {
        const pct = s.shareholding?.percentage || 0;
        return sum + pct;
      }, 0);

    const maxAllowedPercentage = Math.max(0, 100 - otherPercentageAllocated);

    if (percentageNum > maxAllowedPercentage) {
      setPercentageErrors((prev) => ({
        ...prev,
        [id]: `Exceeds available ownership. Max: ${maxAllowedPercentage.toFixed(2)}%`,
      }));
    } else if (percentageNum > 100) {
      setPercentageErrors((prev) => ({
        ...prev,
        [id]: "Ownership cannot exceed 100%",
      }));
    } else {
      setPercentageErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }

    const calculatedShares =
      totalSharesNum > 0
        ? Math.round(((percentageNum || 0) / 100) * totalSharesNum)
        : 0;

    updateShareholderDistribution(id, calculatedShares, percentageNum);
  };

  const getRemainingPercentageFor = (shareholderId: string): number => {
    const otherPercentageAllocated = shareholders
      .filter((s) => s.id !== shareholderId)
      .reduce((sum, s) => {
        const pct = s.shareholding?.percentage || 0;
        return sum + pct;
      }, 0);

    return Math.max(0, 100 - otherPercentageAllocated);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[#212833] mb-2">
          Share Capital Structure
        </h3>
        <p className="text-sm text-gray-600">
          Define your company&apos;s share capital and assign ownership to added
          shareholders
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-base font-medium text-[#212833]">
            Share Capital Amount ({currency}){" "}
            <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="10000"
            value={shareCapital.totalAmount.toString()}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "");
              updateShareCapital({ totalAmount: parseInt(val, 10) || 0 });
            }}
            className={`bg-[#f5f7fa] border-gray-300 h-12 text-base ${errors?.shareCapitalAmount ? "border-red-500" : ""}`}
          />
          {errors?.shareCapitalAmount && (
            <p className="text-xs text-red-500 mt-1">
              {errors.shareCapitalAmount}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">Standard: {currency} 10,000</p>
        </div>

        <div className="space-y-2">
          <label className="block text-base font-medium text-[#212833]">
            Total Number of Shares <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="10000"
            value={shareCapital.totalShares.toString()}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "");
              updateShareCapital({ totalShares: parseInt(val, 10) || 0 });
            }}
            className={`bg-[#f5f7fa] border-gray-300 h-12 text-base ${errors?.totalShares ? "border-red-500" : ""}`}
          />
          {errors?.totalShares && (
            <p className="text-xs text-red-500 mt-1">{errors.totalShares}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">Standard: 10,000 shares</p>
        </div>
      </div>

      {errors?.shareDistribution && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {errors.shareDistribution}
        </p>
      )}

      {shareholders.length === 0 ? (
        <div className="p-5 bg-yellow-50 rounded-xl border border-yellow-200">
          <p className="text-sm text-yellow-800">
            Add shareholder information in Step 2 before assigning share
            percentages in Step 3.
          </p>
        </div>
      ) : (
        <>
          <div
            className={`p-4 rounded-xl border-2 transition-colors ${
              allocationStats.isComplete
                ? "bg-green-50 border-green-300"
                : allocationStats.isOverAllocated
                  ? "bg-red-50 border-red-300"
                  : "bg-blue-50 border-blue-200"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {allocationStats.isComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle
                    className={`w-5 h-5 ${
                      allocationStats.isOverAllocated
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  />
                )}
                <span
                  className={`font-semibold ${
                    allocationStats.isComplete
                      ? "text-green-800"
                      : allocationStats.isOverAllocated
                        ? "text-red-800"
                        : "text-blue-800"
                  }`}
                >
                  Share Allocation: {allocationStats.allocationPercentage.toFixed(1)}%
                </span>
              </div>
              <span
                className={`text-sm ${
                  allocationStats.isComplete
                    ? "text-green-700"
                    : allocationStats.isOverAllocated
                      ? "text-red-700"
                      : "text-blue-700"
                }`}
              >
                {allocationStats.allocatedShares.toLocaleString()} /{" "}
                {allocationStats.totalShares.toLocaleString()} shares
              </span>
            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  allocationStats.isComplete
                    ? "bg-green-500"
                    : allocationStats.isOverAllocated
                      ? "bg-red-500"
                      : "bg-blue-500"
                }`}
                style={{
                  width: `${Math.min(100, allocationStats.allocationPercentage)}%`,
                }}
              />
            </div>

            <p
              className={`text-sm mt-2 ${
                allocationStats.isComplete
                  ? "text-green-700"
                  : allocationStats.isOverAllocated
                    ? "text-red-700"
                    : "text-blue-700"
              }`}
            >
              {allocationStats.isComplete
                ? "100% ownership allocated. You can proceed to the next step."
                : allocationStats.isOverAllocated
                  ? `Over-allocated by ${(allocationStats.allocationPercentage - 100).toFixed(2)}%. Please reduce allocation.`
                  : `${allocationStats.remainingPercentage.toFixed(2)}% ownership remaining to allocate`}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-semibold text-[#212833]">
              Share Distribution
            </h4>

            {shareholders.map((shareholder, index) => {
              const hasPercentageError = !!percentageErrors[shareholder.id];
              const isLockedNominee =
                isNomineeFullyAllocated &&
                shareholder.shareholderSelection === "nominee";
              const displayName =
                shareholder.shareholderSelection === "nominee"
                  ? "Nominee Shareholder"
                  : shareholder.fullName || "Unnamed";

              return (
                <div
                  key={shareholder.id}
                  className="p-5 bg-white rounded-xl border-2 border-gray-200"
                >
                  <h5 className="font-medium text-[#212833] mb-4">
                    Shareholder {index + 1}: {displayName}
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#212833]">
                        Ownership % <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="50"
                        value={shareholder.shareholding?.percentage?.toString() || ""}
                        onChange={(e) => {
                          if (!isLockedNominee) {
                            handlePercentageChange(shareholder.id, e.target.value);
                          }
                        }}
                        disabled={isLockedNominee}
                        className={`bg-[#f5f7fa] border-gray-300 h-11 ${
                          hasPercentageError
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      />
                      {isLockedNominee ? (
                        <p className="text-xs text-gray-500">
                          Fixed at 100% for nominee.
                        </p>
                      ) : hasPercentageError ? (
                        <p className="text-xs text-red-500">
                          {percentageErrors[shareholder.id]}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500">
                          Max available: {getRemainingPercentageFor(shareholder.id).toFixed(2)}%
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#212833]">
                        Number of Shares
                      </label>
                      <Input
                        type="text"
                        placeholder="Calculated"
                        value={shareholder.shareholding?.shares?.toString() || ""}
                        disabled
                        className="bg-gray-100 border-gray-300 h-11 text-gray-600"
                      />
                      <p className="text-xs text-gray-500">
                        Auto-calculated from ownership %
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {shareholders.length > 0 && !allocationStats.isComplete && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Share ownership must reach exactly 100%
            </p>
            <p className="text-sm text-amber-700 mt-1">
              You need to allocate {allocationStats.remainingPercentage.toFixed(2)}%
              more ownership before you can proceed to the next step.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
