import * as React from "react";
import { OTPInput as OTPInputLib } from "input-otp";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onComplete?: (value: string) => void;
}

export function OTPInput({ length = 6, onComplete }: OTPInputProps) {
  return (
    <OTPInputLib
      maxLength={length}
      onComplete={onComplete}
      render={({ slots }) => (
        <div className="flex gap-2 justify-center">
          {slots.map((slot, idx) => (
            <div
              key={idx}
              className={cn(
                "w-12 h-12 border-2 rounded-md flex items-center justify-center text-2xl font-bold",
                "transition-all duration-200",
                "focus-within:border-primary",
                slot.isActive && "border-primary",
                !slot.char && "text-muted-foreground"
              )}
            >
              {slot.char || "·"}
              <input
                {...slot.props}
                className="w-0 h-0 opacity-0 absolute"
              />
            </div>
          ))}
        </div>
      )}
    />
  );
}
