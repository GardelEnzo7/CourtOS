import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CLUB_CONFIG } from "@/config/club";
import type {
  CustomerDetails,
  CustomerDetailsStepProps,
  CustomerField,
} from "@/types/reservation";

type CustomerErrors = Partial<Record<CustomerField, string>>;

const inputClassName =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20";

function validateCustomer(value: CustomerDetails) {
  const normalizedValue: CustomerDetails = {
    name: value.name.trim(),
    phone: value.phone.trim(),
    email: value.email.trim(),
  };
  const errors: CustomerErrors = {};
  const phoneDigitCount = normalizedValue.phone.replace(/\D/g, "").length;

  if (!normalizedValue.name) {
    errors.name = "Ingresá tu nombre.";
  } else if (
    normalizedValue.name.length < 2 ||
    normalizedValue.name.length > 80
  ) {
    errors.name = "El nombre debe tener entre 2 y 80 caracteres.";
  }

  if (!normalizedValue.phone) {
    errors.phone = "Ingresá un teléfono de contacto.";
  } else if (phoneDigitCount < 8 || phoneDigitCount > 15) {
    errors.phone = "Ingresá un teléfono con entre 8 y 15 dígitos.";
  }

  if (!normalizedValue.email) {
    errors.email = "Ingresá tu email.";
  } else if (
    normalizedValue.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedValue.email)
  ) {
    errors.email = "Ingresá un email válido.";
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
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  function handleChange(field: CustomerField, nextValue: string) {
    onChange(field, nextValue);

    if (errors[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
    }
  }

  function focusFirstError(nextErrors: CustomerErrors) {
    if (nextErrors.name) {
      nameInputRef.current?.focus();
    } else if (nextErrors.phone) {
      phoneInputRef.current?.focus();
    } else if (nextErrors.email) {
      emailInputRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { errors: nextErrors, normalizedValue } = validateCustomer(value);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirstError(nextErrors);
      return;
    }

    setErrors({});
    onContinue(normalizedValue);
  }

  return (
    <div>
      <header>
        <p className="text-sm font-medium text-muted-foreground">
          {CLUB_CONFIG.name}
        </p>
        <h2
          id="customer-details-title"
          className="mt-1 text-2xl font-bold tracking-tight text-foreground"
        >
          Empecemos con tus datos
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Usaremos esta información para identificar tu solicitud y poder
          contactarte.
        </p>
      </header>

      <form
        noValidate
        aria-labelledby="customer-details-title"
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        <div className="space-y-2">
          <label
            htmlFor="reservation-name"
            className="block text-sm font-medium text-foreground"
          >
            Nombre
          </label>
          <input
            ref={nameInputRef}
            id="reservation-name"
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            autoCapitalize="words"
            value={value.name}
            onChange={(event) => handleChange("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "reservation-name-error" : undefined}
            className={inputClassName}
            placeholder="Juan Pérez"
          />
          {errors.name && (
            <p
              id="reservation-name-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="reservation-phone"
            className="block text-sm font-medium text-foreground"
          >
            Teléfono
          </label>
          <input
            ref={phoneInputRef}
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
            aria-describedby={
              errors.phone ? "reservation-phone-error" : undefined
            }
            className={inputClassName}
            placeholder="341 555 1234"
          />
          {errors.phone && (
            <p
              id="reservation-phone-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="reservation-email"
            className="block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            ref={emailInputRef}
            id="reservation-email"
            name="email"
            type="email"
            required
            maxLength={254}
            inputMode="email"
            autoComplete="email"
            value={value.email}
            onChange={(event) => handleChange("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? "reservation-email-error" : undefined
            }
            className={inputClassName}
            placeholder="nombre@email.com"
          />
          {errors.email && (
            <p
              id="reservation-email-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-12 rounded-xl text-base"
          >
            <ArrowLeft aria-hidden="true" />
            Volver
          </Button>
          <Button type="submit" className="h-12 rounded-xl text-base shadow-sm">
            Continuar
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Solicitud sujeta a confirmación del club.
        </p>
      </form>
    </div>
  );
}
