import { XCircle } from "lucide-react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormErrors = ({ id, errors }: FormErrorsProps) => {
  if (!errors) return null;

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-sm text-rose-500"
    >
      <div>
        {errors?.[id]?.map((error) => {
          return (
            <div
              key={error}
              className="flex items-center font-medium border border-rose-500 bg-rose-500/10 rounded-xl p-2"
            >
              <XCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          );
        })}
      </div>
    </div>
  );
};
