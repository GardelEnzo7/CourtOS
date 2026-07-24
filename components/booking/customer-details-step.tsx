import { useState, type FormEvent } from "react";

import type {
  CustomerDetails,
  CustomerField,
} from "@/types/reservation";

import { StepActions, StepHeader } from "./step-layout";

type CustomerDetailsStepProps = {
  value: CustomerDetails;
  onChange: (field: CustomerField, value: string) => void;
  onBack: () => void;
  onContinue: (customer: CustomerDetails) => void;
};

type CustomerErrors = Partial<Record<CustomerField, string>>;

const inputClassName =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20";

function validateCustomer(value: CustomerDetails) {
  const normalizedValue = {
    firstName: value.firstName.trim(),
    lastName: value.lastName.trim(),
    phone: value.phone.trim(),
  };
  const errors: CustomerErrors = {};
  const phoneDigitCount = normalizedValue.phone.replace(/\D/g, "").length;

  if (normalizedValue.firstName.length < 2) {
    errors.firstName = "Ingresá un nombre válido.";
  }
  if (normalizedValue.lastName.length < 2) {
    errors.lastName = "Ingresá un apellido válido.";
  }
  if (phoneDigitCount < 8 || phoneDigitCount > 15) {
    errors.phone = "Ingresá un teléfono con entre 8 y 15 dígitos.";
  }

  return { errors, normalizedValue };
}

export function CustomerDetailsStep({
  value,
  onChange,
  onBack,
  onContinue,
}: CustomerDetailsStepProps) {
  const [errors, setErrors] = useState<CustomerErrors>({});

  function handleChange(field: CustomerField, nextValue: string) {
    onChange(field, nextValue);
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateCustomer(value);

    if (Object.keys(result.errors).length) {
      setErrors(result.errors);
      const firstError = (["firstName", "lastName", "phone"] as const).find(
        (field) => result.errors[field],
      );
      if (firstError) {
        const field = event.currentTarget.elements.namedItem(firstError);
        if (field instanceof HTMLElement) field.focus();
      }
      return;
    }

    setErrors({});
    onContinue(result.normalizedValue);
  }

  const fields = [
    {
      field: "firstName" as const,
      label: "Nombre",
      autoComplete: "given-name",
      placeholder: "Martina",
    },
    {
      field: "lastName" as const,
      label: "Apellido",
      autoComplete: "family-name",
      placeholder: "Gómez",
    },
  ];

  return (
    <form noValidate onSubmit={handleSubmit}>
      <StepHeader
        titleId="customer-details-title"
        title="Contanos quién va a jugar"
        description="Usaremos estos datos para identificar la reserva y contactarte si fuera necesario."
      />

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {fields.map(({ field, label, autoComplete, placeholder }) => (
          <div key={field} className="space-y-2">
            <label htmlFor={`reservation-${field}`} className="block text-sm font-medium text-foreground">
              {label}
            </label>
            <input
              id={`reservation-${field}`}
              name={field}
              type="text"
              required
              maxLength={80}
              autoComplete={autoComplete}
              autoCapitalize="words"
              value={value[field]}
              onChange={(event) => handleChange(field, event.target.value)}
              aria-invalid={Boolean(errors[field])}
              aria-describedby={errors[field] ? `reservation-${field}-error` : undefined}
              className={inputClassName}
              placeholder={placeholder}
            />
            {errors[field] && (
              <p id={`reservation-${field}-error`} role="alert" className="text-sm text-destructive">
                {errors[field]}
              </p>
            )}
          </div>
        ))}

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="reservation-phone" className="block text-sm font-medium text-foreground">
            Teléfono
          </label>
          <input
            id="reservation-phone"
            name="phone"
            type="tel"
            required
            maxLength={32}
            inputMode="tel"
            autoComplete="tel"
            value={value.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "reservation-phone-error" : undefined}
            className={inputClassName}
            placeholder="341 555 1234"
          />
          {errors.phone && (
            <p id="reservation-phone-error" role="alert" className="text-sm text-destructive">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <StepActions
        onBack={onBack}
        continueType="submit"
      >
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Tus datos se usarán únicamente para gestionar esta reserva.
        </p>
      </StepActions>
    </form>
  );
}
