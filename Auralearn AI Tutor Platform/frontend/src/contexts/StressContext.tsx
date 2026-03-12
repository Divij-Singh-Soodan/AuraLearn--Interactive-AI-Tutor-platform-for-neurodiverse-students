import React, { createContext, useContext, useState, useCallback } from "react";

interface StressContextType {
  stressLevel: number;
  setStressLevel: (level: number) => void;
  isHighStress: boolean;
  isLowStress: boolean;
  stressCategory: "low" | "medium" | "high";
}

const StressContext = createContext<StressContextType | undefined>(undefined);

export const StressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stressLevel, setStressLevelState] = useState(3);

  const setStressLevel = useCallback((level: number) => {
    setStressLevelState(Math.min(10, Math.max(1, level)));
  }, []);

  const isHighStress = stressLevel >= 8;
  const isLowStress = stressLevel <= 3;
  const stressCategory = isHighStress ? "high" : isLowStress ? "low" : "medium";

  return (
    <StressContext.Provider value={{ stressLevel, setStressLevel, isHighStress, isLowStress, stressCategory }}>
      <div className={isHighStress ? "stress-high" : ""}>
        {children}
      </div>
    </StressContext.Provider>
  );
};

export const useStress = () => {
  const context = useContext(StressContext);
  if (!context) throw new Error("useStress must be used within StressProvider");
  return context;
};
